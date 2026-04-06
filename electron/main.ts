import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import os from 'node:os'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import fs from 'node:fs'

const execAsync = promisify(exec)

const LOG_DIR = path.join(app.getPath('userData'), 'logs')
const MAX_LOGS = 5

function initLogger() {
  if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR, { recursive: true })
  
  // Rotate logs
  try {
    const files = fs.readdirSync(LOG_DIR).sort((a, b) => {
      return fs.statSync(path.join(LOG_DIR, b)).mtime.getTime() - fs.statSync(path.join(LOG_DIR, a)).mtime.getTime()
    })
    
    if (files.length >= MAX_LOGS) {
      files.slice(MAX_LOGS - 1).forEach(file => {
        try { fs.unlinkSync(path.join(LOG_DIR, file)) } catch(e) {}
      })
    }
  } catch (e) {}

  const logFile = path.join(LOG_DIR, `session_${new Date().toISOString().replace(/[:.]/g, '-')}.log`)
  return logFile
}

const currentLogFile = initLogger()

function log(level: 'INFO' | 'WARN' | 'ERROR', category: string, message: string) {
  const timestamp = new Date().toISOString()
  const logEntry = `[${timestamp}] [${level}] [${category}] - ${message}\n`
  console.log(logEntry.trim())
  try {
    fs.appendFileSync(currentLogFile, logEntry)
  } catch (e) {
    console.error('Failed to write to log file', e)
  }
}

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ └── dist-electron
// │   ├── main.js
// │   └── preload.js
//
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL ? path.join(process.env.DIST, '../public') : process.env.DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    width: 1100,
    height: 700,
    frame: false, // Professional frameless look
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date()).toLocaleString())
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL!)
  } else {
    win.loadFile(path.join(process.env.DIST!, 'index.html'))
  }
}

// IPC Handlers for System Cleaning
ipcMain.handle('run-command', async (_, command: string) => {
  log('INFO', 'IPC', `Executing command: ${command}`)
  try {
    const { stdout, stderr } = await execAsync(command)
    if (stderr) log('WARN', 'CMD', `Command stderr: ${stderr}`)
    return { success: true, stdout, stderr }
  } catch (error: any) {
    log('ERROR', 'CMD', `Command failed: ${error.message}`)
    return { success: false, error: error.message }
  }
})

// Enhanced System Stats Logic
let lastCpuUsage = { idle: 0, total: 0 };

async function getCpuUsage() {
  try {
    const command = `powershell -Command "(Get-Counter '\\Processor Information(_Total)\\% Processor Utility' -SampleInterval 0.5 -MaxSamples 1).CounterSamples.CookedValue"`;
    const { stdout } = await execAsync(command);
    return Math.min(100, Math.max(0, Math.floor(parseFloat(stdout.trim())) || 0));
  } catch (err) {
    // Fallback to time-based calculation if counter fails
    const cpus = os.cpus();
    let idle = 0;
    let total = 0;
    cpus.forEach(cpu => {
      for (const type in cpu.times) total += (cpu.times as any)[type];
      idle += cpu.times.idle;
    });
    const idleDiff = idle - lastCpuUsage.idle;
    const totalDiff = total - lastCpuUsage.total;
    lastCpuUsage = { idle, total };
    if (totalDiff === 0) return 0;
    return Math.min(100, Math.max(0, Math.floor(100 * (1 - idleDiff / totalDiff))));
  }
}

ipcMain.handle('get-system-stats', async () => {
  try {
    // RAM
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const ramUsage = Math.floor((usedMem / totalMem) * 100);

    // CPU
    const cpuUsage = await getCpuUsage();
    const cpuModel = os.cpus()[0].model.trim();

    // Improved Disk (All Drives)
    interface DiskInfo {
      id: string;
      name: string;
      total: number;
      free: number;
      used: number;
      usage: number;
      fileSystem: string;
    }
    
    let allDisks: DiskInfo[] = [];
    try {
      const { stdout } = await execAsync('powershell "Get-CimInstance Win32_LogicalDisk | Select-Object DeviceID, VolumeName, Size, FreeSpace, FileSystem | ConvertTo-Json"');
      const diskData = JSON.parse(stdout);
      const drives = Array.isArray(diskData) ? diskData : [diskData];
      
      allDisks = drives.map(drive => {
        const total = Math.round(drive.Size / (1024 ** 3));
        const free = Math.round(drive.FreeSpace / (1024 ** 3));
        const used = total - free;
        const usage = total > 0 ? Math.floor((used / total) * 100) : 0;
        return {
          id: drive.DeviceID,
          name: drive.VolumeName || 'Local Disk',
          total,
          free,
          used,
          usage,
          fileSystem: drive.FileSystem
        };
      });
    } catch (e) {
      console.error('Disk stat error:', e);
    }
    
    const primaryDisk = allDisks.find(d => d.id === 'C:') || allDisks[0] || { total: 0, free: 0, usage: 0, name: 'Local Disk', id: 'C:', fileSystem: 'NTFS' };

    // Processes
    let processCount = 0;
    try {
      const { stdout } = await execAsync('powershell "(Get-Process).Count"');
      processCount = parseInt(stdout.trim());
    } catch (e) {}

    return {
      success: true,
      cpu: { usage: cpuUsage, model: cpuModel },
      ram: { usage: ramUsage, total: Math.round(totalMem / (1024 ** 3)), used: Math.round(usedMem / (1024 ** 3)) },
      disk: primaryDisk,
      allDisks: allDisks,
      uptime: Math.floor(os.uptime()),
      processes: processCount,
      os: {
        platform: os.platform(),
        release: os.release(),
        arch: os.arch(),
        hostname: os.hostname()
      }
    };
  } catch (error: any) {
    log('ERROR', 'SYS', `Failed to fetch system stats: ${error.message}`)
    return { success: false, error: error.message };
  }
})

ipcMain.handle('get-path-size', async (_, folderPath: string) => {
  try {
     // Expand environment variables (e.g., %temp%)
     const expandedPath = folderPath.replace(/%([^%]+)%/g, (_, n) => process.env[n] || `%${n}%`);
     
     // PowerShell command to recursively measure folder size
     const command = `powershell -Command "(Get-ChildItem -Path '${expandedPath}' -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum"`;
     const { stdout } = await execAsync(command);
     
     const bytes = parseInt(stdout.trim()) || 0;
     const mb = parseFloat((bytes / (1024 * 1024)).toFixed(2));
     
     return { success: true, bytes, mb };
  } catch (error: any) {
     log('ERROR', 'FS', `Failed to get path size: ${error.message}`)
     return { success: false, error: error.message, bytes: 0, mb: 0 };
  }
})

ipcMain.handle('trim-memory', async () => {
  log('INFO', 'RAM', 'Initiating Memory Working Set Trimming...')
  try {
     // Advanced PowerShell logic to trim working set of high-ram processes
     const psCommand = `
       $processes = Get-Process | Where-Object {$_.WorkingSet64 -gt 100MB}
       foreach($p in $processes) {
          try { $null = $p.TrimWorkingSet() } catch {}
       }
     `;
     await execAsync(`powershell -Command "${psCommand.replace(/\n/g, ' ')}"`);
     log('INFO', 'RAM', 'Memory Trim Cycle Complete.')
     return { success: true };
  } catch (error: any) {
     log('ERROR', 'RAM', `Memory Trim Failed: ${error.message}`)
     return { success: false, error: error.message };
  }
})

ipcMain.handle('get-top-memory-processes', async () => {
  try {
    const command = `powershell "Get-Process | Sort-Object WorkingSet64 -Descending | Select-Object -First 5 Name, @{Name='MemoryMB';Expression={[Math]::Round($_.WorkingSet64 / 1MB, 2)}} | ConvertTo-Json"`;
    const { stdout } = await execAsync(command);
    const processes = JSON.parse(stdout);
    
    // Normalize if only one process is returned (it won't be an array in JSON)
    const processList = Array.isArray(processes) ? processes : [processes];
    
    return { success: true, processes: processList };
  } catch (error: any) {
    log('ERROR', 'SYS', `Memory Process Fetch Failed: ${error.message}`)
    return { success: false, error: error.message };
  }
})

ipcMain.handle('clear-privacy-data', async (_, type: 'explorer' | 'clipboard' | 'browsers') => {
  log('INFO', 'PRIV', `Executing Privacy Scrub: ${type}`)
  try {
    let command = '';
    if (type === 'explorer') {
      command = `powershell "Remove-Item -Path '$env:APPDATA\\Microsoft\\Windows\\Recent\\*' -Recurse -Force -ErrorAction SilentlyContinue"`;
    } else if (type === 'clipboard') {
      command = `powershell "Set-Clipboard -Value $null"`;
    } else if (type === 'browsers') {
      // Universal Browser Cache Cleaning logic
      const browserTargets = [
        "$env:LOCALAPPDATA\\Google\\Chrome\\User Data\\Default\\Cache\\*",
        "$env:LOCALAPPDATA\\Microsoft\\Edge\\User Data\\Default\\Cache\\*",
        "$env:LOCALAPPDATA\\BraveSoftware\\Brave-Browser\\User Data\\Default\\Cache\\*",
        "$env:LOCALAPPDATA\\Opera Software\\Opera Stable\\Cache\\*",
        "$env:LOCALAPPDATA\\Vivaldi\\User Data\\Default\\Cache\\*",
        "$env:APPDATA\\Mozilla\\Firefox\\Profiles\\*\\cache2\\*"
      ];
      
      // Build a PowerShell script that checks each path before deleting
      const psScript = `
        $targets = @(${browserTargets.map(t => `'${t}'`).join(', ')});
        foreach ($target in $targets) {
           if (Test-Path $target) {
              Remove-Item -Path $target -Recurse -Force -ErrorAction SilentlyContinue
           }
        }
      `;
      command = `powershell -Command "${psScript.replace(/\n/g, ' ')}"`;
    }
    
    await execAsync(command);
    log('INFO', 'PRIV', `Privacy Scrub (${type}) Complete.`)
    return { success: true };
  } catch (error: any) {
    log('ERROR', 'PRIV', `Privacy Scrub (${type}) Failed: ${error.message}`)
    return { success: false, error: error.message };
  }
})

ipcMain.on('window-controls', (_, action: 'minimize' | 'maximize' | 'close') => {
  if (!win) return
  if (action === 'minimize') win.minimize()
  if (action === 'maximize') win.isMaximized() ? win.unmaximize() : win.maximize()
  if (action === 'close') win.close()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)

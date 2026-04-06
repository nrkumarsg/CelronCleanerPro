import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  runCommand: (command: string) => ipcRenderer.invoke('run-command', command),
  getSystemStats: () => ipcRenderer.invoke('get-system-stats'),
  getPathSize: (path: string) => ipcRenderer.invoke('get-path-size', path),
  getTopMemoryProcesses: () => ipcRenderer.invoke('get-top-memory-processes'),
  clearPrivacyData: (type: 'explorer' | 'clipboard' | 'browsers') => ipcRenderer.invoke('clear-privacy-data', type),
  windowControls: (action: 'minimize' | 'maximize' | 'close') => ipcRenderer.send('window-controls', action),
  onUpdate: (callback: (message: string) => void) => ipcRenderer.on('main-process-message', (_, message) => callback(message)),
})

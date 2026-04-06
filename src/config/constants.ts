import { ScanTask, UserPrefs, PrivacySettings } from '../types';

export const INITIAL_SCAN_TASKS: ScanTask[] = [
  { id: 'sys_temp', name: 'System Temp Files', command: 'del /q /s /f %temp%\\*', scanPath: '%temp%', enabled: true, description: 'Clears temporary application files stored in the local user profile.' },
  { id: 'win_temp', name: 'Windows Cache', command: 'del /q /s /f C:\\Windows\\Temp\\*', scanPath: 'C:\\Windows\\Temp', enabled: true, description: 'Removes temporary files used by the Windows operating system.', critical: true },
  { id: 'prefetch', name: 'System Prefetch', command: 'del /q /s /f C:\\Windows\\Prefetch\\*', scanPath: 'C:\\Windows\\Prefetch', enabled: false, description: 'Clears pre-cached startup data to improve index performance.', critical: true, isPro: true },
  { id: 'dns_cache', name: 'DNS Resolver Cache', command: 'ipconfig /flushdns', scanPath: '', enabled: true, description: 'Flushes the DNS cache to resolve connectivity and lookup issues.' },
  { id: 'downloads', name: 'Downloads Cleanup', command: 'del /q /s /f %userprofile%\\Downloads\\*', scanPath: '%userprofile%\\Downloads', enabled: false, description: 'Removes downloaded files from the user profile Downloads directory.', isPro: true },
  { id: 'recycle', name: 'Recycle Bin', command: 'rd /s /q c:\\$Recycle.Bin', scanPath: 'C:\\$Recycle.Bin', enabled: false, description: 'Permanently empties all items currently in the system recycle bin.', isPro: true },
  { id: 'win_update', name: 'Windows Update Cache', command: 'del /q /s /f C:\\Windows\\SoftwareDistribution\\Download\\*', scanPath: 'C:\\Windows\\SoftwareDistribution\\Download', enabled: false, description: 'Clears downloaded Windows update files that are no longer needed.', isPro: true },
  { id: 'thumbnails', name: 'Thumbnail Cache', command: 'del /q /s /f %LocalAppData%\\Microsoft\\Windows\\Explorer\\thumbcache_*.db', scanPath: '%LocalAppData%\\Microsoft\\Windows\\Explorer', enabled: false, description: 'Removes the local database of image and video thumbnails.', isPro: true },
  { id: 'shader_cache', name: 'DirectX Shader Cache', command: 'del /q /s /f %LocalAppData%\\D3DSCache\\*', scanPath: '%LocalAppData%\\D3DSCache', enabled: false, description: 'Clears the graphics shader cache to resolve visual artifacts and stuttering.', isPro: true },
  { id: 'error_reports', name: 'Error Reporting Logs', command: 'del /q /s /f %LocalAppData%\\Microsoft\\Windows\\WER\\*', scanPath: '%LocalAppData%\\Microsoft\\Windows\\WER', enabled: false, description: 'Removes automatically generated system error and crash reports.' }
];

export const DEFAULT_USER_PREFS: UserPrefs = {
  autoScan: true,
  minimizeToTray: true,
  quietMode: false
};

export const DEFAULT_PRIVACY_SETTINGS: PrivacySettings = {
  explorer: true,
  clipboard: true,
  browsers: false
};

export const VOUCHER_CODES = ['CELRON-PRO-2026', 'CELRON-BETA-2026', 'DELL-VIP-2026'];

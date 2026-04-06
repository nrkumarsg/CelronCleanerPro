export type Tab = 'dashboard' | 'memory' | 'junk' | 'privacy' | 'settings' | 'help' | 'activation';

export interface ScanTask {
  id: string;
  name: string;
  command: string;
  scanPath: string;
  enabled: boolean;
  description: string;
  critical?: boolean;
  isPro?: boolean;
}

export interface UserPrefs {
  autoScan: boolean;
  minimizeToTray: boolean;
  quietMode: boolean;
}

export interface PrivacySettings {
  explorer: boolean;
  clipboard: boolean;
  browsers: boolean;
}

export interface SystemStats {
  success: boolean;
  cpu: {
    usage: number;
    model: string;
  };
  ram: {
    usage: number;
    total: number;
    used: number;
  };
  disk: {
    id: string;
    name: string;
    total: number;
    free: number;
    used: number;
    usage: number;
    fileSystem: string;
  };
  allDisks: Array<{
    id: string;
    name: string;
    total: number;
    free: number;
    used: number;
    usage: number;
    fileSystem: string;
  }>;
  uptime: number;
  processes: number;
  os: {
    platform: string;
    release: string;
    arch: string;
    hostname: string;
  };
}

export interface MemoryProcess {
  Name: string;
  MemoryMB: number;
}

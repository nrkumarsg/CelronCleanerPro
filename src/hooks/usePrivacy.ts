import { useState } from 'react';
import { PrivacySettings } from '../types';

export function usePrivacy(initialSettings: PrivacySettings, addLog: (msg: string) => void) {
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>(initialSettings);
  const [isWiping, setIsWiping] = useState(false);

  const handleWipe = async () => {
    if (isWiping) return;
    setIsWiping(true);
    addLog(`SECURE PRIVACY WIPE INITIATED at ${new Date().toLocaleTimeString()}`);
    
    if (privacySettings.explorer) {
        addLog('Privacy: Purging Windows Explorer Recent History...');
        await window.electronAPI.clearPrivacyData('explorer');
    }
    if (privacySettings.clipboard) {
        addLog('Privacy: Zeroing System Clipboard...');
        await window.electronAPI.clearPrivacyData('clipboard');
    }
    if (privacySettings.browsers) {
        addLog('Privacy: Clearing Session Artifacts (All Installed Browsers)...');
        await window.electronAPI.clearPrivacyData('browsers');
    }
    
    addLog('✓ SECURE WIPE COMPLETE. Local footprints neutralized.');
    setIsWiping(false);
    return { title: 'SECURE WIPE COMPLETE', subtitle: 'The selected privacy artifacts have been securely purged from the system kernel.', type: 'clean' as const };
  };

  return { privacySettings, setPrivacySettings, isWiping, handleWipe };
}

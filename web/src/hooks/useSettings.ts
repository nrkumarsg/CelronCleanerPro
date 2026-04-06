import { useState, useEffect } from 'react';
import { UserPrefs } from '../types';

export function useSettings(initialPrefs: UserPrefs) {
  const [userPrefs, setUserPrefs] = useState<UserPrefs>(() => {
    const saved = localStorage.getItem('celron_user_prefs');
    return saved ? JSON.parse(saved) : initialPrefs;
  });

  useEffect(() => {
    localStorage.setItem('celron_user_prefs', JSON.stringify(userPrefs));
  }, [userPrefs]);

  return { userPrefs, setUserPrefs };
}

'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type HomeView = 'browse' | 'saved';

interface SavedHomesContextValue {
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggleSave: (id: string) => void;
  view: HomeView;
  setView: (view: HomeView) => void;
}

const SavedHomesContext = createContext<SavedHomesContextValue | null>(null);

/**
 * Client-side favourites + "Saved Homes" view state, shared between the Navbar and the
 * property grids. Data itself is fetched on the server; only this UI state lives here.
 */
export const SavedHomesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [view, setView] = useState<HomeView>('browse');

  const toggleSave = useCallback((id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const value = useMemo<SavedHomesContextValue>(
    () => ({
      savedIds,
      isSaved: (id: string) => savedIds.includes(id),
      toggleSave,
      view,
      setView,
    }),
    [savedIds, toggleSave, view]
  );

  return <SavedHomesContext.Provider value={value}>{children}</SavedHomesContext.Provider>;
};

export function useSavedHomes(): SavedHomesContextValue {
  const ctx = useContext(SavedHomesContext);
  if (!ctx) throw new Error('useSavedHomes must be used within <SavedHomesProvider>');
  return ctx;
}

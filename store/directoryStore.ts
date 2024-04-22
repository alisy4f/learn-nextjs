// store/directoryStore.ts
import { create } from 'zustand';
import useDirectoryQuery from '../hooks/useDirectoryQuery';

interface Directory {
  id: number;
  name: string;
  description?: string;
}

interface DirectoryStore {
  directories: Directory[];
  setDirectories: (directories: Directory[]) => void;
  error: string | null;
  setError: (error: string | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const useStore = create<DirectoryStore>((set) => {
  const { data: directories, isLoading, error } = useDirectoryQuery();

  return {
    directories: directories || [],
    setDirectories: (directories) => set({ directories }),
    error: error instanceof Error ? error.message : null,
    setError: (error) => set({ error }),
    loading: isLoading,
    setLoading: (loading) => set({ loading }),
  };
});

export const useDirectoryStore = useStore;

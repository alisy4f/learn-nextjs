// hooks/useFetchDirectories.ts
"use client";
import useDirectoryQuery from './useDirectoryQuery';

const useFetchDirectories = () => {
  const { data: directories, isLoading, error } = useDirectoryQuery();

  return { directories, isLoading, error };
};

export default useFetchDirectories;

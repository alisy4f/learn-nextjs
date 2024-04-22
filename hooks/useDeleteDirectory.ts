// hooks/useDeleteDirectory.ts
import { useState } from 'react';
import { useMutation } from 'react-query';

const useDeleteDirectory = () => {
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const deleteDirectoryMutation = useMutation((directorySlug: string) =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/directory/${directorySlug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${process.env.NEXT_PUBLIC_TOKEN}`
      }
    })
  );

  const deleteDirectory = async (directorySlug: string) => {
    try {
      await deleteDirectoryMutation.mutateAsync(directorySlug);
    } catch (error) {
      console.error('Error deleting directory:', error);
      setDeleteError('Failed to delete directory');
    }
  };

  return {
    deleteDirectory,
    deleteError,
    mutateAsync: deleteDirectoryMutation.mutateAsync
  };
};

export default useDeleteDirectory;


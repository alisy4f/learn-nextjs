// hooks/useUpdateDirectory.tsx
import { useState } from 'react';
import { useMutation } from 'react-query';
import { DirectoryFormValues } from '../components/DirectoryEditForm';

const useUpdateDirectory = () => {
  const [updateError, setUpdateError] = useState<string | null>(null);

  const updateDirectory = async (data: DirectoryFormValues & { slug: string }) => {
    try {
      const { slug, ...formData } = data;
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/directory/${slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${process.env.NEXT_PUBLIC_TOKEN}`
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update directory');
      }

    } catch (error) {
      console.error('Error updating directory:', error);
      setUpdateError('Failed to update directory');
    }
  };

  return {
    updateDirectory,
    updateError,
  };
};

export default useUpdateDirectory;

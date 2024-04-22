// hooks/useCreateDirectory.ts
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from 'react-query';

const directorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

interface DirectoryFormValues {
  name: string;
  description?: string;
}

const useCreateDirectory = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation((data: DirectoryFormValues) =>
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/directory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${process.env.NEXT_PUBLIC_TOKEN}`,
      },
      body: JSON.stringify(data),
    }).then((res) => res.json())
  );

  const { register, handleSubmit, reset, formState: { errors } } = useForm<DirectoryFormValues>({
    resolver: zodResolver(directorySchema),
  });

  const onSubmit = async (data: DirectoryFormValues) => {
    try {
      await mutation.mutateAsync(data);
      queryClient.invalidateQueries('directories');
      reset();
    } catch (error) {
      return error;
    }
  };

  return { register, handleSubmit, onSubmit, errors };
};

export default useCreateDirectory;

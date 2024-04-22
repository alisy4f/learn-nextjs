import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Grid, TextField, Button } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const directorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional().nullable()
});

export interface DirectoryFormValues {
  name: string;
  description?: string; // Mark as optional with "?"
}

interface DirectoryEditFormProps {
  initialData?: DirectoryFormValues;
  onSubmit: (data: DirectoryFormValues) => void;
  onCancel: () => void; // Add onCancel prop to handle cancel action
}

const DirectoryEditForm: React.FC<DirectoryEditFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<DirectoryFormValues>({
    resolver: zodResolver(directorySchema),
    defaultValues: initialData || { name: '', description: '' },
  });

  const firstInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Focusing the first input field when the form mounts
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const handleFormSubmit = (data: DirectoryFormValues) => {
    onSubmit(data);
  };

  const handleCancel = () => {
    reset(); // Reset form values
    onCancel(); // Call onCancel function to close the edit form
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            inputRef={(e) => {
              if (e) {
                firstInputRef.current = e;
              }
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">Submit</Button>
          <Button type="button" variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DirectoryEditForm;

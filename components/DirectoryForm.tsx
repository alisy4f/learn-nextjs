// components/DirectoryForm.tsx
import { Grid, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const directorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

interface DirectoryFormProps {
  onSubmit: (data: DirectoryFormValues) => Promise<void>;
}

interface DirectoryFormValues {
  name: string;
  description?: string;
}

const DirectoryForm: React.FC<DirectoryFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<DirectoryFormValues>({
    resolver: zodResolver(directorySchema),
  });

  const handleFormSubmit = (data: DirectoryFormValues) => {
    onSubmit(data);
    reset(); 
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="New Directory Name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
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
          <Button sx={{ mb: 2 }} type="submit" variant="contained" color="primary">Submit</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DirectoryForm;

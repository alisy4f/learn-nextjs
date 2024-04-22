// components/DirectoryDeleteButton.tsx
import { Button } from '@mui/material';
import useDeleteDirectory from '../hooks/useDeleteDirectory';

const DirectoryDeleteButton = ({ slug }: { slug: string }) => {
  const { mutateAsync: deleteDirectory } = useDeleteDirectory();

  const handleDelete = async () => {
    try {
      await deleteDirectory(slug);
    } catch (error) {
      return error;
    }
  };

  return <Button onClick={handleDelete}>Delete</Button>;
};

export default DirectoryDeleteButton;

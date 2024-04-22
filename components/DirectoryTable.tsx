// components/DirectoryTable.tsx
"use client";

import React, { useEffect, useState } from 'react';
import useFetchDirectories from '../hooks/useFetchDirectories';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import DirectoryEditForm from './DirectoryEditForm';
import useCreateDirectory from '../hooks/useCreateDirectory';
import useUpdateDirectory from '../hooks/useUpdateDirectory';
import useDeleteDirectory from '../hooks/useDeleteDirectory';
import DirectoryForm from './DirectoryForm';
import { DirectoryFormValues } from './DirectoryEditForm';

interface Directory {
  id: number;
  name: string;
  description?: string;
  slug: string; // Add slug property
}

const DirectoryTable = () => {
  const { directories, isLoading, error } = useFetchDirectories();
  const { onSubmit: handleCreateDirectory } = useCreateDirectory();
  const { updateDirectory, updateError } = useUpdateDirectory();
  const { deleteDirectory, deleteError } = useDeleteDirectory();
  const [editData, setEditData] = useState<Directory | null>(null);
  const [updatedDirectories, setUpdatedDirectories] = useState<Directory[]>([]);

  useEffect(() => {
    if (!isLoading && !error) {
      setUpdatedDirectories(directories.data);
    }
  }, [directories, isLoading, error]);

  if (isLoading) {
    return <CircularProgress />;
  }
  
  const handleEdit = (directory: Directory) => {
    setEditData(directory);
  };

  const handleCancelEdit = () => {
    setEditData(null);
  };

  const handleUpdate = async (data: DirectoryFormValues) => {
    if (editData && editData.slug) {
      await updateDirectory({ ...data, slug: editData.slug });
      const updatedIndex = updatedDirectories.findIndex((dir) => dir.id === editData.id);
      if (updatedIndex !== -1) {
        const updatedDirs = [...updatedDirectories];
        updatedDirs[updatedIndex] = { ...editData, ...data };
        setUpdatedDirectories(updatedDirs);
      }
      setEditData(null);
    } else {
      console.error('Slug is missing');
    }
  };

  const handleDelete = async (directorySlug: string) => {
    await deleteDirectory(directorySlug);
    setUpdatedDirectories(updatedDirectories.filter(dir => dir.slug !== directorySlug));
  };

  return (
    <div>
      <DirectoryForm onSubmit={handleCreateDirectory} />

      {updateError && <div>Error updating directory: {updateError}</div>}

      {deleteError && <div>Error deleting directory: {deleteError}</div>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {updatedDirectories.map((directory: Directory) => (
              <React.Fragment key={directory.id}>
                <TableRow>
                  <TableCell>{directory.name}</TableCell>
                  <TableCell>{directory.description}</TableCell>
                  <TableCell align='center'>
                    <Button type='button' color="primary" variant="contained" sx={{ mr: 1, fontSize: 12 }} onClick={() => handleEdit(directory)}>Edit</Button>
                    <Button type='button' color="error" variant="contained" sx={{ fontSize: 12 }} onClick={() => handleDelete(directory.slug)}>Delete</Button>
                  </TableCell>
                </TableRow>
                {editData && editData.slug === directory.slug && (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <DirectoryEditForm 
                        initialData={editData} 
                        onSubmit={handleUpdate} 
                        onCancel={handleCancelEdit}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DirectoryTable;

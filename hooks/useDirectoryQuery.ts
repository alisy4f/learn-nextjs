// hooks/useDirectoryQuery.ts
import { useQuery } from 'react-query';

const useDirectoryQuery = () => {
  const getAllDirectories = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/directory`, {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch directories');
    }
    return response.json();
  };

  return useQuery('directories', getAllDirectories);
};

export default useDirectoryQuery;

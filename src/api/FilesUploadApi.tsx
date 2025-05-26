import axios from 'axios';

const api = import.meta.env.VITE_API_URL;

export interface UploadResponse {
  id: string;
}

export const uploadMatrixFiles = async (
  criteriaFile: File,
  selectionFiles: File[]
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('criteria_matrix', criteriaFile);
  selectionFiles.forEach((file) => {
    formData.append('selection_matrices', file);
  });

  const response = await axios.post<UploadResponse>(`${api}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
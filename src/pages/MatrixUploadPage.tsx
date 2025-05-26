import React, { useState } from 'react';
import { Box, Container, Alert, CircularProgress } from '@mui/material';
import FilesUpload from '../components/FilesUpload';
import { useNavigate } from 'react-router-dom';
import { uploadMatrixFiles, UploadResponse } from '../api/FilesUploadApi'; 

const MatrixUploadPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [criteriaFile, setCriteriaFile] = useState<File | null>(null);
  const [selectionFiles, setSelectionFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCriteriaFilesChange = (files: File[]) => {
    setCriteriaFile(files.length > 0 ? files[0] : null);
    setError(null);
  };

  const handleSelectionFilesChange = (files: File[]) => {
    setSelectionFiles(files);
    setError(null);
  };

  const handleCalculation = async () => {
    if (!criteriaFile) {
      setError('Vui lòng tải lên file ma trận tiêu chí');
      return;
    }

    if (selectionFiles.length === 0) {
      setError('Vui lòng tải lên ít nhất một file ma trận phương án');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response: UploadResponse = await uploadMatrixFiles(criteriaFile, selectionFiles);
      navigate(`/calculationMatrix?id=${response.id}`);
    } catch (error) {
      console.error('Lỗi khi tải file lên:', error);
      setError('Có lỗi xảy ra khi tải file lên. Vui lòng kiểm tra lại file và thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md" className="py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Tải Dữ Liệu Ma Trận
      </h1>

      {isLoading && (
        <Box className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <CircularProgress/>
        </Box>
      )}

      {error && (
        <Alert severity="error" className="mb-6">
          {error}
        </Alert>
      )}

      <FilesUpload
        title="Ma trận so sánh cặp các tiêu chí"
        description="Vui lòng tải lên file .csv hoặc .xlsx chứa ma trận tiêu chí (chỉ 1 file)"
        onFilesChange={handleCriteriaFilesChange}
        acceptedFileTypes={['.csv', '.xlsx']}
        allowMultiple={false}
      />

      <FilesUpload
        title="Ma trận so sánh cặp các phương án theo từng tiêu chí"
        description="Vui lòng tải lên các file .csv hoặc .xlsx chứa ma trận so sánh cặp các phương án theo từng tiêu chí"
        onFilesChange={handleSelectionFilesChange}
        acceptedFileTypes={['.csv', '.xlsx']}
        allowMultiple={true}
      />

      <Box className="mt-8 flex justify-center">
        <button
          onClick={handleCalculation}
          disabled={!criteriaFile || selectionFiles.length === 0 || isLoading}
          className={`py-2 px-6 rounded-lg font-semibold transition duration-200 ${
            !criteriaFile || selectionFiles.length === 0 || isLoading
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-900'
          }`}
        >
          {isLoading ? 'Đang xử lý...' : 'Thực hiện tính toán'}
        </button>
      </Box>
    </Container>
  );
};

export default MatrixUploadPage;
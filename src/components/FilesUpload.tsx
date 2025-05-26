import React, { useState, useCallback, useRef } from 'react';
import { Box, Typography, Paper, Divider, Alert, IconButton } from '@mui/material';
import { CloudUpload, Description, Close } from '@mui/icons-material';

interface FilesUploadProps {
  title: string;
  description: string;
  onFilesChange: (files: File[]) => void;
  acceptedFileTypes?: string[];
  allowMultiple?: boolean;
}

const FilesUpload: React.FC<FilesUploadProps> = ({
  title,
  description,
  onFilesChange,
  acceptedFileTypes = ['.csv', '.xlsx'],
  allowMultiple = false,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File) => {
    const acceptedExtensions = acceptedFileTypes.map(ext => ext.toLowerCase());
    const fileName = file.name.toLowerCase();
    
    return acceptedExtensions.some(ext => fileName.endsWith(ext)) || 
          file.type === 'text/csv' || 
          file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  };

  const handleFilesChange = (selectedFiles: FileList) => {
    setError(null);

    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    Array.from(selectedFiles).forEach(file => {
      if (validateFile(file)) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
    });

    if (invalidFiles.length > 0) {
      setError(`File không hợp lệ: ${invalidFiles.join(', ')}. Chỉ chấp nhận file ${acceptedFileTypes.join(', ')}`);
    }

    if (validFiles.length > 0) {
      const newFiles = allowMultiple ? [...files, ...validFiles] : validFiles.slice(0, 1);
      setFiles(newFiles);
      onFilesChange(newFiles);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesChange(e.target.files);
    }
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
    onFilesChange([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesChange(e.dataTransfer.files);
    }
  }, []);

  return (
    <Paper className="p-6 mb-6">
      <Typography variant="h6" className="mb-4 font-bold text-gray-700">
        {title}
      </Typography>
      <Typography variant="body1" className="mb-4 text-gray-600">
        {description}
      </Typography>
      
      <Divider className="my-4" />
      
      <Box 
        className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleButtonClick}
        style={{ cursor: 'pointer' }}
      >
        <CloudUpload className={`text-4xl mb-4 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
        <Typography variant="body1" className="mb-2 text-gray-500">
          {isDragging ? 'Thả file vào đây' : 'Kéo và thả file tại đây hoặc'}
        </Typography>
        
        <button
          className="underline py-2 px-6 my-5 rounded-lg font-semibold hover:opacity-90 transition duration-200"
          onClick={handleButtonClick}
        >
          Chọn file từ máy tính
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFileTypes.join(',')} 
          onChange={handleInputChange}
          className="hidden"
          multiple={allowMultiple}
        />
      </Box>
      
      {files.length > 0 && (
        <Box className="mt-4 space-y-2">
          <Box className="flex justify-between items-center">
            <Typography variant="subtitle2" className="text-gray-600">
              {allowMultiple ? `Đã chọn ${files.length} file` : 'File đã chọn'}
            </Typography>
            {allowMultiple && files.length > 1 && (
              <button 
                onClick={handleRemoveAllFiles}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Xóa tất cả
              </button>
            )}
          </Box>
          
          <Box className={`${allowMultiple ? 'max-h-40 overflow-y-auto' : ''}`}>
            {files.map((file, index) => (
              <Box 
                key={`${file.name}-${index}`}
                className="flex items-center justify-between bg-gray-50 p-2 rounded mt-2"
              >
                <Box className="flex items-center">
                  <Description className="mr-2 text-green-600" />
                  <Typography variant="body2" className="truncate max-w-xs">
                    {file.name}
                  </Typography>
                </Box>
                <IconButton 
                  size="small" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(index);
                  }}
                  className="text-gray-500 hover:text-red-500"
                >
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      )}
      
      {error && (
        <Alert severity="error" className="mt-4">
          {error}
        </Alert>
      )}
    </Paper>
  );
};

export default FilesUpload;
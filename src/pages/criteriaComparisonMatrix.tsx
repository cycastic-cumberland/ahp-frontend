import React, { useState } from 'react';
import { TextField } from '@mui/material';
import MatrixTable from '../components/MatrixTable';

const CriteriaComparisonMatrix: React.FC = () => {
    const [showEvaluation, setShowEvaluation] = useState(false);

    const handleEvaluateClick = () => {
        setShowEvaluation(true);
    };

    const [isMatrixValid, setIsMatrixValid] = useState(false);

    const handleMatrixChange = (matrix: (number | string)[][], isValid: boolean) => {
      console.log('Ma trận hiện tại:', matrix);
      setIsMatrixValid(isValid);
    };

    const comparisonMatrices = [
        {
          title: "Ma trận so sánh cặp các tiêu chí 1",
          criteria: ['Chi phí đầu tư', 'Tiêu thụ năng lượng', 'Xuất khẩu năng lượng', 'Công suất lắp đặt', 'Lượng phát thải CO2'],
          key: 'matrix1'
        },
        {
          title: "Tiêu chí 1: Chi phí đầu tư", 
          criteria: ['Điện mặt trời', 'Điện gió', 'Thủy điện', 'Nhiệt điện'],
          key: 'matrix2'
        },
        {
            title: "Tiêu chí 2: Tiêu thụ năng lượng", 
            criteria: ['Điện mặt trời', 'Điện gió', 'Thủy điện', 'Nhiệt điện'],
            key: 'matrix2'
        },
        {
            title: "Tiêu chí 3: Xuất khẩu năng lượng", 
            criteria: ['Điện mặt trời', 'Điện gió', 'Thủy điện', 'Nhiệt điện'],
            key: 'matrix2'
        },
        {
            title: "Tiêu chí 4: Công suất lắp đặt", 
            criteria: ['Điện mặt trời', 'Điện gió', 'Thủy điện', 'Nhiệt điện'],
            key: 'matrix2'
        },
        {
            title: "Tiêu chí 5: Lượng phát thải CO2", 
            criteria: ['Điện mặt trời', 'Điện gió', 'Thủy điện', 'Nhiệt điện'],
            key: 'matrix2'
        },
      ];
      


  return (
   <div className="m-3 ml-5">
        <div className="bg-white min-h-screen rounded-lg shadow-lg w-full p-8">
            <h1 className="text-20px font-bold text-gray-800 mb-12 flex justify-center">
                Tạo ma trận so sánh cặp các tiêu chí
            </h1>

            <div className="mb-16 flex justify-center">
                <div className="w-2/4">
                    <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((index) => (
                        <div key={index} className="flex items-center space-x-6">
                            <label className="w-40 font-inter font-semibold text-16px">Tiêu chí {index}:</label>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                defaultValue={
                                index === 1
                                    ? 'Chi phí đầu tư'
                                    : index === 2
                                    ? 'Tiêu thụ năng lượng'
                                    : index === 3
                                    ? 'Xuất khẩu năng lượng'
                                    : index === 4
                                    ? 'Công suất lắp đặt'
                                        : 'Lượng phát thải CO2'
                                    }
                                    InputProps={{ readOnly: true }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                          borderRadius: '8px',
                                          backgroundColor: '#f9fafb',
                                          fontSize: '16px',
                                          fontFamily: 'Inter, sans-serif',
                                          '& fieldset': {
                                            borderColor: '#d1d5db',
                                          },
                                          '&:hover fieldset': {
                                            borderColor: '#000000',
                                          },
                                          '&.Mui-focused fieldset': {
                                            borderColor: '#000000',
                                          },
                                        },
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mb-12 flex justify-center">
                <div className="w-2/4">
                    <div className="space-y-4">
                    {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="flex items-center space-x-6">
                            <label className="w-40 font-inter font-semibold text-16px">Phương án {index}:</label>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                defaultValue={
                                index === 1
                                    ? 'Điện mặt trời'
                                    : index === 2
                                    ? 'Điện gió'
                                    : index === 3
                                    ? 'Thủy điện'
                                    : index === 4
                                    ? 'Nhiệt điện'
                                        : ''
                                    }
                                    InputProps={{ readOnly: true }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                          borderRadius: '8px',
                                          backgroundColor: '#f9fafb',
                                          fontSize: '16px',
                                          fontFamily: 'Inter, sans-serif',
                                          '& fieldset': {
                                            borderColor: '#d1d5db',
                                          },
                                          '&:hover fieldset': {
                                            borderColor: '#000000',
                                          },
                                          '&.Mui-focused fieldset': {
                                            borderColor: '#000000',
                                          },
                                        },
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {!showEvaluation && (
                <div className="flex justify-center">
                    <button
                    onClick={handleEvaluateClick}
                    className="bg-black text-white py-2 px-6 rounded-lg font-semibold hover:opacity-90 transition duration-200"
                    >
                        Đánh giá tiêu chí
                    </button>
                </div>
            )}
            {showEvaluation && (
                <div className="mb-16 flex flex-col items-center">
                    <h1 className="text-20px font-bold text-gray-800 mb-8">
                        Đánh giá tiêu chí
                    </h1>
                    <ul className="list-disc mb-6 w-2/4">
                        <li className="mb-6">
                            Người dùng thực hiện việc đánh giá tiêu chí bằng cách nhập điểm vào
                            ma trận so sánh cặp giữa các tiêu chí.
                        </li>
                        <li>
                            Thang điểm đánh giá từ <strong>1/9 đến 9</strong> là thang điểm đánh giá hợp lệ, theo chuẩn của Saaty.
                        </li>
                    </ul>
                    {comparisonMatrices.map((matrix) => (
                        <React.Fragment key={matrix.key}>
                            <h1 className="text-20px font-bold text-gray-800 mb-8 mt-8">
                            {matrix.title}
                            </h1>
                            <MatrixTable
                            criteria={matrix.criteria}
                            editableCells="upper-triangle"
                            onChange={handleMatrixChange}
                            className="shadow-md rounded-lg overflow-hidden mb-8"
                            />
                        </React.Fragment>
                        ))}
                    <div className="flex justify-center">
                        <button
                        onClick={handleEvaluateClick}
                        className="bg-black text-white py-2 px-6 rounded-lg font-semibold hover:opacity-90 transition duration-200"
                        >
                            Thực hiện tính toán
                        </button>
                </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default CriteriaComparisonMatrix;
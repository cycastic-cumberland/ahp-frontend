import React, { useState, useEffect } from 'react';

interface MatrixTableProps {
  /** Danh sách các tiêu chí */
  criteria?: string[];
  /** Ma trận giá trị khởi tạo */
  initialMatrix?: (number | string)[][];
  /** Callback khi ma trận thay đổi */
  onChange?: (matrix: (number | string)[][], isValid: boolean) => void;
  /** Hiển thị thông báo lỗi */
  showValidation?: boolean;
  /** Cho phép chỉnh sửa các ô nào */
  editableCells?: 'upper-triangle';
  /** Custom class */
  className?: string;
}

const MatrixTable: React.FC<MatrixTableProps> = ({
  criteria = [
    'Chi phí đầu tư',
    'Tiêu thụ năng lượng',
    'Xuất khẩu năng lượng',
    'Công suất lắp đặt',
    'Lượng phát thải CO2'
  ],
  initialMatrix = [],
  onChange = () => {},
  showValidation = true,
  editableCells = 'first-row-only',
  className = ''
}) => {
  // Khởi tạo ma trận
  const initializeMatrix = (): (number | string)[][] => {
    if (initialMatrix?.length === criteria.length) return initialMatrix;
    
    return Array(criteria.length).fill(0).map((_, i) => 
      Array(criteria.length).fill(0).map((_, j) => 
        i === j ? 1 : ''
    ));
  };

  const [matrix, setMatrix] = useState<(number | string)[][]>(initializeMatrix());
  const [validationErrors, setValidationErrors] = useState<boolean[][]>([]);

  // Kiểm tra giá trị hợp lệ (1/9 đến 9)
// Cập nhật ma trận validation errors
  const updateValidationErrors = (matrix: (number | string)[][]) => {
    const newErrors = matrix.map((row) => row.map(() => false));
  let hasErrors = false;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (editableCells === 'upper-triangle' && i < j) {
        const cellValue = matrix[i][j];
        const oppositeValue = matrix[j][i];

        // Kiểm tra giá trị nhập vào
        const isFraction = typeof cellValue === 'string' && cellValue.includes('/');
        const numValue = isFraction
          ? (() => {
              const [numerator, denominator] = cellValue.split('/').map(Number);
              return denominator !== 0 ? numerator / denominator : NaN;
            })()
          : Number(cellValue);

        // Kiểm tra tính hợp lệ
        const isValid =
          !isNaN(numValue) &&
          numValue >= 1 / 9 &&
          numValue <= 9;

        if (!isValid) {
          newErrors[i][j] = true;
          hasErrors = true;
        } else {
          // Kiểm tra nghịch đảo có đúng không (đã tự động tính trong useEffect)
          const inverse = Number((1 / numValue).toFixed(2));
          const oppValue = Number(oppositeValue);

          if (!isNaN(oppValue) && Math.abs(oppValue - inverse) > 0.001) {
            newErrors[j][i] = true;
            hasErrors = true;
          }
        }
      }
    }
  }
  setValidationErrors(newErrors);
  return hasErrors;
  };

  // Xử lý thay đổi giá trị ô
 // Xử lý thay đổi giá trị ô
const handleCellChange = (row: number, col: number, value: string) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = value;
  
    // Nếu là ô tam giác trên, thì tính giá trị nghịch đảo dưới tam giác dưới
    if (editableCells === 'upper-triangle' && row < col) {
      let inverse: string = '';
      if (value.includes('/')) {
        const [numerator, denominator] = value.split('/').map(Number);
        if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
          inverse = (denominator / numerator).toFixed(2);
        }
      } else {
        const num = Number(value);
        if (!isNaN(num) && num !== 0) {
          inverse = (1 / num).toFixed(2);
        }
      }
      newMatrix[col][row] = inverse;
    }
  
    setMatrix(newMatrix);
    const hasErrors = updateValidationErrors(newMatrix);
    onChange(newMatrix, !hasErrors);
  };
  
  // Tự động điền đường chéo và các ô đối xứng nếu thiếu
  useEffect(() => {
    const newMatrix = [...matrix];
    let updated = false;
  
    for (let i = 0; i < criteria.length; i++) {
      for (let j = 0; j < criteria.length; j++) {
        // Đảm bảo đường chéo chính = 1
        if (i === j && newMatrix[i][j] !== 1) {
          newMatrix[i][j] = 1;
          updated = true;
        }
  
        // Tự động tính nghịch đảo
        if (editableCells === 'upper-triangle' && i < j && newMatrix[i][j] && !newMatrix[j][i]) {
          const cellValue = String(newMatrix[i][j]);
          let inverse = '';
          if (cellValue.includes('/')) {
            const [numerator, denominator] = cellValue.split('/').map(Number);
            if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
              inverse = (denominator / numerator).toFixed(2);
            }
          } else {
            const num = Number(cellValue);
            if (!isNaN(num) && num !== 0) {
              inverse = (1 / num).toFixed(2);
            }
          }
          newMatrix[j][i] = inverse;
          updated = true;
        }
      }
    }
  
    if (updated) {
      setMatrix(newMatrix);
      updateValidationErrors(newMatrix);
    }
  }, [matrix, editableCells]);
 
  // Kiểm tra xem ô có thể chỉnh sửa không
  const isCellEditable = (row: number, col: number): boolean => {
    if (row === col) return false; // Không cho chỉnh sửa đường chéo chính
    
    if(editableCells === "upper-triangle") 
        return row < col;
    else return false;
  };

  return (
    <div className={`matrix-table ${className}`}>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-3 bg-gray-200 w-40"></th>
            {criteria.map((criterion, index) => (
              <th key={`th-${index}`} className="border border-gray-300 p-3 bg-gray-200 text-black min-w-32">
                {criterion}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {criteria.map((rowCriterion, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              <td className="border border-gray-300 p-3 bg-gray-200 text-black font-semibold">
                {rowCriterion}
              </td>
              {criteria.map((_, colIndex) => (
                <td 
                  key={`cell-${rowIndex}-${colIndex}`} 
                  className={`border border-gray-300  p-2 ${
                    validationErrors[rowIndex]?.[colIndex] ? 'bg-red-50' : ''
                  }
                  ${
                    matrix[rowIndex][colIndex] === 1 ? 'font-bold bg-gray-200': ''
                  }
                  `}
                >
                  {isCellEditable(rowIndex, colIndex) ? (
                    <div className="relative">
                      <input
                        type="text"
                        className={`w-full p-2 border rounded text-center ${
                          validationErrors[rowIndex]?.[colIndex] 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-gray-500'
                        } focus:outline-none focus:ring-1`}
                        value={matrix[rowIndex][colIndex]}
                        onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                        placeholder="1/9-9"
                      />
                      {validationErrors[rowIndex]?.[colIndex] && (
                        <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                          <span className="text-red-500">!</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={`text-center py-2 px-1`}>
                      {matrix[rowIndex][colIndex]}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {showValidation && validationErrors.flat().some(Boolean) && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
          <p className="font-medium">⚠️ Giá trị không hợp lệ!</p>
          <p>Vui lòng nhập giá trị từ 1/9 đến 9 (theo thang điểm Saaty).</p>
          <p>Ví dụ hợp lệ: 1/9, 1/5, 1, 3, 9</p>
        </div>
      )}
    </div>
  );
};

export default MatrixTable;
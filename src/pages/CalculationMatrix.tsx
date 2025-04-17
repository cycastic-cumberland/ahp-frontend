import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const CustomButton = styled(Button)({
  backgroundColor: 'black', // Màu nền đen
  color: 'white', // Chữ màu trắng
  fontWeight: 'bold',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#333', // Màu khi hover
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: 12, // Font size cho tiêu đề
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12, // Font size cho body
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // Ẩn đường viền cuối
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// Các kiểu dữ liệu
type Matrix = {
  column_headers: string[];
  row_headers: string[];
  data: number[][];
};

type CriteriaMatrices = {
  average: Matrix;
  completed: Matrix;
  lambda_max: number;
  ci: number;
  ri: number;
  cr: number;
};

type SelectionResult = {
  average: Matrix;
  completed: Matrix;
  lambda_max: number;
  ci: number;
  ri: number;
  cr: number;
};

type Selection = {
  name: string;
  result: SelectionResult;
};

type Scoreboard = {
  rating_table: Matrix;
  criteria_weight_table: Matrix;
  composited: Matrix;
  highest_score: string;
};

type DataPayload = {
  criteria: CriteriaMatrices;
  selections: Selection[];
  scoreboard: Scoreboard;
};

function CalculationMatrix() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const encodedData = searchParams.get("data");
  const decodedData = encodedData ? JSON.parse(decodeURIComponent(encodedData)) : null;

  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (!decodedData) {
      setErrorMessage('Không thể giải mã dữ liệu. Vui lòng thử lại!');
      setOpenErrorSnackbar(true);
      const timer = setTimeout(() => navigate('/'), 5000); // Redirect sau 5 giây
      return () => clearTimeout(timer);
    }
  }, [decodedData, navigate]);

  if (!decodedData) {
    return (
        <Snackbar
            open={openErrorSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenErrorSnackbar(false)}
        >
          <MuiAlert severity="error" elevation={6} variant="filled">
            Dữ liệu không hợp lệ! Hãy nhập lại dữ liệu hoặc thử lại sau.
          </MuiAlert>
        </Snackbar>
    );
  }

  // Lấy dữ liệu từ payload đã decode
  const { criteria, selections, scoreboard } = decodedData as DataPayload;
  // Các chỉ số toàn cục của criteria
  const { lambda_max, ci, cr } = criteria;

  const handleGoBack = () => {
    navigate('/');
  };

  // Hàm render cho 1 ma trận (dạng số)
  const renderMatrix = (matrixData: number[][]) => {
    return matrixData.map((row: number[], rowIndex: number) => (
        <StyledTableRow key={rowIndex}>
          <StyledTableCell sx={{ fontWeight: 'bold' }} component="th" scope="row">
            {criteria.average.row_headers ? criteria.average.row_headers[rowIndex] || (rowIndex + 1) : rowIndex + 1}
          </StyledTableCell>
          {row.map((cell: number, cellIndex: number) => (
              <StyledTableCell key={cellIndex} align="right">
                {cell.toFixed(2)}
              </StyledTableCell>
          ))}
        </StyledTableRow>
    ));
  };

  return (
      <div className="m-3 ml-5">
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 flex justify-center">
            Tính toán ma trận
          </h1>

          <div className="space-y-5">
            {/* 1. Bảng Average của tiêu chí (phần tổng hợp) */}
            <div>
              <p className="font-bold mb-5">
                [Tiêu chí] Chuẩn hóa ma trận (Average)
              </p>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="criteria average table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell></StyledTableCell>
                      {criteria.average.column_headers.map((header, index) => (
                          <StyledTableCell key={index} align="right">
                            {header}
                          </StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {criteria.average.data && renderMatrix(criteria.average.data)}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            {/* 2. Bảng Completed của tiêu chí (phần tổng hợp) */}
            <div>
              <p className="font-bold mb-5">[Tiêu chí] Ma trận hoàn chỉnh</p>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 600 }} aria-label="criteria completed table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell></StyledTableCell>
                      {criteria.completed.column_headers.map((header, index) => (
                          <StyledTableCell key={index} align="right">
                            {header}
                          </StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {criteria.completed.data && renderMatrix(criteria.completed.data)}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            {/* Hiển thị các chỉ số tổng hợp của criteria */}
            <div className="ml-16">
              <p className="font-bold">Lambda max = {lambda_max}</p>
              <p className="font-bold">CI = {ci}</p>
              <p className="font-bold">CR = {cr}</p>
              <div className="mt-6">
                <CustomButton variant="contained" onClick={handleGoBack}>
                  Yêu cầu nhập lại
                </CustomButton>
              </div>
            </div>

            {/* 3. Render các bảng của từng tiêu chí trong selections */}
            {criteria.ci < 0.1 && (
                <>
                  {selections.map((selection, index) => (
                      <div key={index} className="mt-10">
                        <h1 className="text-xl font-bold text-gray-800 mb-6 flex justify-center">
                          Ma trận: {selection.name}
                        </h1>
                        {/* Bảng Average cho tiêu chí cụ thể */}
                        <div>
                          <p className="font-bold mb-5">
                            [{selection.name}] Chuẩn hóa ma trận (Average)
                          </p>
                          <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 600 }} aria-label={`${selection.name} average`}>
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell></StyledTableCell>
                                  {selection.result.average.column_headers.map((header, idx) => (
                                      <StyledTableCell key={idx} align="right">
                                        {header}
                                      </StyledTableCell>
                                  ))}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {selection.result.average.data && renderMatrix(selection.result.average.data)}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>
                        {/* Bảng Completed cho tiêu chí cụ thể */}
                        <div>
                          <p className="font-bold mb-5">
                            [{selection.name}] Ma trận hoàn chỉnh
                          </p>
                          <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 600 }} aria-label={`${selection.name} completed`}>
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell></StyledTableCell>
                                  {selection.result.completed.column_headers.map((header, idx) => (
                                      <StyledTableCell key={idx} align="right">
                                        {header}
                                      </StyledTableCell>
                                  ))}
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {selection.result.completed.data && renderMatrix(selection.result.completed.data)}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>
                        {/* Các chỉ số riêng của tiêu chí */}
                        <div className="ml-16">
                          <p className="font-bold">
                            Lambda max = {selection.result.lambda_max}
                          </p>
                          <p className="font-bold">CI = {selection.result.ci}</p>
                          <p className="font-bold">CR = {selection.result.cr}</p>
                        </div>
                      </div>
                  ))}
                </>
            )}

            {/* 6. Bảng Rating Table */}
            {criteria.cr < 0.1 && (
                <>
                  <div className="mt-10">
                    <h1 className="text-xl font-bold mb-6">Rating Table</h1>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 600 }} aria-label="rating table">
                        <TableHead>
                          <TableRow>
                            {scoreboard.rating_table.column_headers.map((header, idx) => (
                                <StyledTableCell key={idx} align="right">
                                  {header}
                                </StyledTableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {scoreboard.rating_table.data.map((row: number[], rowIndex: number) => (
                              <StyledTableRow key={rowIndex}>
                                <StyledTableCell sx={{ fontWeight: 'bold' }} component="th" scope="row">
                                  {scoreboard.rating_table.row_headers[rowIndex] || rowIndex + 1}
                                </StyledTableCell>
                                {row.map((cell: number, cellIndex: number) => (
                                    <StyledTableCell key={cellIndex} align="right">
                                      {cell.toFixed(2)}
                                    </StyledTableCell>
                                ))}
                              </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </>
            )}

            {/* 4. Bảng Criteria Weight Table */}
            {criteria.cr < 0.1 && (
                <>
                  <div className="mt-10">
                    <h1 className="text-xl font-bold mb-6">Criteria Weight Table</h1>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 600 }} aria-label="criteria weight table">
                        <TableHead>
                          <TableRow>
                            {scoreboard.criteria_weight_table.column_headers.map((header, idx) => (
                                <StyledTableCell key={idx} align="right">
                                  {header}
                                </StyledTableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {scoreboard.criteria_weight_table.data.map((row: number[], rowIndex: number) => (
                              <StyledTableRow key={rowIndex}>
                                <StyledTableCell sx={{ fontWeight: 'bold' }} component="th" scope="row">
                                  {scoreboard.criteria_weight_table.row_headers[rowIndex] || rowIndex + 1}
                                </StyledTableCell>
                                {row.map((cell: number, cellIndex: number) => (
                                    <StyledTableCell key={cellIndex} align="right">
                                      {cell.toFixed(2)}
                                    </StyledTableCell>
                                ))}
                              </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </>
            )}

            {/* 5. Bảng Composited */}
            {criteria.cr < 0.1 && (
                <>
                  <div className="mt-10">
                    <h1 className="text-xl font-bold mb-6">Composited Table</h1>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 600 }} aria-label="composited table">
                        <TableHead>
                          <TableRow>
                            {scoreboard.composited.column_headers.map((header, idx) => (
                                <StyledTableCell key={idx} align="right">
                                  {header}
                                </StyledTableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {scoreboard.composited.data.map((row: number[], rowIndex: number) => (
                              <StyledTableRow key={rowIndex}>
                                <StyledTableCell sx={{ fontWeight: 'bold' }} component="th" scope="row">
                                  {scoreboard.composited.row_headers[rowIndex] || rowIndex + 1}
                                </StyledTableCell>
                                {row.map((cell: number, cellIndex: number) => (
                                    <StyledTableCell key={cellIndex} align="right">
                                      {cell.toFixed(2)}
                                    </StyledTableCell>
                                ))}
                              </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </>
            )}

            {/* Hiển thị kết quả cuối cùng từ Scoreboard */}
            {criteria.cr < 0.01 && (
                <>
                  <div className="mt-10">
                    <h1 className="text-xl font-bold text-center">
                      Phương án có điểm cao nhất: {scoreboard.highest_score}
                    </h1>
                  </div>
                </>
            )}
          </div>
        </div>
      </div>
  );
}

export default CalculationMatrix;
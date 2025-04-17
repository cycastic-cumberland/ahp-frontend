import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Chip} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CustomButton = styled(Button)({
  backgroundColor: 'black',
  color: 'white',
  fontWeight: 'bold',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#333',
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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
      const timer = setTimeout(() => navigate('/'), 5000);
      return () => clearTimeout(timer);
    }
  }, [decodedData, navigate]);

  if (!decodedData) {
    return (
        <Snackbar open={openErrorSnackbar} autoHideDuration={3000} onClose={() => setOpenErrorSnackbar(false)}>
          <MuiAlert severity="error" elevation={6} variant="filled">
            Dữ liệu không hợp lệ! Hãy nhập lại dữ liệu hoặc thử lại sau.
          </MuiAlert>
        </Snackbar>
    );
  }

  const { criteria, selections, scoreboard } = decodedData as DataPayload;
  const { lambda_max, ci, cr } = criteria;

  const handleGoBack = () => {
    navigate('/');
  };

  const handleMatrixTable = () => {
    navigate('/criteriaComparisonMatrix');
  };

  const renderMatrix = (matrixData: number[][]) => {
    return matrixData.map((row: number[], rowIndex: number) => (
        <StyledTableRow key={rowIndex}>
          <StyledTableCell sx={{ fontWeight: 'bold' }} component="th" scope="row">
            {criteria.average.row_headers?.[rowIndex] || rowIndex + 1}
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
      <div className="w-full min-h-screen rounded-lg flex flex-col overflow-x-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex justify-center">Tính toán ma trận</h1>
        <div className="space-y-5">
          {/* Average Matrix */}
          <div>
            <p className="font-bold mb-5">Chuẩn hóa ma trận (Average)</p>
            <div className="overflow-x-auto">
              <TableContainer component={Paper} className="w-full">
                <Table sx={{ minWidth: 700 }} aria-label="criteria average table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell></StyledTableCell>
                      {criteria.average.column_headers.map((header, index) => (
                          <StyledTableCell key={index} align="right">{header}</StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {criteria.average.data && renderMatrix(criteria.average.data)}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>

          {/* Completed Matrix */}
          <div>
            <p className="font-bold mb-5">Ma trận hoàn chỉnh</p>
            <div className="overflow-x-auto">
              <TableContainer component={Paper} className="w-full">
                <Table sx={{ minWidth: 700 }} aria-label="criteria completed table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell></StyledTableCell>
                      {criteria.completed.column_headers.map((header, index) => (
                          <StyledTableCell key={index} align="right">{header}</StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {criteria.completed.data && renderMatrix(criteria.completed.data)}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>

          {/* Global Criteria Stats */}
          <div className="ml-16">
            <p className="font-bold">Lambda max = {lambda_max.toFixed(2)}</p>
            <p className="font-bold">CI = {ci.toFixed(2)}</p>
            <p className="font-bold">CR = {cr.toFixed(2)}</p>
            <div className="mt-6">
              <CustomButton variant="contained" onClick={handleGoBack}>Yêu cầu nhập lại</CustomButton>
            </div>
          </div>

          {/* Selections Table */}
          {ci < 0.1 && selections.map((selection, index) => (
              <div key={index} className="mt-10">
                <h1 className="text-xl font-bold text-gray-800 mb-6 flex justify-center">Ma trận: {selection.name}</h1>
                <div>
                  <p className="font-bold mb-5">Chuẩn hóa ma trận (Average)</p>
                  <div className="overflow-x-auto">
                    <TableContainer component={Paper} className="w-full">
                      <Table sx={{ minWidth: 700 }} aria-label={`${selection.name} average`}>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell></StyledTableCell>
                            {selection.result.average.column_headers.map((header, idx) => (
                                <StyledTableCell key={idx} align="right">{header}</StyledTableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selection.result.average.data && renderMatrix(selection.result.average.data)}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="font-bold mb-5">Ma trận hoàn chỉnh</p>
                  <div className="overflow-x-auto">
                    <TableContainer component={Paper} className="w-full">
                      <Table sx={{ minWidth: 700 }} aria-label={`${selection.name} completed`}>
                        <TableHead>
                          <TableRow>
                            <StyledTableCell></StyledTableCell>
                            {selection.result.completed.column_headers.map((header, idx) => (
                                <StyledTableCell key={idx} align="right">{header}</StyledTableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selection.result.completed.data && renderMatrix(selection.result.completed.data)}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>

                <div className="ml-16 mt-10">
                  <p className="font-bold">Lambda max = {selection.result.lambda_max.toFixed(2)}</p>
                  <p className="font-bold">CI = {selection.result.ci.toFixed(2)}</p>
                  <p className="font-bold">CR = {selection.result.cr.toFixed(2)}</p>
                </div>
              </div>
          ))}

          {/* Rating Table */}
          {cr < 0.1 && (
              <>
                <div className="mt-10">
                  <h1 className="text-xl font-bold mb-6">Bảng đánh giá</h1>
                  <div className="overflow-x-auto">
                    <TableContainer component={Paper} className="w-full">
                      <Table sx={{ minWidth: 700 }} aria-label="rating table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell></StyledTableCell>
                            {scoreboard.rating_table.column_headers.map((header, idx) => (
                                <StyledTableCell key={idx} align="right">{header}</StyledTableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {scoreboard.rating_table.data.map((row, rowIndex) => (
                              <StyledTableRow key={rowIndex}>
                                <StyledTableCell sx={{ fontWeight: 'bold' }}>
                                  {scoreboard.rating_table.row_headers[rowIndex] || rowIndex + 1}
                                </StyledTableCell>
                                {row.map((cell, cellIndex) => (
                                    <StyledTableCell key={cellIndex} align="right">{cell.toFixed(2)}</StyledTableCell>
                                ))}
                              </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </>
          )}

          {/* Criteria Weight Table */}
          {cr < 0.1 && (
              <>
                <div className="mt-10">
                  <h1 className="text-xl font-bold mb-6">Bảng trọng số tiêu chí</h1>
                  <div className="overflow-x-auto">
                    <TableContainer component={Paper} className="w-full">
                      <Table sx={{ minWidth: 700 }} aria-label="criteria weight table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell></StyledTableCell>
                            {scoreboard.criteria_weight_table.column_headers.map((header, idx) => (
                                <StyledTableCell key={idx} align="right">{header}</StyledTableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {scoreboard.criteria_weight_table.data.map((row, rowIndex) => (
                              <StyledTableRow key={rowIndex}>
                                <StyledTableCell sx={{ fontWeight: 'bold' }}>
                                  {scoreboard.criteria_weight_table.row_headers[rowIndex] || rowIndex + 1}
                                </StyledTableCell>
                                {row.map((cell, cellIndex) => (
                                    <StyledTableCell key={cellIndex} align="right">{cell.toFixed(2)}</StyledTableCell>
                                ))}
                              </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </>
          )}

          {/* Composited Table */}
          {cr < 0.1 && (
              <>
                <div className="mt-10">
                  <h1 className="text-xl font-bold mb-6">Bảng điểm tổng hợp</h1>
                  <div className="overflow-x-auto">
                    <TableContainer component={Paper} className="w-full">
                      <Table sx={{ minWidth: 700 }} aria-label="composited table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell></StyledTableCell>
                            {scoreboard.composited.column_headers.map((header, idx) => (
                                <StyledTableCell key={idx} align="right">{header}</StyledTableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {scoreboard.composited.data.map((row, rowIndex) => (
                              <StyledTableRow key={rowIndex}>
                                <StyledTableCell sx={{ fontWeight: 'bold' }}>
                                  {scoreboard.composited.row_headers[rowIndex] || rowIndex + 1}
                                </StyledTableCell>
                                {row.map((cell, cellIndex) => (
                                    <StyledTableCell key={cellIndex} align="right">{cell.toFixed(2)}</StyledTableCell>
                                ))}
                              </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </>
          )}

          {/* Final Result */}
          {cr < 0.1 && (
              <>
                <div className="mt-10">
                  <h1 className="text-xl font-bold text-center mb-6">
                    Phương án có điểm cao nhất:
                    <div className={"mt-3"}>
                      <Chip label={scoreboard.highest_score} size={"medium"} sx={{fontSize: 18, backgroundColor: "black", color: 'white', py:2.3, px:2}} />
                    </div>
                  </h1>

                  <div className="flex my-5 ">
                    <Button
                        variant="outlined"
                        sx={{
                          borderColor: 'black',
                          color: 'black',
                          textTransform: 'none',
                          '&:hover': {
                            backgroundColor: '#e0e0e0',
                            borderColor: 'black',
                            color: 'black',

                          },
                        }}
                    >
                      <ArrowBackIcon fontSize={"small"} sx={{ mr: 1 }}/> Nhập lại ma trận
                    </Button>
                  </div>
                </div>
              </>
          )}
        </div>
      </div>
  );
}

export default CalculationMatrix;

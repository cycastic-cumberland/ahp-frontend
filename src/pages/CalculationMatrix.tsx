import { useEffect, useState } from 'react'
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
    fontSize: 12, // Thêm phần này cho font size trong tiêu đề
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12, // Font size cho phần body
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

type CriteriaAverageData = {
  name: string,
  criteria1: number,
  criteria2: number,
  criteria3: number,
  criteria4: number,
  criteria5: number,
  sum: number,
};

type CriteriaCompletedData = {
  name: string,
  criteria1: number,
  criteria2: number,
  criteria3: number,
  criteria4: number,
  criteria5: number,
  weightedSumValue: number,
  criteriaWeight: number,
  consistencyVector: number,
};

type SelectionsAverageData = {
  name: string,
  plan1: number,
  plan2: number,
  plan3: number,
  plan4: number,
  plan5: number,
  sum: number,
};

type SelectionCompletedData = {
  name: string,
  plan1: number,
  plan2: number,
  plan3: number,
  plan4: number,
  plan5: number,
  weightedSumValue: number,
  criteriaWeight: number,
  consistencyVector: number,
};

type DataPayload = {
  rows1: CriteriaAverageData[],
  rows2: CriteriaCompletedData[],
  rows3: SelectionsAverageData[],
  rows4: SelectionCompletedData[],
  cr?: number,
  lambda_max?: number,
  ci?: number,
};

function CalculationMatrix() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [CR, setCR] = useState(0.05); // thử nghiệm: cho CR > 10% (=0.01) thì sẽ ko hiển thị các bảng Ma trận tiêu chí
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const payload = searchParams.get("data");

  useEffect(() => {
    if (!payload || !rows1 || !rows2 || !rows3 || !rows4) {
      setOpenErrorSnackbar(true);
      const timer = setTimeout(() => navigate('/'), 5000); // Redirect sau 3 giây
      return () => clearTimeout(timer);
    }    
  }, [payload, navigate]);

  if (!payload) {
    return (
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenErrorSnackbar(false)}
      >
        <MuiAlert
          severity="error"
          elevation={6}
          variant="filled"
        >
          Dữ liệu không hợp lệ! Hãy nhập lại dữ liệu hoặc thử lại sau.
        </MuiAlert>
      </Snackbar>
    );
  }

  const { rows1, rows2, rows3, rows4, cr, lambda_max, ci } = JSON.parse(payload) as DataPayload

  useEffect(() => {
    if (cr) {
      setCR(cr)
    }
  }, []);

  const [criteriaList, setCriteriaList] = useState([
    'Chi phí đầu tư',
    'Tiêu thụ năng lượng',
    'Xuất khẩu năng lượng',
    'Công suất lắp đặt',
    'Lượng phát thải CO2'
  ]);

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="m-3 ml-5">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex justify-center">Tính toán ma trận</h1>

        <div className='space-y-5'>
          {/* Chuẩn hóa ma trận bằng cách lấy giá trị mỗi ô chia cho tổng theo cột */}
          <div>
            <p className='font-bold mb-5'>Chuẩn hóa ma trận bằng cách lấy giá trị mỗi ô chia cho tổng theo cột</p>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell align="right">Chi phí đầu tư</StyledTableCell>
                    <StyledTableCell align="right">Tiêu thụ năng lượng</StyledTableCell>
                    <StyledTableCell align="right">Xuất khẩu năng lượng</StyledTableCell>
                    <StyledTableCell align="right">Công suất lắp đặt</StyledTableCell>
                    <StyledTableCell align="right">Phát thải CO2</StyledTableCell>
                    <StyledTableCell align="right">Average</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows1.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell sx={{ fontWeight: 'bold' }} component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.criteria1}</StyledTableCell>
                      <StyledTableCell align="right">{row.criteria2}</StyledTableCell>
                      <StyledTableCell align="right">{row.criteria3}</StyledTableCell>
                      <StyledTableCell align="right">{row.criteria4}</StyledTableCell>
                      <StyledTableCell align="right">{row.criteria5}</StyledTableCell>
                      <StyledTableCell align="right">{row.sum}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          {/* Ma trận hoàn chỉnh */}
          <div>
            <p className='font-bold mb-5'>Ma trận hoàn chỉnh</p>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell align="right">Chi phí đầu tư</StyledTableCell>
                    <StyledTableCell align="right">Tiêu thụ năng lượng</StyledTableCell>
                    <StyledTableCell align="right">Xuất khẩu năng lượng</StyledTableCell>
                    <StyledTableCell align="right">Công suất lắp đặt</StyledTableCell>
                    <StyledTableCell align="right">Phát thải CO2</StyledTableCell>
                    <StyledTableCell align="right">Weighted Sum Value</StyledTableCell>
                    <StyledTableCell align="right">Criteria Weight</StyledTableCell>
                    <StyledTableCell align="right">Consistency Vector</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows2.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell sx={{ fontWeight: 'bold' }} component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.criteria1}</StyledTableCell>
                      <StyledTableCell align="right">{row.criteria2}</StyledTableCell>
                      <StyledTableCell align="right">{row.criteria3}</StyledTableCell>
                      <StyledTableCell align="right">{row.criteria4}</StyledTableCell>
                      <StyledTableCell align="right">{row.criteria5}</StyledTableCell>
                      <StyledTableCell align="right">{row.weightedSumValue}</StyledTableCell>
                      <StyledTableCell align="right">{row.criteriaWeight}</StyledTableCell>
                      <StyledTableCell align="right">{row.consistencyVector}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          {/* Lamda, CR, CR  */}
          <div className='ml-16'>
            <p className='font-bold'>Lamda max = {lambda_max}</p>
            <p className='font-bold'>CI = {ci}</p>
            <p className='font-bold'>CR = {CR}</p>

            {/* Nút Yêu cầu nhập lại */}
            <div className='mt-6'>
              <CustomButton variant="contained">
                Yêu cầu nhập lại
              </CustomButton>
            </div>
          </div>
        </div>

        {/* Ma trận các tiêu chí */}
        {CR <= 0.1 && (
          <div>
            {criteriaList.map((criteria, index) => (
              <div key={index} className='mt-10'>
                <h1 className="text-xl font-bold text-gray-800 mb-6 flex justify-center">
                  Ma trận: {criteria}
                </h1>

                <div className='space-y-5'>
                  {/* Chuẩn hóa ma trận bằng cách lấy giá trị mỗi ô chia cho tổng theo cột */}
                  <div>
                    <p className='font-bold mb-5'>Chuẩn hóa ma trận bằng cách lấy giá trị mỗi ô chia cho tổng theo cột</p>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 500 }} aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell align="right">Điện mặt trời</StyledTableCell>
                            <StyledTableCell align="right">Điện gió</StyledTableCell>
                            <StyledTableCell align="right">Thủy điện</StyledTableCell>
                            <StyledTableCell align="right">Nhiệt điện</StyledTableCell>
                            <StyledTableCell align="right">Average</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows3.map((row) => (
                            <StyledTableRow key={row.name}>
                              <StyledTableCell sx={{ fontWeight: 'bold' }} component="th" scope="row">
                                {row.name}
                              </StyledTableCell>
                              <StyledTableCell align="right">{row.plan1}</StyledTableCell>
                              <StyledTableCell align="right">{row.plan2}</StyledTableCell>
                              <StyledTableCell align="right">{row.plan3}</StyledTableCell>
                              <StyledTableCell align="right">{row.plan4}</StyledTableCell>
                              <StyledTableCell align="right">{row.sum}</StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>

                  {/* Ma trận hoàn chỉnh */}
                  <div>
                    <p className='font-bold mb-5'>Ma trận hoàn chỉnh</p>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 500 }} aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell align="right">Điện mặt trời</StyledTableCell>
                            <StyledTableCell align="right">Điện gió</StyledTableCell>
                            <StyledTableCell align="right">Thủy điện</StyledTableCell>
                            <StyledTableCell align="right">Nhiệt điện</StyledTableCell>
                            <StyledTableCell align="right">Weighted Sum Value</StyledTableCell>
                            <StyledTableCell align="right">Criteria Weight</StyledTableCell>
                            <StyledTableCell align="right">Consistency Vector</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows4.map((row) => (
                            <StyledTableRow key={row.name}>
                              <StyledTableCell sx={{ fontWeight: 'bold' }} component="th" scope="row">
                                {row.name}
                              </StyledTableCell>
                              <StyledTableCell align="right">{row.plan1}</StyledTableCell>
                              <StyledTableCell align="right">{row.plan2}</StyledTableCell>
                              <StyledTableCell align="right">{row.plan3}</StyledTableCell>
                              <StyledTableCell align="right">{row.plan4}</StyledTableCell>
                              <StyledTableCell align="right">{row.weightedSumValue}</StyledTableCell>
                              <StyledTableCell align="right">{row.criteriaWeight}</StyledTableCell>
                              <StyledTableCell align="right">{row.consistencyVector}</StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>

                  {/* Lamda, CR, CR  */}
                  <div className='ml-16'>
                    <p className='font-bold'>Lamda max = {lambda_max}</p>
                    <p className='font-bold'>CI = {ci}</p>
                    <p className='font-bold'>CR = {cr}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className='mt-6'>
              <CustomButton onClick={handleGoBack} variant="contained">
                Quay về
              </CustomButton>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CalculationMatrix
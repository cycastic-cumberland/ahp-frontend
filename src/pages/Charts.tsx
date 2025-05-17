import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { Button, CircularProgress } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';

const api = import.meta.env.VITE_API_URL;

function Charts() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = Number(new URLSearchParams(location.search).get('id'));

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || isNaN(id)) {
      setError("ID không hợp lệ.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/result/${id}`);
        if (response.status !== 200 || !response.data) {
          throw new Error("Không thể tải dữ liệu");
        }
        setData(response.data);
      } catch (err: any) {
        setError(err.message || "Đã xảy ra lỗi không xác định.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="p-8 text-center"><CircularProgress /></div>;
  if (error) return <div className="p-8 text-center text-red-500">Lỗi: {error}</div>;
  if (!data?.scoreboard) return <div className="p-8 text-center text-red-500">Không có dữ liệu scoreboard</div>;

  const { composited, rating_table, criteria_weight_table } = data.scoreboard;

  if (!composited || !rating_table || !criteria_weight_table) {
    return <div className="p-8 text-center text-red-500">Dữ liệu không đầy đủ để hiển thị biểu đồ.</div>;
  }

  // const columnChartData = composited.row_headers.map((method: string, index: number) => ({
  //   name: method,
  //   score: composited.data[index][0].toFixed(2),
  // }));

  const pieChartData = criteria_weight_table.row_headers.map((criterion: string, index: number) => ({
    name: criterion,
    value: parseFloat(criteria_weight_table.data[index][0].toFixed(2)),
  }));

  const groupedColumnData = rating_table.row_headers.map((method: string, index: number) => {
    const criteriaData = rating_table.data[index];
    return {
      name: method,
      data: criteriaData.map((score: number, idx: number) => ({
        criteria: rating_table.column_headers[idx],
        score: score.toFixed(2),
      })),
    };
  });

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#ff33cc"];

  const handleBackToCalculationMatrix = () => {
    navigate(`/calculationMatrix?id=${id}`);
  };

  return (
    <div className="w-full min-h-screen p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex justify-center">Biểu đồ phân tích</h1>

      <div className="mb-10">
        <h2 className="text-xl font-bold mb-6">So sánh điểm theo từng tiêu chí</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={groupedColumnData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {groupedColumnData[0].data.map((item: { criteria: string; score: string }, idx: number) => (
              <Bar
                key={idx}
                dataKey={`data[${idx}].score`}
                stackId="a"
                fill={COLORS[idx % COLORS.length]}
                name={item.criteria}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-bold mb-6">Phân bổ trọng số tiêu chí</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieChartData.map((_: { name: string; value: number }, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => <span>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <Button
          onClick={handleBackToCalculationMatrix}
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
          <ArrowBackIcon fontSize={"small"} sx={{ mr: 1 }} /> Quay lại ma trận
        </Button>
      </div>
    </div>
  );
}

export default Charts;

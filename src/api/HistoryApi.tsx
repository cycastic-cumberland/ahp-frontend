import axios from 'axios';

const api = import.meta.env.VITE_API_URL;

export interface AhpResult {
  id: number;
  scoreboard: {
    highest_score: string;
  };
}

export interface ApiResponse {
  items: AhpResult[];
  page: number;
  page_size: number;
  total_item: number;
  total_page: number;
}

export const fetchHistoryData = async (page: number, pageSize: number) => {
  try {
    const response = await axios.get<ApiResponse>(
      `${api}/results`,
      {
        params: {
          page,
          page_size: pageSize
        }
      }
    );

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = response.data;
    
    if (!data.items || !Array.isArray(data.items)) {
      throw new Error('Invalid data format: items array not found');
    }
    
    return {
      items: data.items,
      pagination: {
        page: data.page,
        page_size: data.page_size,
        total_item: data.total_item,
        total_page: Math.ceil(data.total_item / data.page_size),
      }
    };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw err instanceof Error ? err : new Error('Lỗi không xác định');
  }
};
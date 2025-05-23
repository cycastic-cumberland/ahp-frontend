import axios from 'axios';

const api = import.meta.env.VITE_API_URL;

export interface MatrixData {
  data: number[][]; 
  criteria_name: string;
}

export interface AhpRequestPayload {
  criteria_matrix: MatrixData;
  selection_matrices: MatrixData[];
}

export type AhpHistoryResponse = {
  id: number
}

export const emptyPayload: AhpRequestPayload = {
  criteria_matrix: {
    data: [],
    criteria_name: ""
  },
  selection_matrices: [
    {
      data: [],
      criteria_name: ""
    },
    {
      data: [],
      criteria_name: ""
    },
    {
      data: [],
      criteria_name: ""
    },
    {
      data: [],
      criteria_name: ""
    },
    {
      data: [],
      criteria_name: ""
    }
  ]
};

export const calculateAHP = async (payload: AhpRequestPayload): Promise<AhpHistoryResponse> => {
  try {
    console.log("Payload gửi lên:", payload);
    const response = await axios.post(`${api}/process-and-save-matrix`, payload);
    return response.data as AhpHistoryResponse;
  } catch (error) {
    console.error('Lỗi khi gọi API AHP:', error);
    throw error;
  }
};

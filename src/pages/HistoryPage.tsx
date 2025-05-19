import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AhpResult, fetchHistoryData } from '../api/HistoryApi';

const HistoryPage: React.FC = () => {
  const [historyData, setHistoryData] = useState<AhpResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    page_size: 10,
    total_item: 0,
    total_page: 0,
  });
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);
      const { items, pagination: newPagination } = await fetchHistoryData(
        pagination.page,
        pagination.page_size
      );
      
      setHistoryData(items);
      setPagination(newPagination);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi không xác định');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [pagination.page, pagination.page_size]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.total_page) return;
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value);
    setPagination(prev => ({
      ...prev,
      page_size: newSize,
      page: 1,
    }));
  };

  const handleViewDetails = (id: number) => {
    navigate(`/calculationMatrix?id=${id}`);
  };

  const startItem = (pagination.page - 1) * pagination.page_size + 1;
  const endItem = Math.min(pagination.page * pagination.page_size, pagination.total_item);

  const getPageNumbers = () => {
    const totalPages = pagination.total_page;
    const currentPage = pagination.page;
    const pageNumbers = [];
    
    pageNumbers.push(1);
    
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    if (startPage > 2) {
      pageNumbers.push(-1); 
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    if (endPage < totalPages - 1) {
      pageNumbers.push(-2); 
    }
    
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Lịch sử tính toán AHP</h1>

      {loading && <div className="text-center py-8">Đang tải dữ liệu...</div>}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Lỗi:</strong> {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-2">Hiển thị</span>
              <select
                value={pagination.page_size}
                onChange={handlePageSizeChange}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
              <span className="text-sm text-gray-700 ml-2">kết quả mỗi trang</span>
            </div>
            <span className="text-sm text-gray-700">
              Trang {pagination.page}/{pagination.total_page}
            </span>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">KẾT QUẢ CAO NHẤT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">THAO TÁC</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {historyData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{item.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.scoreboard?.highest_score}</td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleViewDetails(item.id)}
                        className="text-blue-600 hover:text-blue-900 hover:underline"
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
            <div className="text-sm text-gray-700 mb-4 sm:mb-0">
              Hiển thị {startItem}-{endItem} trong tổng số {pagination.total_item} kết quả
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(1)}
                disabled={pagination.page === 1}
                className={`px-3 py-1 rounded-md text-sm ${pagination.page === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                «
              </button>
              
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className={`px-3 py-1 rounded-md text-sm ${pagination.page === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                ‹
              </button>
              
              {getPageNumbers().map((pageNum, index) => (
                pageNum < 0 ? (
                  <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>
                ) : (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-1 rounded-md text-sm ${pagination.page === pageNum ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {pageNum}
                  </button>
                )
              ))}
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.total_page}
                className={`px-3 py-1 rounded-md text-sm ${pagination.page >= pagination.total_page ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                ›
              </button>
              
              <button
                onClick={() => handlePageChange(pagination.total_page)}
                disabled={pagination.page >= pagination.total_page}
                className={`px-3 py-1 rounded-md text-sm ${pagination.page >= pagination.total_page ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                »
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HistoryPage;
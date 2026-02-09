import axiosInstance from './axiosInstance';

/**
 * Get user monthly report with AI insights
 */
export const getUserMonthlyReport = async (userId, month) => {
  const response = await axiosInstance.get(
    `/reports/user/${userId}/monthly`,
    { params: { month } }
  );
  return response.data;
};

/**
 * Get user monthly raw data (without AI)
 */
export const getUserMonthlySummaryRaw = async (userId, month) => {
  const response = await axiosInstance.get(
    `/reports/user/${userId}/monthly/raw`,
    { params: { month } }
  );
  return response.data;
};

/**
 * Get seller monthly report with AI insights
 */
export const getSellerMonthlyReport = async (sellerId, month) => {
  const response = await axiosInstance.get(
    `/reports/seller/${sellerId}/monthly`,
    { params: { month } }
  );
  return response.data;
};

/**
 * Get seller monthly raw data (without AI)
 */
export const getSellerMonthlySummaryRaw = async (sellerId, month) => {
  const response = await axiosInstance.get(
    `/reports/seller/${sellerId}/monthly/raw`,
    { params: { month } }
  );
  return response.data;
};

/**
 * Download user monthly report as PDF
 */
export const downloadUserReport = async (userId, month) => {
  const response = await axiosInstance.get(
    `/reports/user/${userId}/monthly/download`,
    {
      params: { month },
      responseType: 'blob'
    }
  );

  // Create download link
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `carbon-report-${month || 'current'}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

/**
 * Check reports service health
 */
export const checkReportsHealth = async () => {
  const response = await axiosInstance.get('/reports/health');
  return response.data;
};

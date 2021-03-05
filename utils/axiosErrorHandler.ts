const axiosErrorHandler = (err: any) => {
  if (!err.response) return err;
  if (!err.response.data) return err;
  if (!err.response.data.message) return err;
  const { message } = err.response.data;
  if (typeof message === 'string') return new Error(message);
};

export default axiosErrorHandler;
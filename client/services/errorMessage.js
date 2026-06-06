export function describeApiError(err, fallback = 'Something went wrong.') {
  if (err?.response?.data?.message) return err.response.data.message;
  if (err?.response?.status) return `Server error (${err.response.status}).`;
  if (err?.code === 'ERR_NETWORK' || err?.message === 'Network Error') {
    return 'Cannot reach the server. Is the backend running on port 5000?';
  }
  if (err?.code === 'ECONNABORTED') return 'Request timed out.';
  return err?.message || fallback;
}

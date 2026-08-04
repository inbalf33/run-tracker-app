import API from './axios'; // ייבוא המופע המרכזי עם ה-Interceptor

// get all runs
export const getRuns = async () => {
  const response = await API.get('/runs');
  return response.data;
};

// add new run
export const addRun = async (runData) => {
  const response = await API.post('/runs', runData);
  return response.data;
};
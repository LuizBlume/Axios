import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTk4ZTM0MjUzNzJkNzY5ZjllNjI4ZTExM2U5OWUzMiIsIm5iZiI6MTczMTM1NDI1OS41NDA2MjU4LCJzdWIiOiI2NzMyNTk4MGYzZWFmYzUyMDFmZDU2MDciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7bBaW50bLLT_2hwIBn0VKRfuFY_LMfZBbEa3Cxb8NQk`,
  },
});
export default api;
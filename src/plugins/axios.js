import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTk4ZTM0MjUzNzJkNzY5ZjllNjI4ZTExM2U5OWUzMiIsIm5iZiI6MTczMTM1NDI1OS41NDA2MjU4LCJzdWIiOiI2NzMyNTk4MGYzZWFmYzUyMDFmZDU2MDciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7bBaW50bLLT_2hwIBn0VKRfuFY_LMfZBbEa3Cxb8NQk`,
  },
});

// const options = {
//   method: 'GET',
//   url: 'https://api.themoviedb.org/3/discover/movie',
//   params: {
//     include_adult: 'false',
//     include_video: 'false',
//     language: 'en-US',
//     page: '1',
//     sort_by: 'popularity.desc',
//     without_genres: '80' // without Crime
//   },
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTk4ZTM0MjUzNzJkNzY5ZjllNjI4ZTExM2U5OWUzMiIsIm5iZiI6MTczMTk1NzA1Ny41MjY5NzYzLCJzdWIiOiI2NzMyNTk4MGYzZWFmYzUyMDFmZDU2MDciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7Zu5RnV0kJ7oti_sigeBI-adre2u4CZvVs2_Ieiaoiw'
//   }
// };
export default api;
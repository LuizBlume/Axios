import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import api from '@/plugins/axios';
export const useMovieStore = defineStore('movie', () => {
  const state = reactive({
    currentMovie: {},
    moviesByGenre: [],
  });

  const currentMovie = computed(() => state.currentMovie);
  const moviesByGenre = computed(() => state.moviesByGenre);

  const getMoviesByGenre = async (genreIds, page = 1) => {
    try {
      const response = await api.get('discover/movie', {
        params: {
          with_genres: genreIds,
          language: 'pt-BR',
          page,
        },
      });
      state.moviesByGenre = response.data.results;
      return {
        results: response.data.results,
        totalPages: response.data.total_pages,
      }
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  };

  const getMovieDetail = async (movieId) => {
    try {
      const response = await api.get(`movie/${movieId}`, {
        params: { language: 'pt-BR' },
      });
      state.currentMovie = response.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes do filme:', error);
    }
  };

  return { 
    currentMovie, 
    getMovieDetail, 
    moviesByGenre, 
    getMoviesByGenre 
  };
});

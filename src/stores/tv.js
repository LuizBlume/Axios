import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import api from '@/plugins/axios';

export const useTvStore = defineStore('tv', () => {
  const state = reactive({
    currentTv: {},
    tvByGenre: [],
  });

  const currentTv = computed(() => state.currentTv);
  const tvByGenre = computed(() => state.tvByGenre);

  // Buscar programas de TV por gênero
  const getTvByGenre = async (genreIds, page = 1) => {
    try {
      const response = await api.get('discover/tv', {
        params: {
          page,
          language: 'pt-BR',
        },
      });
      state.tvByGenre = response.data.results; // Corrigido para armazenar os resultados corretamente
      return response.data.results;
    } catch (error) {
      console.error('Erro ao buscar programas de TV por gênero:', error);
    }
  };

  // Buscar detalhes de um programa de TV específico
  const getTvDetail = async (tvId) => {
    try {
      const response = await api.get(`tv/${tvId}`, {
        params: { language: 'pt-BR' },
      });
      state.currentTv = response.data; // Armazena os detalhes do programa
    } catch (error) {
      console.error('Erro ao buscar detalhes do programa de TV:', error);
    }
  };

  return {
    state,
    currentTv,
    getTvDetail,
    tvByGenre,
    getTvByGenre,
  };
});

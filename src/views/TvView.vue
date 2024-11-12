<script setup>
import { ref, onMounted } from 'vue';
import { useGenreStore } from '@/stores/genre';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';

const isLoading = ref(false);
const genres = ref([]);
const tv = ref([]);
const genreStore = useGenreStore();

const listTv = async (genreId) => {
  isLoading.value = true;
  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR'
    }
  })
  tv.value = response.data.results
  isLoading.value = false;
}

onMounted(async () => {
  await genreStore.getAllGenres('tv');
});
</script>

<template>
  <h1>Programas de TV</h1>
  <ul class="genre-list">
    <li v-for="genre in genreStore.genres" :key="genre.id" @click="listTv(genre.id)" class="genre-item">
      {{ genre.name }}
    </li>
  </ul>
  <loading v-model:active="isLoading" is-full-page />
  <div class="tv-list">
    <div v-for="listaTv in tv" :key="listaTv.id" class="tv-card">
      <img :src="`https://image.tmdb.org/t/p/w500${listaTv.poster_path}`" :alt="listaTv.name" />
      <div class="tv-details">
        <p class="tv-title">{{ listaTv.name }}</p>
        <p class="tv-release-date">{{ listaTv.first_air_date }}</p>
        <p class="tv-original-name">{{ listaTv.original_name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  padding: 0;
}

.genre-item {
  background-color: #5d6424;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  align-self: center;
  color: #fff;
  display: flex;
  justify-content: center;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #7d8a2e;
  box-shadow: 0 0 0.5rem #5d6424;
}
</style>
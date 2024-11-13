<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { useGenreStore } from '@/stores/genre';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';

const isLoading = ref(false);
const genres = ref([]);
const tvShows = ref([]);
const genreStore = useGenreStore();
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');
const router = useRouter();

function openTv(tvId) {
  router.push({ name: 'TvDetails', params: { tvId } });
}

const listTv = async (genreId) => {
  genreStore.setCurrentGenreId(genreId);
  isLoading.value = true;
  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR'
    }
  });
  tvShows.value = response.data.results;
  isLoading.value = false;
};

onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('tv');
  isLoading.value = false;
});
</script>

<template>
  <h1>Programas de TV</h1>
  <ul class="genre-list">
    <li v-for="genre in genreStore.genres" :key="genre.id" @click="listTv(genre.id)" class="genre-item"
      :class="{ active: genre.id === genreStore.currentGenreId }">
      {{ genre.name }}
    </li>
  </ul>
  <loading v-model:active="isLoading" is-full-page />
  <div class="tv-list">
    <div v-for="tvShow in tvShows" :key="tvShow.id" class="tv-card">
      <img :src="`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`" :alt="tvShow.name"
        @click="openTv(tvShow.id)" />
      <div class="tv-details">
        <p class="tv-title">{{ tvShow.name }}</p>
        <p class="tv-release-date">{{ formatDate(tvShow.first_air_date) }}</p>
        <p class="tv-original-name">{{ tvShow.original_name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  list-style: none;
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}

.genre-item {
  background-color: #5d6424;
  border-radius: 1rem;
  padding: 0.6rem 1.2rem;
  color: #fff;
  transition: all 0.3s ease;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #7d8a2e;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.tv-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.tv-card {
  width: 15rem;
  height: auto;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tv-card img {
  width: 100%;
  height: 20rem;
  object-fit: cover;
}

.tv-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

.tv-details {
  padding: 0.5rem;
}

.tv-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #444;
  margin-bottom: 0.3rem;
}

.active {
  background-color: #8b9a34;
  font-weight: bold;
}
</style>

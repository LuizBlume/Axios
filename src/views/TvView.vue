<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css'; // Importação do CSS do loading overlay
import { useGenreStore } from '@/stores/genre';
import { useTvStore } from '@/stores/tv';

const genreStore = useGenreStore();
const tvStore = useTvStore();
const router = useRouter();
const isLoading = ref(false);
const tvShows = ref([]);
const GENRES_TO_FETCH = [80, 10752]; // Crime (80) e Guerra (10752)

const openTvShow = (tvShowId) => {
  router.push({ name: 'TvDetails', params: { tvId: tvShowId } });
};

const listTvShows = async () => {
  isLoading.value = true;
  try {
    const response = await tvStore.getTvByGenre(GENRES_TO_FETCH.join(','));
    tvShows.value = response || [];
  } catch (error) {
    console.error('Erro ao carregar séries de TV:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('tv');
  await listTvShows();
  isLoading.value = false;
});
</script>

<template>
  <div class="container">
    <h1>Séries de TV de Guerra e Crime</h1>
    <Loading v-model:active="isLoading" is-full-page />

    <div class="tv-show-list">
      <div v-for="tvShow in tvShows" :key="tvShow.id" class="tv-show-card" @click="openTvShow(tvShow.id)">
        <img
          v-if="tvShow.poster_path"
          :src="`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`"
          :alt="tvShow.name"
        />
        <div class="tv-show-details">
          <p class="tv-show-title">{{ tvShow.name }}</p>
          <p class="tv-show-release-date">
            {{ tvShow.first_air_date ? new Date(tvShow.first_air_date).toLocaleDateString('pt-BR') : 'Data desconhecida' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$primary-bg: #121212;
$secondary-bg: #1f1f1f;
$highlight: #ff9800;
$text-primary: #f5f5f5;
$text-muted: lighten($text-primary, 20%);
$shadow: rgba(0, 0, 0, 0.5);

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(180deg, #2b2b2b, #000000);
  color: $text-primary;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  text-align: center;
  color: $highlight;
  text-shadow: 0 2px 4px $shadow;
  margin-bottom: 2rem;
}

.tv-show-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.tv-show-card {
  background-color: $secondary-bg;
  border-radius: 0.5rem;
  overflow: hidden;
  width: 15rem;
  box-shadow: 0 4px 8px $shadow;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  margin-bottom: 2rem;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px $shadow;
  }

  img {
    width: 100%;
    height: 20rem;
    object-fit: cover;
    transition: filter 0.3s ease;

    &:hover {
      filter: brightness(0.9);
    }
  }

  .tv-show-details {
    padding: 0.8rem;
    text-align: center;

    .tv-show-title {
      font-size: 1.2rem;
      font-weight: bold;
      color: $highlight;
      margin-bottom: 0.3rem;
      text-shadow: 0 1px 2px $shadow;
    }

    .tv-show-release-date {
      font-size: 0.9rem;
      color: $text-muted;
    }
  }
}
</style>

<script setup>
import { defineProps, onMounted } from 'vue';
import { useMovieStore } from '@/stores/movie';
import { ref, onUnmounted } from 'vue';

const movieStore = useMovieStore();

const props = defineProps({
  movieId: {
    type: Number,
    required: true,
  },
});

const scrollY = ref(0);

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

onMounted(async () => {
  await movieStore.getMovieDetail(props.movieId);
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="main">
    <div class="content" :style="{ transform: `translateY(${scrollY * 0.3}px)` }">
      <img
        :src="`https://image.tmdb.org/t/p/w500${movieStore.currentMovie.poster_path}`"
        :alt="movieStore.currentMovie.title"
        class="poster"
      />

      <div class="details" :style="{ transform: `translateY(${scrollY * 0.1}px)` }">
        <h1 class="movie-title">Filme: {{ movieStore.currentMovie.title }}</h1>
        <p>{{ movieStore.currentMovie.tagline }}</p>
        <p>{{ movieStore.currentMovie.overview }}</p>
        <p>Orçamento: ${{ movieStore.currentMovie.budget }}</p>
        <p>Avaliação: {{ movieStore.currentMovie.vote_average }}</p>
      </div>
    </div>

    <p class="company-heading">Produtoras</p>
    <div class="companies">
      <template v-for="company in movieStore.currentMovie.production_companies" :key="company.id">
        <img v-if="company.logo_path" :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`" :alt="company.name" class="company-logo" />
        <p v-else class="company-name">{{ company.name }}</p>
      </template>
    </div>
  </div>
</template>

<style scoped>
.main {
  padding: 2rem;
  color: #f5f5f5;
  background: linear-gradient(180deg, #141e30 0%, #243b55 100%);
  min-height: 100vh;
}

.content {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  padding: 2rem;
}

.poster {
  width: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.details {
  max-width: 600px;
}

.movie-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffcc00;
  margin-bottom: 1rem;
}

.company-heading {
  font-size: 1.5rem;
  font-weight: bold;
  color: #f5f5f5;
  margin-top: 3rem;
}

.companies {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.company-logo {
  width: 92px;
  border-radius: 4px;
  background-color: #ffffff;
  padding: 4px;
}

.company-name {
  font-size: 1rem;
  color: #f5f5f5;
}
</style>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import { useGenreStore } from '@/stores/genre';
// import option from '@/plugins/axios';

const genreStore = useGenreStore();
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');
const getGenreName = (id) => genres.value.find((genre) => genre.id === id).name
const isLoading = ref(false);
const genres = ref([]);
const movies = ref([]);
const router = useRouter()
function openMovie(movieId) {
  router.push({ name: 'MovieDetails', params: { movieId } });
}
const listMovies = async (genreId) => {
  genreStore.setCurrentGenreId((genreId))
  isLoading.value = true;
  const response = await api.get('discover/movie', {
    params: {
      with_genres: genreId,
      language: 'pt-BR'
    }
  });
  movies.value = response.data.results
  isLoading.value = false;
};
onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('movie');
  isLoading.value = false;
});
</script>
<template>
  <h1>Filmes</h1>
  <ul class="genre-list">
    <li v-for="genre in genreStore.genres" :key="genre.id" @click="listMovies(genre.id)" class="genre-item"
      :class="{ active: genre.id === genreStore.currentGenreId }">
      {{ genre.name }}
    </li>
  </ul>
  <loading v-model:active="isLoading" is-full-page />
  <div class="movie-list">
    <div v-for="movie in movies" :key="movie.id" class="movie-card">

      <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title"
        @click="openMovie(movie.id)" />
      <div class="movie-details">
        <p class="movie-title">{{ movie.title }}</p>
        <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
        <p class="movie-genres">
          <span v-for="genre_id in movie.genre_ids" :key="genre_id" @click="listMovies(genre_id)"
            :class="{ active: genre_id === genreStore.currentGenreId }">
            {{ genreStore.getGenreName(genre_id) }}
          </span>
        </p>
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
  background-color: #387250;
  border-radius: 1rem;
  padding: 0.6rem 1.2rem;
  color: #fff;
  transition: all 0.3s ease;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #4e9e5f;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.movie-card {
  width: 15rem;
  height: auto;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.movie-card img {
  width: 100%;
  height: 20rem;
  object-fit: cover;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

.movie-details {
  padding: 0.5rem;
}

.movie-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #444;
  margin-bottom: 0.3rem;
}

.movie-genres {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  justify-content: center;
}

.movie-genres span {
  background-color: #748708;
  border-radius: 0.5rem;
  padding: 0.3rem 0.6rem;
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.movie-genres span:hover {
  cursor: pointer;
  background-color: #455a08;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.active {
  background-color: #67b086;
  font-weight: bold;
}

.movie-genres span.active {
  background-color: #abc322;
  color: #000;
  font-weight: bolder;
}
</style>

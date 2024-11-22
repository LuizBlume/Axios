<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import Loading from 'vue-loading-overlay';
import { useGenreStore } from '@/stores/genre';
import { useMovieStore } from '@/stores/movie';

const genreStore = useGenreStore();
const movieStore = useMovieStore();
const router = useRouter();
const isLoading = ref(false);
const movies = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);

const GENRES_TO_FETCH = [80, 10752]; // Crime (80) e Guerra (10752)

// Navegar para os detalhes do filme
const openMovie = (movieId) => {
  router.push({ name: 'MovieDetails', params: { movieId } });
};

// Listar filmes de um gênero com base na página
const listMovies = async (page = 1) => {
  isLoading.value = true;
  try {
    const response = await movieStore.getMoviesByGenre(GENRES_TO_FETCH.join(','), page);
    movies.value = response.results;
    totalPages.value = response.totalPages;
  } catch (error) {
    console.error('Erro ao carregar filmes:', error);
  } finally {
    isLoading.value = false;
  }
};

// Ir para a próxima página
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    listMovies(currentPage.value);
  }
};

// Voltar para a página anterior
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    listMovies(currentPage.value);
  }
};

// Inicializar ao montar o componente
onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('movie');
  await listMovies();
  isLoading.value = false;
});
</script>

<template>
  <div class="container">
    <h1>Filmes de Guerra e Crime</h1>
    <loading v-model:active="isLoading" is-full-page />

    <div class="movie-list">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
          @click="openMovie(movie.id)"
        />
        <div class="movie-details">
          <p class="movie-title">{{ movie.title }}</p>
          <p class="movie-release-date">
            {{ new Date(movie.release_date).toLocaleDateString('pt-BR') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Navegação de Paginação -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Página Anterior</button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Próxima Página</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
$primary-bg: #121212;
$secondary-bg: #1f1f1f;
$highlight: #ff9800;
$text-primary: #f5f5f5;
$text-muted: rgba(255, 255, 255, 0.7);
$shadow: rgba(0, 0, 0, 0.5);

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(180deg, #2b2b2b, #000000);
  color: $text-primary;
}

h1 {
  font-size: 2.5rem;
  text-align: center;
  color: $highlight;
  text-shadow: 0 2px 4px $shadow;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  padding: 2rem;
}

.movie-card {
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

  .movie-details {
    padding: 0.8rem;
    text-align: center;

    .movie-title {
      font-size: 1.2rem;
      font-weight: bold;
      color: $highlight;
      margin-bottom: 0.3rem;
      text-shadow: 0 1px 2px $shadow;
    }

    .movie-release-date {
      font-size: 0.9rem;
      color: $text-muted;
    }
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding: 2rem;
  button {
    background: $highlight;
    color: $text-primary;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    cursor: pointer;
    transition: background 0.3s ease;
    width: 10vw;
    height: 5vh;

    &:disabled {
      background: gray;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background: lighten($highlight, 10%);
    }
  }

  span {
    color: $text-primary;
  }
}
</style>

<script setup>
import { defineProps, onMounted, onUnmounted, ref } from 'vue';
import { useTvStore } from '@/stores/tv';

const tvStore = useTvStore();

const props = defineProps({
  tvId: {
    type: Number,
    required: true,
  },
});

const scrollY = ref(0);

const handleScroll = () => {
  scrollY.value = window.scrollY;
};

onMounted(async () => {
  await tvStore.getTvDetail(props.tvId);
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
        v-if="tvStore.currentTv.poster_path"
        :src="`https://image.tmdb.org/t/p/w500${tvStore.currentTv.poster_path}`"
        :alt="tvStore.currentTv.name"
        class="poster"
      />

      <div class="details" :style="{ transform: `translateY(${scrollY * 0.1}px)` }">
        <h1 class="tv-title">Programa: {{ tvStore.currentTv.name }}</h1>
        <p v-if="tvStore.currentTv.tagline">{{ tvStore.currentTv.tagline }}</p>
        <p>{{ tvStore.currentTv.overview }}</p>
        <p v-if="tvStore.currentTv.vote_average">Avaliação: {{ tvStore.currentTv.vote_average }}</p>
      </div>
    </div>

    <p class="company-heading">Produtoras</p>
    <div class="companies">
      <template v-for="company in tvStore.currentTv.production_companies" :key="company.id">
        <img
          v-if="company.logo_path"
          :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
          :alt="company.name"
          class="company-logo"
        />
        <p v-else class="company-name">{{ company.name }}</p>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
$bg-color: #121212;
$text-color: #f5f5f5;
$accent-color: #ffcc00;
body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  background-color: $bg-color;
  color: $text-color;
}
.main {
  padding: 2rem;
  color: $text-color;
  background: linear-gradient(180deg, #2b2b2b, #000000);
  min-height: 100vh;
}
.content {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  padding: 2rem;
  transform-origin: center top;
}
.poster {
  width: 300px;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.8);
  }
}
.details {
  max-width: 600px;
  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: $accent-color;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    color: lighten($text-color, 10%);
  }
}
.company-heading {
  font-size: 1.8rem;
  font-weight: bold;
  color: $accent-color;
  margin-top: 3rem;
  text-align: center;
}
.companies {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}
.company-logo {
  width: 92px;
  border-radius: 4px;
  background-color: #ffffff;
  padding: 4px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
}
.company-name {
  font-size: 1rem;
  color: lighten($text-color, 20%);
  text-align: center;
}
</style>

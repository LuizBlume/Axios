<template>
  <div class="homepage">
    <section class="hero">
      <div class="hero-content">
        <h2>Descubra o melhor do entretenimento</h2>
        <p>Filmes e séries para todos os gostos, a qualquer hora, em qualquer lugar.</p>
        <button @click="showPopUp" class="cta-button">Comece Agora</button>
      </div>
    </section>

    <!-- PopUp -->
    <div v-if="isPopUpVisible" class="popup-overlay" @click.self="closePopUp">
      <div class="popup">
        <h3>Escolha uma Categoria</h3>
        <button @click="selectOption('movies')" class="option-button">Filmes</button>
        <button @click="selectOption('shows')" class="option-button">Programas de TV</button>
        <button @click="closePopUp" class="close-button">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { useRouter } from 'vue-router';

const router = useRouter();
const isPopUpVisible = ref(false);

// Exibe o pop-up
const showPopUp = () => {
  isPopUpVisible.value = true;
};

// Fecha o pop-up
const closePopUp = () => {
  isPopUpVisible.value = false;
};

// Manipula a escolha do usuário
const selectOption = (option) => {
  if (option === 'movies') router.push({ name: 'Movies' });
  if (option === 'shows') router.push({ name: 'TV' });
  router.push({ name: option });
  closePopUp();
};

onMounted(() => {
  gsap.from('.hero-content h2', {
    duration: 1,
    opacity: 0,
    y: -50,
    ease: 'power2.out',
  });

  gsap.from('.hero-content p', {
    duration: 1.5,
    opacity: 0,
    y: 50,
    delay: 0.5,
    ease: 'power2.out',
  });

  gsap.from('.cta-button', {
    duration: 1,
    scale: 0.8,
    opacity: 0,
    delay: 1,
    ease: 'elastic.out(1, 0.3)',
  });
});
</script>

<style scoped lang="scss">
$bg-color: #121212;
$text-color: #f5f5f5;
$accent-color: #ff9800;

body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  background-color: $bg-color;
  color: $text-color;
}

.homepage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hero {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(180deg, #2b2b2b, #000000);

  .hero-content {
    max-width: 600px;

    h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: $accent-color;
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      color: $text-color;
    }

    .cta-button {
      padding: 0.8rem 1.5rem;
      font-size: 1rem;
      font-weight: bold;
      color: #121212;
      background-color: $accent-color;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .cta-button:hover {
      background-color: #d68101;
    }
  }
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background: $bg-color;
  color: $text-color;
  padding: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  width: 80%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);

  h3 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }

  .option-button {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.8rem;
    font-size: 1rem;
    font-weight: bold;
    background: $accent-color;
    color: #121212;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .option-button:hover {
    background-color: #d68101;
  }

  .close-button {
    background: transparent;
    color: $text-color;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 1rem;
  }

  .close-button:hover {
    text-decoration: underline;
  }
}
</style>

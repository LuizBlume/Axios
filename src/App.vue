<script setup></script>

<template>
  <header class="header">
    <router-link class="logo" to="/">
      <h1 class="logo">CineTV</h1>
    </router-link>
    <nav class="navigation">
      <ul>
        <li><router-link to="/movies">Filmes</router-link></li>
        <li><router-link to="/tv">Programas de TV</router-link></li>
      </ul>
    </nav>
  </header>
    <router-view />
</template>
<style scoped lang="scss">
$bg-color: #121212;
$text-color: #f5f5f5;
$accent-color: #ff9800;

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(43, 43, 43 ,1) 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: $accent-color;
    text-decoration: none;
  }

  .navigation ul {
    list-style: none;
    display: flex;
    gap: 1.5rem;

    li a {
      text-decoration: none;
      color: $text-color;
      font-weight: bold;
      transition: color 0.3s ease;
    }

    li a:hover {
      color: $accent-color;
      padding-bottom: 10px;
      border-bottom: 3px solid $accent-color;
    }
  }
}
</style>
<!--
<template>
  <div id="app">
    <nav>
      <router-link to="/">Inicio</router-link> |
      <router-link to="/doctors">Doctores</router-link> |
      <router-link to="/patients">Pacientes</router-link> |
      <router-link to="/appointments">Citas Médicas</router-link> |
      <router-link to="/consultations">Consultas</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
-->
<template>
  <div id="app">
    <nav>
      <router-link to="/" class="nav-link">Inicio</router-link>
      <router-link to="/doctors" class="nav-link">Doctores</router-link>
      <router-link to="/patients" class="nav-link">Pacientes</router-link>
      <router-link to="/appointments" class="nav-link">Citas Médicas</router-link>
      <router-link to="/consultations" class="nav-link">Hoja de Control Médico</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
#app {
  font-family: 'Arial', sans-serif;
}

nav {
  background-color: #2c3e50;
  padding: 15px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
}

.nav-link {
  color: #ecf0f1;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
}

.nav-link:hover {
  background-color: #3498db;
  color: #fff;
  transform: scale(1.1);
}

nav a.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
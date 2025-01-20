<!--<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
-->
<!----<template>
  <div class="home">
    <header class="home-header">
      <img class="logo" alt="Pediatric Consultation Logo" src="../assets/pediatric_logo.jpg">
      <h1>Consultorio Pediátrico</h1>
      <p>Brindando cuidado y bienestar a los más pequeños.</p>
    </header>
    <main class="home-main">
      <section class="info-section">
        <h2>Bienvenido/a</h2>
        <p>
          Este es el portal de gestión del consultorio pediátrico. Desde aquí podrá:
        </p>
        <ul>
          <li>Gestionar doctores</li>
          <li>Registrar y consultar pacientes</li>
          <li>Programar y revisar citas médicas</li>
          <li>Consultar el historial médico de los pacientes</li>
        </ul>
      </section>
      <section class="image-section">
        <img alt="Happy Children" src="../assets/happy_children.jpg">
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style scoped>
.home {
  font-family: 'Arial', sans-serif;
  text-align: center;
  color: #333;
  background-color: #f9f9f9;
  padding: 20px;
}

.home-header {
  background-color: #4CAF50;
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.logo {
  width: 100px;
  margin-bottom: 10px;
}

.home-header h1 {
  margin: 10px 0;
  font-size: 2.5rem;
}

.home-header p {
  font-size: 1.2rem;
}

.home-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.info-section {
  max-width: 600px;
  margin-bottom: 20px;
  text-align: left;
}

.info-section h2 {
  color: #4CAF50;
  margin-bottom: 10px;
}

.info-section ul {
  padding-left: 20px;
}

.image-section img {
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
-->
<template>
  <div class="home">
    <header class="home-header">
      <img class="logo" alt="Pediatric Consultation Logo" src="../assets/pediatric_logo.jpg">
      <h1>Consultorio Pediátrico</h1>
      <p>Brindando cuidado y bienestar a los más pequeños.</p>
    </header>
    <main class="home-main">
      <section class="info-section">
        <h2>Bienvenido/a</h2>
        <p>
          Este es el portal de gestión del consultorio pediátrico. Desde aquí podrá:
        </p>
        <ul>
          <li>Gestionar doctores</li>
          <li>Registrar y consultar pacientes</li>
          <li>Programar y revisar citas médicas</li>
          <li>Registrar y consultar el historial médico de los pacientes</li>
        </ul>
      </section>
      <section class="image-section">
        <img alt="Happy Children" src="../assets/happy_children.jpg">
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style scoped>
.home {
  font-family: 'Arial', sans-serif;
  text-align: center;
  color: #333;
  background: url("../assets/fondoConsultorio3.jpg") no-repeat center center fixed;
  background-size: cover; 
  padding: 20px;
  min-height: 100vh; 
  box-sizing: border-box; 
}

.home-header {
  background-color: #4CAF50; 
  color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.logo {
  width: 120px;
  margin-bottom: 15px;
  border-radius: 50%; 
}

.home-header h1 {
  margin: 10px 0;
  font-size: 3rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.home-header p {
  font-size: 1.3rem;
  font-style: italic;
}

.home-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.info-section {
  max-width: 700px;
  margin-bottom: 20px;
  text-align: left;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.info-section h2 {
  color: #4CAF50;
  margin-bottom: 15px;
  font-size: 2rem;
  font-weight: 600;
}

.info-section ul {
  padding-left: 20px;
  font-size: 1.1rem;
  line-height: 1.8;
}

.image-section {
  margin-top: 30px;
}

.image-section img {
  width: 100%;
  max-width: 650px;
  border-radius: 10px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.image-section img:hover {
  transform: scale(1.05); 
}

@media (max-width: 768px) {
  .home-header h1 {
    font-size: 2rem;
  }

  .home-header p {
    font-size: 1rem;
  }

  .info-section h2 {
    font-size: 1.8rem;
  }
}
</style>
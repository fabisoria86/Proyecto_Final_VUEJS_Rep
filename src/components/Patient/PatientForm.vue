<!--
<template>
    <form @submit.prevent="handleSubmit">
      <input v-model="patient.name" placeholder="Nombre del paciente" required />
      <input v-model="patient.age" placeholder="Edad" type="number" required />
      <input v-model="patient.contact" placeholder="Contacto" required />
      <button type="submit">Guardar</button>
    </form>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        patient: { name: '', age: '', contact: '' },
      };
    },
    methods: {
      handleSubmit() {
        axios.post('http://localhost:3000/patients', this.patient)
          .then(() => {
            this.$emit('addPatient');
            this.patient = { name: '', age: '', contact: '' };
          })
          .catch(error => console.error(error));
      },
    },
  };
  </script>
-->
<template>
  <div class="page-container">
    <div class="form-container">
      <h2>{{ patient.id ? 'Editar paciente' : 'Agregar Paciente' }}</h2>
      <form @submit.prevent="handleSubmit" class="patient-form">
        <div class="form-group">
          <label for="name">Nombre: </label>
          <input v-model="patient.name" placeholder="Nombre del paciente" required />
        </div>
        <div class="form-group">
          <label for="birthdate">Fecha de Nacimiento: </label>
          <input
            v-model="patient.birthdate"
            type="date"
            placeholder="Fecha de nacimiento"
            required
          />
        </div>
        <div class="form-group">
          <label for="gender">Género: </label>
          <select v-model="patient.gender" required>
            <option value="" disabled>Selecciona el género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>
        <div class="form-group">
          <label for="contact">Teléfono: </label>
          <input v-model="patient.contact" placeholder="Teléfono de contacto" required />
        </div>
        <button type="submit" class="submit-btn">
          {{ patient.id ? 'Actualizar' : 'Agregar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['patientToEdit'],
  data() {
    return {
      patient: {
        name: '',
        birthdate: '',
        gender: '',
        contact: '',
        id: null,
      },
    };
  },
  watch: {
    patientToEdit(newPatient) {
      if (newPatient) {
        this.patient = { ...newPatient };
      }
    },
  },
  methods: {
    handleSubmit() {
      if (this.patient.id) {
        // Editar paciente
        axios
          .put(`http://localhost:3000/patients/${this.patient.id}`, this.patient)
          .then(() => {
            this.$emit('addPatient');
            this.resetForm();
          })
          .catch((error) => console.error(error));
      } else {
        // Crear paciente
        axios
          .post('http://localhost:3000/patients', this.patient)
          .then(() => {
            this.$emit('addPatient');
            this.resetForm();
          })
          .catch((error) => console.error(error));
      }
    },
    resetForm() {
      this.patient = { name: '', birthdate: '', gender: '', contact: '', id: null };
    },
  },
};
</script>

<style scoped>
.page-container {
  max-width: 900px;
  margin: 30px auto;
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-container {
  padding: 20px 25px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

h2 {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #5a5a5a;
  margin-bottom: 15px;
  text-transform: uppercase;
  border-bottom: 2px solid #007bff;
  display: inline-block;
  padding-bottom: 5px;
}

.patient-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group label {
  font-size: 14px;
  font-weight: bold;
  color: #343a40;
}

input, select {
  padding: 12px;
  width: 375px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease;
}

input:focus, select:focus {
  border-color: #007bff;
  outline: none;
}

.submit-btn {
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #0056b3;
}
</style>
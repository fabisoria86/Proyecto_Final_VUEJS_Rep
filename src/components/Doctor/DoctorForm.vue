 <!--- <template>
    <div class="page-container">
      <div class="form-container">
        <h2>{{ doctor.id ? 'Editar Doctor' : 'Agregar Doctor' }}</h2>
        <form @submit.prevent="handleSubmit" class="doctor-form">
          <div class="form-group">
            <label for="name">Nombre: </label>
            <input id="name" v-model="doctor.name" placeholder="Ingrese el nombre" required />
          </div>
          <div class="form-group">
            <label for="specialty">Especialidad: </label>
            <input id="specialty" v-model="doctor.specialty" placeholder="Ingrese la especialidad" required />
          </div>
          <div class="form-group">
            <label for="phone">Teléfono: </label>
            <input id="phone" v-model="doctor.phone" placeholder="Ingrese el teléfono" required />
          </div>
          <div class="form-group">
            <label for="address">Dirección: </label>
            <input id="address" v-model="doctor.address" placeholder="Ingrese la dirección" required />
          </div>
          <div class="form-group">
            <label for="email">Correo Electrónico: </label>
            <input id="email" v-model="doctor.email" placeholder="Ingrese el correo electrónico" required />
          </div>
          <button type="submit" class="submit-btn">
            {{ doctor.id ? 'Actualizar' : 'Agregar' }}
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['doctorToEdit'],
    data() {
      return {
        doctor: {
          name: '',
          specialty: '',
          phone: '',
          address: '',
          email: '',
          id: null
        }
      };
    },
    watch: {
      doctorToEdit(newDoctor) {
        if (newDoctor) {
          this.doctor = { ...newDoctor };
        }
      }
    },
    methods: {
      handleSubmit() {
        if (this.doctor.id) {
          // Si el doctor existe hacemos un update del registro
          axios
            .put(`http://localhost:3000/doctors/${this.doctor.id}`, this.doctor)
            .then(() => this.$emit('addDoctor')) // Emit an event to notify the parent to refresh the list
            .catch((error) => console.error(error));
        } else {
          // Si no existe creamos un nuevo doctor
          axios
            .post('http://localhost:3000/doctors', this.doctor)
            .then(() => this.$emit('addDoctor')) // Emit event after adding doctor
            .catch((error) => console.error(error));
        }
        this.resetForm(); // Reseteamos el formulario
      },
      resetForm() {
        this.doctor = { name: '', specialty: '', phone: '', address: '', email: '', id: null };
      }
    },
    created() {
      if (this.doctorToEdit) {
        this.doctor = { ...this.doctorToEdit };
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para el formulario */
  .page-container {
    max-width: 800px;
    margin: 20px auto;
    font-family: Arial, sans-serif;
  }
  
  .form-container {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }
  
  .doctor-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .form-group label {
    font-size: 14px;
    font-weight: bold;
    color: #555;
  }
  
  .form-group input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .submit-btn {
    padding: 10px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .submit-btn:hover {
    background-color: #0056b3;
  }
  </style>
-->
<template>
  <div class="page-container">
    <div class="form-container">
      <h2>{{ doctor.id ? 'Editar Doctor' : 'Agregar Doctor' }}</h2>
      <form @submit.prevent="handleSubmit" class="doctor-form">
        <div class="form-group">
          <label for="name">Nombre: </label>
          <input id="name" v-model="doctor.name" placeholder="Ingrese el nombre" required />
        </div>
        <div class="form-group">
          <label for="specialty">Especialidad: </label>
          <input id="specialty" v-model="doctor.specialty" placeholder="Ingrese la especialidad" required />
        </div>
        <div class="form-group">
          <label for="phone">Teléfono: </label>
          <input id="phone" v-model="doctor.phone" placeholder="Ingrese el teléfono" required />
        </div>
        <div class="form-group">
          <label for="address">Dirección: </label>
          <input id="address" v-model="doctor.address" placeholder="Ingrese la dirección" required />
        </div>
        <div class="form-group">
          <label for="email">Correo Electrónico: </label>
          <input id="email" v-model="doctor.email" placeholder="Ingrese el correo electrónico" required />
        </div>
        <button type="submit" class="submit-btn">
          {{ doctor.id ? 'Actualizar' : 'Agregar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['doctorToEdit'],
  data() {
    return {
      doctor: {
        name: '',
        specialty: '',
        phone: '',
        address: '',
        email: '',
        id: null
      }
    };
  },
  watch: {
    doctorToEdit(newDoctor) {
      if (newDoctor) {
        this.doctor = { ...newDoctor };
      }
    }
  },
  methods: {
    handleSubmit() {
      if (this.doctor.id) {
        // Si el doctor existe hacemos un update del registro
        axios
          .put(`http://localhost:3000/doctors/${this.doctor.id}`, this.doctor)
          .then(() => this.$emit('addDoctor')) 
          .catch((error) => console.error(error));
      } else {
        // Si no existe creamos un nuevo doctor
        axios
          .post('http://localhost:3000/doctors', this.doctor)
          .then(() => this.$emit('addDoctor')) 
          .catch((error) => console.error(error));
      }
      this.resetForm(); // Reseteamos el formulario
    },
    resetForm() {
      this.doctor = { name: '', specialty: '', phone: '', address: '', email: '', id: null };
    }
  },
  created() {
    if (this.doctorToEdit) {
      this.doctor = { ...this.doctorToEdit };
    }
  }
};
</script>

<style scoped>
.page-container {
  max-width: 900px;
  margin: 40px auto;
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-container {
  padding: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
}

.doctor-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group label {
  font-size: 14px;
  font-weight: bold;
  color: #555;
}

.form-group input {
  padding: 12px;
  width: 375px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

.form-group input:focus {
  border-color: #007bff;
  background-color: #ffffff;
  outline: none;
}

.submit-btn {
  padding: 12px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.submit-btn:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.submit-btn:active {
  background-color: #004085;
  transform: translateY(0);
}
</style>
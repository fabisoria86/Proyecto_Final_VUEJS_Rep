<template>
  <div class="home">
    <h3>DOCTORES</h3>
    <DoctorForm @addDoctor="fetchDoctors" :doctorToEdit="doctorToEdit" />

    <div class="table-container">
      <h2>Doctores Registrados</h2>

      <!-- Buscador -->
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Buscar por nombre o apellido"
          class="search-input"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doctor in filteredDoctors" :key="doctor.id">
            <td>{{ doctor.name }}</td>
            <td>{{ doctor.specialty }}</td>
            <td>
              <button @click="editDoctor(doctor)" class="edit-btn">Editar</button>&nbsp;
              <button @click="deleteDoctor(doctor.id)" class="delete-btn">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DoctorForm from './DoctorForm.vue';

export default {
  components: { DoctorForm },
  data() {
    return {
      doctors: [],
      doctorToEdit: null,
      searchQuery: "", // Variable para el texto del buscador
    };
  },
  computed: {
    // Filtro para los doctores para la busqueda
    filteredDoctors() {
      if (!this.searchQuery) {
        return this.doctors;
      }
      return this.doctors.filter(doctor => 
        doctor.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    fetchDoctors() {
      axios.get('http://localhost:3000/doctors')
        .then(response => {
          this.doctors = response.data;
        })
        .catch(error => console.error(error));
    },
    editDoctor(doctor) {
      this.doctorToEdit = { ...doctor }; // Clonamos el objeto para evitar modificarlo directamente
    },
    deleteDoctor(id) {
      axios.delete(`http://localhost:3000/doctors/${id}`)
        .then(() => this.fetchDoctors())
        .catch(error => console.error(error));
    }
  },
  created() {
    this.fetchDoctors();
  }
};
</script>

<style scoped>
h3 {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  color: #007bff;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.home {
  font-family: 'Arial', sans-serif;
  text-align: center;
  color: #333;
  background: url('@/assets/fondoConsultorio3.jpg') no-repeat center center;
  /*background-size: cover; */
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  
  padding: 20px;
  min-height: 100vh; 
  box-sizing: border-box; 

  max-width: 100%;
}

.table-container {
  margin-top: 30px;
  padding: 30px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.9); 
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  font-size: 26px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
}

.search-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.search-input {
  width: 60%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
}

th {
  background-color: #f9f9f9;
  font-weight: bold;
  color: #555;
}

td {
  color: #333;
}

tr:hover {
  background-color: #f1f1f1;
}

button {
  padding: 8px 18px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.edit-btn {
  background-color: #ffc107;
  color: white;
  border-radius: 6px;
}

.edit-btn:hover {
  background-color: #e0a800;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
  border-radius: 6px;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>
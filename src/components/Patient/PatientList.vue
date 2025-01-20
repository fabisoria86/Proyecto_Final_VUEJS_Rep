<!--
<template>
    <div>
      <h1>Pacientes</h1>
      <PatientForm @addPatient="fetchPatients" />
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Contacto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in patients" :key="patient.id">
            <td>{{ patient.name }}</td>
            <td>{{ patient.age }}</td>
            <td>{{ patient.contact }}</td>
            <td>
              <button @click="editPatient(patient)">Editar</button>
              <button @click="deletePatient(patient.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import PatientForm from './PatientForm.vue';
  
  export default {
    components: { PatientForm },
    data() {
      return {
        patients: [],
      };
    },
    methods: {
      fetchPatients() {
        axios.get('http://localhost:3000/patients')
          .then(response => {
            this.patients = response.data;
          })
          .catch(error => console.error(error));
      },
      deletePatient(id) {
        axios.delete(`http://localhost:3000/patients/${id}`)
          .then(() => this.fetchPatients())
          .catch(error => console.error(error));
      },
      editPatient(patient) {
        console.log("Editing Patient", patient);
      },
    },
    created() {
      this.fetchPatients();
    },
  };
  </script>
-->
<!---
<template>
  <div class="home">
    <h3>PACIENTES</h3>
    <PatientForm @addPatient="fetchPatients" :patientToEdit="patientToEdit" />
    <div class="table-container">
      <h2>Pacientes Registrados</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in patients" :key="patient.id">
            <td>{{ patient.name }}</td>
            <td>{{ calculateAge(patient.birthdate) }}</td>
            <td>{{ patient.contact }}</td>
            <td>
              <button @click="editPatient(patient)">Editar</button>&nbsp;
              <button @click="deletePatient(patient.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PatientForm from './PatientForm.vue';

export default {
  components: { PatientForm },
  data() {
    return {
      patients: [],
      patientToEdit: null,
    };
  },
  methods: {
    fetchPatients() {
      axios
        .get('http://localhost:3000/patients')
        .then((response) => {
          this.patients = response.data;
        })
        .catch((error) => console.error(error));
    },
    deletePatient(id) {
      axios
        .delete(`http://localhost:3000/patients/${id}`)
        .then(() => this.fetchPatients())
        .catch((error) => console.error(error));
    },
    editPatient(patient) {
      this.patientToEdit = { ...patient };
    },
    calculateAge(birthdate) {
      if (!birthdate) return 'N/A';
      const birthDate = new Date(birthdate);
      const today = new Date();

      const years = today.getFullYear() - birthDate.getFullYear();
      const months =
        today.getMonth() -
        birthDate.getMonth() +
        (years * 12) +
        (today.getDate() < birthDate.getDate() ? -1 : 0);

      if (years < 1) {
        return `${months} meses`;
      }

      return `${years} años`;
    },
  },
  created() {
    this.fetchPatients();
  },
};
</script>

<style scoped>
.table-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.home {
  font-family: 'Arial', sans-serif;
  text-align: center;
  color: #333;
  background-color: #f0f8ff; 
  padding: 20px;
}
h3 {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  color: #5a5a5a;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

h2 {
  font-size: 26px;
  color: #5a5a5a;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
}

th, td {
  padding: 15px;
  text-align: left;
  /*border: 1px solid #ddd;*/
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #6c757d;
  font-weight: bold;
  color: #fff;
}

td {
  color: #333;
}

tr:hover {
  background-color: #f1f1f1;
}

button {
  padding: 8px 15px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  opacity: 0.9;
}

button:nth-child(1) {
  background-color: #ffc107;
  color: #fff;
}

button:nth-child(2) {
  background-color: #dc3545;
  color: #fff;
}
</style>
-->
<template>
  <div class="home">
    <h3>PACIENTES</h3>
    <PatientForm @addPatient="fetchPatients" :patientToEdit="patientToEdit" />
    <div class="table-container">
      <h2>Pacientes Registrados</h2>

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
            <th>Edad</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in filteredPatients" :key="patient.id">
            <td>{{ patient.name }}</td>
            <td>{{ calculateAge(patient.birthdate) }}</td>
            <td>{{ patient.contact }}</td>
            <td>
              <button @click="editPatient(patient)">Editar</button>&nbsp;
              <button @click="deletePatient(patient.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import PatientForm from './PatientForm.vue';

export default {
  components: { PatientForm },
  data() {
    return {
      patients: [],
      patientToEdit: null,
      searchQuery: "", // Variable para el filtro de búsqueda
    };
  },
  computed: {
    filteredPatients() {
      if (!this.searchQuery) return this.patients; // Si no hay lo buscado, mostramos todos los pacientes
      return this.patients.filter(patient => {
        const fullName = patient.name.toLowerCase();
        return fullName.includes(this.searchQuery.toLowerCase()); // Comparamos en minúsculas
      });
    },
  },
  methods: {
    fetchPatients() {
      axios
        .get('http://localhost:3000/patients')
        .then((response) => {
          this.patients = response.data;
        })
        .catch((error) => console.error(error));
    },
    deletePatient(id) {
      axios
        .delete(`http://localhost:3000/patients/${id}`)
        .then(() => this.fetchPatients())
        .catch((error) => console.error(error));
    },
    editPatient(patient) {
      this.patientToEdit = { ...patient };
    },
    calculateAge(birthdate) {
      if (!birthdate) return 'N/A';
      const birthDate = new Date(birthdate);
      const today = new Date();

      const years = today.getFullYear() - birthDate.getFullYear();
      const months =
        today.getMonth() -
        birthDate.getMonth() +
        (years * 12) +
        (today.getDate() < birthDate.getDate() ? -1 : 0);

      if (years < 1) {
        return `${months} meses`;
      }

      return `${years} años`;
    },
  },
  created() {
    this.fetchPatients();
  },
};
</script>
<style scoped>
.table-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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
h3 {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  color: #5a5a5a;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

h2 {
  font-size: 26px;
  color: #5a5a5a;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #6c757d;
  font-weight: bold;
  color: #fff;
}

td {
  color: #333;
}

tr:hover {
  background-color: #f1f1f1;
}

button {
  padding: 8px 15px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  opacity: 0.9;
}

button:nth-child(1) {
  background-color: #ffc107;
  color: #fff;
}

button:nth-child(2) {
  background-color: #dc3545;
  color: #fff;
}

.search-container {
  margin-bottom: 20px;
  text-align: center;
}

.search-input {
  padding: 8px 15px;
  width: 80%;
  max-width: 500px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 10px;
}
</style>

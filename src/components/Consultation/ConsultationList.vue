<!---
<template>
  <div class="consultation-list">
    <h1>Hoja de Control Médico</h1>
    <ConsultationForm 
      :doctors="doctors" 
      :patients="patients" 
      @addConsultation="addConsultation" 
      @updateConsultation="updateConsultation"
    />

    <h2>Consultas Registradas</h2>
    <table>
      <thead>
        <tr>
          <th>Doctor</th>
          <th>Paciente</th>
          <th>Diagnóstico</th>
          <th>Tratamiento</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="consultation in consultations" :key="consultation.id">
          <td>{{ consultation.doctorName }}</td>
          <td>{{ consultation.patientName }}</td>
          <td>{{ consultation.diagnosis }}</td>
          <td>{{ consultation.treatment }}</td>
          <td>
            <button @click="editConsultation(consultation)">Editar</button>
            <button @click="deleteConsultation(consultation.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import ConsultationForm from './ConsultationForm.vue';

export default {
  components: { ConsultationForm },
  data() {
    return {
      consultations: [],
      doctors: [],
      patients: [],
    };
  },
  methods: {
    fetchData() {
      axios.get('http://localhost:3000/doctors').then(response => (this.doctors = response.data));
      axios.get('http://localhost:3000/patients').then(response => (this.patients = response.data));
      axios.get('http://localhost:3000/consultations').then(response => (this.consultations = response.data));
    },
    addConsultation(consultation) {
      axios.post('http://localhost:3000/consultations', consultation)
        .then(() => this.fetchData())
        .catch(error => console.error(error));
    },
    updateConsultation(consultation) {
      axios.put(`http://localhost:3000/consultations/${consultation.id}`, consultation)
        .then(() => this.fetchData())
        .catch(error => console.error(error));
    },
    deleteConsultation(id) {
      axios.delete(`http://localhost:3000/consultations/${id}`)
        .then(() => this.fetchData())
        .catch(error => console.error(error));
    },
    editConsultation(consultation) {
      this.$refs.consultationForm.consultation = { ...consultation };
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.consultation-list {
  font-family: Arial, sans-serif;
  margin: 20px auto;
  max-width: 1200px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead {
  background-color: #007bff;
  color: white;
}

th, td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

button {
  padding: 5px 10px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>
-->
<!---
<template>
  <div class="consultation-list">
    <h1>Hoja de Control Médico</h1>
    <ConsultationForm 
      :doctors="doctors" 
      :patients="patients" 
      @fetchConsultations="fetchConsultations" 
      @editConsultation="editConsultation"
      :consultationToEdit="consultationToEdit" 
    />

    <h2>Consultas Registradas</h2>
    <div v-for="consultation in consultations" :key="consultation.id" class="consultation-card">

      <h3>{{ getDoctorName(consultation.doctorId) }}</h3>
      <p><strong>Paciente:</strong> {{ getPatientName(consultation.patientId) }}</p>
      <p><strong>Diagnóstico:</strong> {{ consultation.diagnosis }}</p>
      <p><strong>Tratamiento:</strong> {{ consultation.treatment }}</p>
      <p><strong>Fecha:</strong> {{ consultation.date }}</p>
      <p><strong>Hora:</strong> {{ consultation.time }}</p>
      <button @click="editConsultation(consultation)">Editar</button>
      <button @click="deleteConsultation(consultation.id)">Eliminar</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ConsultationForm from "./ConsultationForm.vue";

export default {
  components: { ConsultationForm },
  data() {
    return {
      doctors: [],
      patients: [],
      consultations: [],
      consultationToEdit: null, // Variable to store the consultation to edit
    };
  },
  methods: {
    fetchDoctors() {
      axios
        .get("http://localhost:3000/doctors")
        .then((response) => {
          this.doctors = response.data;
        })
        .catch((error) => console.error(error));
    },
    fetchPatients() {
      axios
        .get("http://localhost:3000/patients")
        .then((response) => {
          this.patients = response.data;
        })
        .catch((error) => console.error(error));
    },
    fetchConsultations() {
      axios
        .get("http://localhost:3000/consultations")
        .then((response) => {
          this.consultations = response.data;
        })
        .catch((error) => console.error(error));
    },
    editConsultation(consultation) {
      // Set the consultation to edit
      this.consultationToEdit = consultation;
    },
    deleteConsultation(id) {
      axios
        .delete(`http://localhost:3000/consultations/${id}`)
        .then(() => this.fetchConsultations())
        .catch((error) => console.error(error));
    },
    // Método para obtener el nombre del doctor según doctorId
    getDoctorName(doctorId) {
      const doctor = this.doctors.find(doctor => doctor.id === doctorId);
      return doctor ? doctor.name : 'Doctor no encontrado';
    },
    // Método para obtener el nombre del paciente según patientId
    getPatientName(patientId) {
      const patient = this.patients.find(patient => patient.id === patientId);
      return patient ? patient.name : 'Paciente no encontrado';
    },
  },
  created() {
    this.fetchDoctors();
    this.fetchPatients();
    this.fetchConsultations();
  },
};
</script>

<style scoped>
.consultation-list {
  font-family: Arial, sans-serif;
  margin: 20px auto;
  max-width: 800px;
}

.consultation-card {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

button {
  padding: 5px 10px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

button:nth-child(1) {
  background-color: #ffc107;
}

button:nth-child(2) {
  background-color: #dc3545;
}
</style>
-->
<template>
  <div class="home">
    <div class="consultation-list">
      <h3>Hoja de Control Médico</h3>
      <ConsultationForm 
        :doctors="doctors" 
        :patients="patients" 
        @fetchConsultations="fetchConsultations" 
        @editConsultation="editConsultation"
        :consultationToEdit="consultationToEdit" 
      />

      <h3>Consultas Registradas</h3>
      <div v-for="consultation in consultations" :key="consultation.id" class="consultation-card">
        <h2>{{ getDoctorName(consultation.doctorId) }}</h2>
        <p><strong>Paciente:</strong> {{ getPatientName(consultation.patientId) }}</p>
        <p><strong>Diagnóstico:</strong> {{ consultation.diagnosis }}</p>
        <p><strong>Tratamiento:</strong> {{ consultation.treatment }}</p>
        <p><strong>Fecha:</strong> {{ consultation.date }}</p>
        <p><strong>Hora:</strong> {{ consultation.time }}</p>
        <div class="action-buttons">
          <button class="edit-btn" @click="editConsultation(consultation)">Editar</button>
          <button class="delete-btn" @click="deleteConsultation(consultation.id)">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ConsultationForm from "./ConsultationForm.vue";

export default {
  components: { ConsultationForm },
  data() {
    return {
      doctors: [],
      patients: [],
      consultations: [],
      consultationToEdit: null,
    };
  },
  methods: {
    fetchDoctors() {
      axios
        .get("http://localhost:3000/doctors")
        .then((response) => {
          this.doctors = response.data;
        })
        .catch((error) => console.error(error));
    },
    fetchPatients() {
      axios
        .get("http://localhost:3000/patients")
        .then((response) => {
          this.patients = response.data;
        })
        .catch((error) => console.error(error));
    },
    fetchConsultations() {
      axios
        .get("http://localhost:3000/consultations")
        .then((response) => {
          this.consultations = response.data;
        })
        .catch((error) => console.error(error));
    },
    editConsultation(consultation) {
      this.consultationToEdit = consultation;
    },
    deleteConsultation(id) {
      axios
        .delete(`http://localhost:3000/consultations/${id}`)
        .then(() => this.fetchConsultations())
        .catch((error) => console.error(error));
    },
    getDoctorName(doctorId) {
      const doctor = this.doctors.find((doctor) => doctor.id === doctorId);
      return doctor ? doctor.name : "Doctor no encontrado";
    },
    getPatientName(patientId) {
      const patient = this.patients.find((patient) => patient.id === patientId);
      return patient ? patient.name : "Paciente no encontrado";
    },
  },
  created() {
    this.fetchDoctors();
    this.fetchPatients();
    this.fetchConsultations();
  },
};
</script>

<style scoped>
.consultation-list {
  font-family: 'Arial', sans-serif;
  margin: 20px auto;
  max-width: 900px;
  padding: 20px;
  background-color: #fdfdfd;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: #333;
}

.home {
  font-family: 'Arial', sans-serif;
  text-align: center;
  color: #333;
  background: url('@/assets/fondoConsultorio3.jpg') no-repeat center center;
  /*background-size: 100% 100%; */
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;

  padding: 20px;
  min-height: 100vh; 
  box-sizing: border-box; 

  max-width: 100%;
}

h1 {
  text-align: center;
  color: #4f5a5f;
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 30px;
}

h2 {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #598091;
  margin: 20px 0;
}

h3 {
  font-size: 48px;
  text-align: center;
  color: #4f5a5f;
  font-weight: bold;
  margin-bottom: 10px;
}

.consultation-card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.consultation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

p {
  margin: 5px 0;
  font-size: 16px;
  line-height: 1.5;
}

strong {
  color: #555;
}

.action-buttons {
  margin-top: 10px;
}

button {
  padding: 10px 15px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-btn {
  background-color: #ffc107;
  color: white;
}

.edit-btn:hover {
  background-color: #e0a800;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>
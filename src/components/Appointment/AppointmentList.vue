<!--
<template>
    <div>
      <h1>Citas Médicas</h1>
      <AppointmentForm 
        :doctors="doctors" 
        :patients="patients" 
        @addAppointment="fetchAppointments" 
      />
      <table>
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Paciente</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appointment in appointments" :key="appointment.id">
            <td>{{ appointment.doctorName }}</td>
            <td>{{ appointment.patientName }}</td>
            <td>{{ appointment.date }}</td>
            <td>{{ appointment.time }}</td>
            <td>
              <button @click="deleteAppointment(appointment.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import AppointmentForm from './AppointmentForm.vue';
  
  export default {
    components: { AppointmentForm },
    data() {
      return {
        appointments: [],
        doctors: [],
        patients: [],
      };
    },
    methods: {
      fetchAppointments() {
        axios.get('http://localhost:3000/appointments')
          .then(response => {
            this.appointments = response.data;
          })
          .catch(error => console.error(error));
      },
      fetchDoctorsAndPatients() {
        axios.get('http://localhost:3000/doctors').then((res) => this.doctors = res.data);
        axios.get('http://localhost:3000/patients').then((res) => this.patients = res.data);
      },
      deleteAppointment(id) {
        axios.delete(`http://localhost:3000/appointments/${id}`)
          .then(() => this.fetchAppointments())
          .catch(error => console.error(error));
      },
    },
    created() {
      this.fetchAppointments();
      this.fetchDoctorsAndPatients();
    },
  };
  </script>
-->
<!---
<template>
  <div class="consultation-list">
    <h3>CITAS MÉDICAS</h3>
    <AppointmentForm 
      :doctors="doctors" 
      :patients="patients" 
      :appointmentToEdit="appointmentToEdit" 
      @addAppointment="fetchAppointments" 
    />
    <div>
      <h2>Pacientes por Médico</h2>
      <div v-for="doctor in doctors" :key="doctor.id" class="appointment-group">
        <h1>{{ doctor.name }}</h1>
        <table v-if="filteredAppointments[doctor.id] && filteredAppointments[doctor.id].length">
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="appointment in filteredAppointments[doctor.id]" :key="appointment.id">
              <td>{{ appointment.patientName }}</td>
              <td>{{ appointment.date }}</td>
              <td>{{ appointment.time }}</td>
              <td>
                <button @click="editAppointment(appointment)">Editar</button>
                <button @click="deleteAppointment(appointment.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No hay pacientes asignados.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AppointmentForm from './AppointmentForm.vue';

export default {
  components: { AppointmentForm },
  data() {
    return {
      appointments: [],
      doctors: [],
      patients: [],
      appointmentToEdit: null,
      filteredAppointments: {},
    };
  },
  methods: {
    fetchAppointments() {
      axios.get('http://localhost:3000/appointments')
        .then(response => {
          this.appointments = response.data.map(appointment => ({
            ...appointment,
            doctorName: appointment.doctorName || this.doctors.find(d => d.id === appointment.doctorId)?.name,
            patientName: appointment.patientName || this.patients.find(p => p.id === appointment.patientId)?.name,
          }));
          this.groupAppointmentsByDoctor();
        })
        .catch(error => console.error(error));
    },
    fetchDoctorsAndPatients() {
      axios.get('http://localhost:3000/doctors').then((res) => this.doctors = res.data);
      axios.get('http://localhost:3000/patients').then((res) => this.patients = res.data);
    },
    groupAppointmentsByDoctor() {
      this.filteredAppointments = {};
      this.appointments.forEach(appointment => {
        if (!this.filteredAppointments[appointment.doctorId]) {
          this.filteredAppointments[appointment.doctorId] = [];
        }
        this.filteredAppointments[appointment.doctorId].push(appointment);
      });
    },
    deleteAppointment(id) {
      axios.delete(`http://localhost:3000/appointments/${id}`)
        .then(() => this.fetchAppointments())
        .catch(error => console.error(error));
    },
    editAppointment(appointment) {
      this.appointmentToEdit = { ...appointment };
    },
  },
  created() {
    this.fetchAppointments();
    this.fetchDoctorsAndPatients();
  },
};
</script>

<style scoped>
.consultation-list {
  font-family: Arial, sans-serif;
  margin: 20px auto;
  max-width: 800px;
}
h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 10px;
  color: #007bff;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

h3 {
  margin-bottom: 10px;
  color: #007bff;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

thead {
  background-color: #007bff;
  color: white;
}

th, td {
  padding: 8px;
  border: 1px solid #ccc;
  text-align: left;
}

p {
  text-align: center;
  font-size: 16px;
  color: #999;
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
<!---
<template>
  <div class="home">
  <div class="consultation-list">
    <h3>CITAS MÉDICAS</h3>
    <AppointmentForm 
      :doctors="doctors" 
      :patients="patients" 
      :appointmentToEdit="appointmentToEdit" 
      @addAppointment="fetchAppointments" 
    />
    <div>
      <h2>Pacientes por Médico</h2>
      <div v-for="doctor in doctors" :key="doctor.id" class="appointment-group">
        <h1>{{ doctor.name }}</h1>
        <table v-if="filteredAppointments[doctor.id] && filteredAppointments[doctor.id].length">
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="appointment in filteredAppointments[doctor.id]" :key="appointment.id">
              <td>{{ appointment.patientName }}</td>
              <td>{{ appointment.date }}</td>
              <td>{{ appointment.time }}</td>
              <td>
                <button class="edit-btn" @click="editAppointment(appointment)">Editar</button>&nbsp;
                <button class="delete-btn" @click="deleteAppointment(appointment.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No hay pacientes asignados.</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import AppointmentForm from './AppointmentForm.vue';

export default {
  components: { AppointmentForm },
  data() {
    return {
      appointments: [],
      doctors: [],
      patients: [],
      appointmentToEdit: null,
      filteredAppointments: {},
    };
  },
  methods: {
    fetchAppointments() {
      axios.get('http://localhost:3000/appointments')
        .then(response => {
          this.appointments = response.data.map(appointment => ({
            ...appointment,
            doctorName: appointment.doctorName || this.doctors.find(d => d.id === appointment.doctorId)?.name,
            patientName: appointment.patientName || this.patients.find(p => p.id === appointment.patientId)?.name,
          }));
          this.groupAppointmentsByDoctor();
        })
        .catch(error => console.error(error));
    },
    fetchDoctorsAndPatients() {
      axios.get('http://localhost:3000/doctors').then((res) => this.doctors = res.data);
      axios.get('http://localhost:3000/patients').then((res) => this.patients = res.data);
    },
    groupAppointmentsByDoctor() {
      this.filteredAppointments = {};
      this.appointments.forEach(appointment => {
        if (!this.filteredAppointments[appointment.doctorId]) {
          this.filteredAppointments[appointment.doctorId] = [];
        }
        this.filteredAppointments[appointment.doctorId].push(appointment);
      });
    },
    deleteAppointment(id) {
      axios.delete(`http://localhost:3000/appointments/${id}`)
        .then(() => this.fetchAppointments())
        .catch(error => console.error(error));
    },
    editAppointment(appointment) {
      this.appointmentToEdit = { ...appointment };
    },
  },
  created() {
    this.fetchAppointments();
    this.fetchDoctorsAndPatients();
  },
};
</script>

<style scoped>
.consultation-list {
  font-family: 'Roboto', sans-serif;
  margin: 20px auto;
  max-width: 900px;
  color: #333;
  background-color: #f9f9f9;
  padding: 20px;
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

h1 {
  text-align: center;
  font-size: 22px;
  color: #1c9fd4;
  margin: 20px 0 10px;
}

h2 {
  text-align: center;
  font-size: 20px;
  color: #555;
  margin: 30px 0;
}

h3 {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  color: #1c9fd4;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  border-radius: 8px;
  overflow: hidden;
}

thead {
  background-color: #007bff;
  color: white;
}

th, td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
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

p {
  text-align: center;
  font-size: 16px;
  color: #777;
  margin-top: 10px;
}

.appointment-group {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
</style>
-->
<template>
  <div class="home">
    <div class="consultation-list">
      <h3>CITAS MÉDICAS</h3>
      <AppointmentForm 
        :doctors="doctors" 
        :patients="filteredPatients" 
        :appointmentToEdit="appointmentToEdit" 
        @addAppointment="fetchAppointments" 
      />

      <div class="search-bar">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Buscar por nombre o apellido del médico" 
        />
      </div>
      
      <div>
        <h2>Pacientes por Médico</h2>
        <div v-for="doctor in filteredDoctors" :key="doctor.id" class="appointment-group">
          <h1>{{ doctor.name }}</h1>
          <table v-if="filteredAppointments[doctor.id] && filteredAppointments[doctor.id].length">
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="appointment in filteredAppointments[doctor.id]" :key="appointment.id">
                <td>{{ appointment.patientName }}</td>
                <td>{{ appointment.date }}</td>
                <td>{{ appointment.time }}</td>
                <td>
                  <button class="edit-btn" @click="editAppointment(appointment)">Editar</button>&nbsp;
                  <button class="delete-btn" @click="deleteAppointment(appointment.id)">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else>No hay pacientes asignados.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AppointmentForm from './AppointmentForm.vue';

export default {
  components: { AppointmentForm },
  data() {
    return {
      appointments: [],
      doctors: [],
      patients: [],
      appointmentToEdit: null,
      filteredAppointments: {},
      searchQuery: "",  // Variable para el texto del buscador
    };
  },
  computed: {
    // Filtro para la busqueda
    filteredDoctors() {
      if (!this.searchQuery) return this.doctors;
      
      const query = this.searchQuery.toLowerCase();
      return this.doctors.filter(doctor => {
        const fullName = `${doctor.name}`.toLowerCase();
        return fullName.includes(query);
      });
    },
  },
  methods: {
    fetchAppointments() {
      axios.get('http://localhost:3000/appointments')
        .then(response => {
          this.appointments = response.data.map(appointment => ({
            ...appointment,
            doctorName: appointment.doctorName || this.doctors.find(d => d.id === appointment.doctorId)?.name,
            patientName: appointment.patientName || this.patients.find(p => p.id === appointment.patientId)?.name,
          }));
          this.groupAppointmentsByDoctor();
        })
        .catch(error => console.error(error));
    },
    fetchDoctorsAndPatients() {
      axios.get('http://localhost:3000/doctors').then((res) => this.doctors = res.data);
      axios.get('http://localhost:3000/patients').then((res) => {
        this.patients = res.data;
        this.filteredPatients = res.data; 
      });
    },
    groupAppointmentsByDoctor() {
      this.filteredAppointments = {};
      this.appointments.forEach(appointment => {
        if (!this.filteredAppointments[appointment.doctorId]) {
          this.filteredAppointments[appointment.doctorId] = [];
        }
        this.filteredAppointments[appointment.doctorId].push(appointment);
      });
    },
    deleteAppointment(id) {
      axios.delete(`http://localhost:3000/appointments/${id}`)
        .then(() => this.fetchAppointments())
        .catch(error => console.error(error));
    },
    editAppointment(appointment) {
      this.appointmentToEdit = { ...appointment };
    },
  },
  created() {
    this.fetchAppointments();
    this.fetchDoctorsAndPatients();
  },
};
</script>

<style scoped>
.consultation-list {
  font-family: 'Arial', sans-serif;
  margin: 20px auto;
  max-width: 900px;
  color: #333;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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
  font-size: 22px;
  color: #1c9fd4;
  margin: 20px 0 10px;
}

h2 {
  text-align: center;
  font-size: 20px;
  color: #555;
  margin: 30px 0;
}

h3 {
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  color: #1c9fd4;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  border-radius: 8px;
  overflow: hidden;
}

thead {
  background-color: #007bff;
  color: white;
}

th, td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
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

p {
  text-align: center;
  font-size: 16px;
  color: #777;
  margin-top: 10px;
}

.appointment-group {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.search-bar {
  margin-bottom: 20px;
}

.search-bar input {
  padding: 10px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>

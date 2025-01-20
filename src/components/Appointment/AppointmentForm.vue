<!--
<template>
    <form @submit.prevent="handleSubmit">
      <select v-model="appointment.doctorId" required>
        <option disabled value="">Seleccione un doctor</option>
        <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
          {{ doctor.name }}
        </option>
      </select>
      <select v-model="appointment.patientId" required>
        <option disabled value="">Seleccione un paciente</option>
        <option v-for="patient in patients" :key="patient.id" :value="patient.id">
          {{ patient.name }}
        </option>
      </select>
      <input v-model="appointment.date" type="date" required />
      <input v-model="appointment.time" type="time" required />
      <button type="submit">Guardar</button>
    </form>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['doctors', 'patients'],
    data() {
      return {
        appointment: { doctorId: '', patientId: '', date: '', time: '' },
      };
    },
    methods: {
      handleSubmit() {
        const appointment = {
          ...this.appointment,
          doctorName: this.doctors.find(d => d.id === this.appointment.doctorId).name,
          patientName: this.patients.find(p => p.id === this.appointment.patientId).name,
        };
        axios.post('http://localhost:3000/appointments', appointment)
          .then(() => {
            this.$emit('addAppointment');
            this.appointment = { doctorId: '', patientId: '', date: '', time: '' };
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
        <h2>{{ appointment.id ? 'Editar Cita Médica' : 'Agregar Cita Médica' }}</h2>
        <form @submit.prevent="handleSubmit" class="appointment-form">
          <div class="form-group">
            <label for="doctor">Doctor: &nbsp;</label>
            <select v-model="appointment.doctorId" required :disabled="appointment.id">
              <option disabled value="">Seleccione un doctor</option>
              <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
                {{ doctor.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="patient">Paciente: &nbsp;</label>
            <select v-model="appointment.patientId" required :disabled="appointment.id">
              <option disabled value="">Seleccione un paciente</option>
              <option v-for="patient in patients" :key="patient.id" :value="patient.id">
                {{ patient.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="date">Fecha: &nbsp;</label>
            <input type="date" v-model="appointment.date" required />
          </div>
          <div class="form-group">
            <label for="time">Hora: &nbsp;</label>
            <input type="time" v-model="appointment.time" required />
          </div>
          <button type="submit">{{ appointment.id ? 'Actualizar' : 'Guardar' }}</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['doctors', 'patients', 'appointmentToEdit'],
    data() {
      return {
        appointment: { doctorId: '', patientId: '', date: '', time: '', id: null },
      };
    },
    watch: {
      appointmentToEdit(newAppointment) {
        if (newAppointment) {
          this.appointment = { ...newAppointment };
        } else {
          this.resetForm();
        }
      },
    },
    methods: {
      handleSubmit() {
        const updatedAppointment = {
          ...this.appointment,
          doctorName: this.doctors.find(d => d.id === this.appointment.doctorId)?.name,
          patientName: this.patients.find(p => p.id === this.appointment.patientId)?.name,
        };
        if (this.appointment.id) {
          // Solo actualizamos la fecha y la hora
          updatedAppointment.date = this.appointment.date;
          updatedAppointment.time = this.appointment.time;
          axios.put(`http://localhost:3000/appointments/${this.appointment.id}`, updatedAppointment)
            .then(() => {
              this.$emit('addAppointment');
              this.resetForm();
            })
            .catch(error => console.error(error));
        } else {
          // Crear nueva cita
          axios.post('http://localhost:3000/appointments', updatedAppointment)
            .then(() => {
              this.$emit('addAppointment');
              this.resetForm();
            })
            .catch(error => console.error(error));
        }
      },
      resetForm() {
        this.appointment = { doctorId: '', patientId: '', date: '', time: '', id: null };
      },
    },
  };
  </script>
  
  <style scoped>
  .appointment-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .form-group label {
    font-size: 14px;
    font-weight: bold;
    color: #555;
  }
  
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
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  select, input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
<!---
<template>
    <form @submit.prevent="handleSubmit">
      <select v-model="consultation.doctorId" required>
        <option disabled value="">Seleccione un doctor</option>
        <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
          {{ doctor.name }}
        </option>
      </select>
      <select v-model="consultation.patientId" required>
        <option disabled value="">Seleccione un paciente</option>
        <option v-for="patient in patients" :key="patient.id" :value="patient.id">
          {{ patient.name }}
        </option>
      </select>
      <input v-model="consultation.diagnosis" placeholder="Diagnóstico" required />
      <input v-model="consultation.treatment" placeholder="Tratamiento" required />
      <button type="submit">Guardar</button>
    </form>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['doctors', 'patients'],
    data() {
      return {
        consultation: { doctorId: '', patientId: '', diagnosis: '', treatment: '' },
      };
    },
    methods: {
      handleSubmit() {
        const consultation = {
          ...this.consultation,
          doctorName: this.doctors.find(d => d.id === this.consultation.doctorId).name,
          patientName: this.patients.find(p => p.id === this.consultation.patientId).name,
        };
        axios.post('http://localhost:3000/consultations', consultation)
          .then(() => {
            this.$emit('addConsultation');
            this.consultation = { doctorId: '', patientId: '', diagnosis: '', treatment: '' };
          })
          .catch(error => console.error(error));
      },
    },
  };
  </script>
  -->
  <!---<template>
    <form @submit.prevent="handleSubmit" class="consultation-form">
      <div class="form-group">
        <label for="doctor">Doctor:</label>
        <select v-model="consultation.doctorId" @change="filterPatients" required>
          <option disabled value="">Seleccione un doctor</option>
          <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
            {{ doctor.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="patient">Paciente:</label>
        <select v-model="consultation.patientId" required>
          <option disabled value="">Seleccione un paciente</option>
          <option v-for="patient in filteredPatients" :key="patient.id" :value="patient.id">
            {{ patient.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="diagnosis">Diagnóstico:</label>
        <input v-model="consultation.diagnosis" placeholder="Diagnóstico" required />
      </div>
      <div class="form-group">
        <label for="treatment">Tratamiento:</label>
        <input v-model="consultation.treatment" placeholder="Tratamiento" required />
      </div>
      <button type="submit">{{ consultation.id ? 'Actualizar' : 'Guardar' }}</button>
    </form>
  </template>
  
  <script>
  export default {
    props: ['doctors', 'patients'],
    data() {
      return {
        consultation: { doctorId: '', patientId: '', diagnosis: '', treatment: '' },
        filteredPatients: [],
      };
    },
    methods: {
      filterPatients() {
        if (this.consultation.doctorId) {
          this.filteredPatients = this.patients.filter(patient => {
            // Asegurarse de que el paciente tenga appointments antes de filtrar
            return (
              patient.appointments &&
              patient.appointments.some(appointment => appointment.doctorId === this.consultation.doctorId)
            );
          });
        } else {
          this.filteredPatients = [];
        }
      },
      handleSubmit() {
        const consultationData = {
          ...this.consultation,
          doctorName: this.doctors.find(d => d.id === this.consultation.doctorId)?.name || '',
          patientName: this.patients.find(p => p.id === this.consultation.patientId)?.name || '',
        };
  
        if (this.consultation.id) {
          this.$emit('updateConsultation', consultationData);
        } else {
          this.$emit('addConsultation', consultationData);
        }
  
        this.resetForm();
      },
      resetForm() {
        this.consultation = { doctorId: '', patientId: '', diagnosis: '', treatment: '' };
        this.filteredPatients = [];
      },
    },
    watch: {
      'consultation.doctorId': 'filterPatients',
    },
  };
  </script>
  
  <style scoped>
  .consultation-form {
    margin: 20px 0;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input, select, button {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style> -->
<!----  <template>
    <form @submit.prevent="submitForm" class="consultation-form">
      <div class="form-group">
        <label for="doctor">Doctor:</label>
        <select v-model="newConsultation.doctorId" @change="filterPatients" required>
          <option disabled value="">Seleccione un doctor</option>
          <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
            {{ doctor.name }}
          </option>
        </select>
      </div>
  
      <div class="form-group">
        <label for="patient">Paciente:</label>
        <select v-model="newConsultation.patientId" required>
          <option disabled value="">Seleccione un paciente</option>
          <option v-for="patient in filteredPatients" :key="patient.id" :value="patient.id">
            {{ patient.name }}
          </option>
        </select>
      </div>
  
      <div class="form-group">
        <label for="diagnosis">Diagnóstico:</label>
        <input v-model="newConsultation.diagnosis" type="text" required />
      </div>
  
      <div class="form-group">
        <label for="treatment">Tratamiento:</label>
        <input v-model="newConsultation.treatment" type="text" required />
      </div>
  
      <div class="form-group">
        <label for="date">Fecha:</label>
        <input v-model="newConsultation.date" type="date" required />
      </div>
  
      <div class="form-group">
        <label for="time">Hora:</label>
        <input v-model="newConsultation.time" type="time" required />
      </div>
  
      <button type="submit">{{ consultationToEdit ? "Actualizar" : "Guardar" }}</button>
    </form>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    props: ["doctors", "patients", "consultationToEdit"],
    data() {
      return {
        newConsultation: {
          doctorId: "",
          patientId: "",
          diagnosis: "",
          treatment: "",
          date: "",
          time: "",
        },
        filteredPatients: [],
      };
    },
    watch: {
      // Watch the consultation to edit and populate the form
      consultationToEdit(newVal) {
        if (newVal) {
          this.newConsultation = { ...newVal }; // Copy the consultation to edit
        }
      },
    },
    methods: {
      submitForm() {
        if (this.consultationToEdit) {
          // If editing, update the consultation
          axios
            .put(`http://localhost:3000/consultations/${this.consultationToEdit.id}`, this.newConsultation)
            .then(() => {
              this.$emit("fetchConsultations");
              this.resetForm();
            })
            .catch((error) => console.error(error));
        } else {
          // If creating a new consultation, add it
          axios
            .post("http://localhost:3000/consultations", this.newConsultation)
            .then(() => {
              this.$emit("fetchConsultations");
              this.resetForm();
            })
            .catch((error) => console.error(error));
        }
      },
      filterPatients() {
        this.filteredPatients = this.patients.filter(
          (patient) => patient.doctorId === this.newConsultation.doctorId
        );
      },
      resetForm() {
        this.newConsultation = {
          doctorId: "",
          patientId: "",
          diagnosis: "",
          treatment: "",
          date: "",
          time: "",
        };
        this.filteredPatients = [];
        this.$emit("editConsultation", null); // Reset the consultationToEdit in the parent
      },
    },
  };
  </script>
  
  <style scoped>
  .consultation-form {
    margin-top: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  input,
  select,
  button {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style> -->
  <template>
    <div class="page-container">
    <form @submit.prevent="submitForm" class="consultation-form">
      <h2>{{ consultationToEdit ? "Editar Hoja de Control" : "Nueva Hoja de Control" }}</h2>
      
      <div class="form-group">
        <label for="doctor">Doctor:</label>
        <select v-model="newConsultation.doctorId" required>
          <option disabled value="">Seleccione un doctor</option>
          <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
            {{ doctor.name }}
          </option>
        </select>
      </div>
  
      <div class="form-group">
        <label for="patient">Paciente:</label>
        <select v-model="newConsultation.patientId" required>
          <option disabled value="">Seleccione un paciente</option>
          <option v-for="patient in patients" :key="patient.id" :value="patient.id">
            {{ patient.name }}
          </option>
        </select>
      </div>
  
      <div v-if="patients.length === 0" class="info-message">No hay pacientes disponibles.</div>
  
      <div class="form-group">
        <label for="diagnosis">Diagnóstico:</label>
        <textarea v-model="newConsultation.diagnosis" required placeholder="Ingrese el diagnóstico" rows="4" ></textarea>
      </div>

      <div class="form-group">
        <label for="treatment">Tratamiento:</label>
        <textarea v-model="newConsultation.treatment" required placeholder="Ingrese el tratamiento" rows="4"></textarea>
      </div>
  
      <div class="form-group">
        <label for="date">Fecha:</label>
        <input v-model="newConsultation.date" type="date" required />
      </div>
  
      <div class="form-group">
        <label for="time">Hora:</label>
        <input v-model="newConsultation.time" type="time" required />
      </div>
  
      <button type="submit">
        {{ buttonText }}
      </button>
    </form>
  </div>
  </template>
  <script>
  import axios from "axios";
  
  export default {
    props: ["doctors", "patients", "consultationToEdit"],
    data() {
      return {
        newConsultation: {
          doctorId: "",
          patientId: "",
          diagnosis: "",
          treatment: "",
          date: "",
          time: "",
        },
      };
    },
    watch: {
      consultationToEdit(newVal) {
        if (newVal) {
          // Cargar los datos de la consulta a `newConsultation` cuando estamos editando
          this.newConsultation = { ...newVal }; 
        } else {
          // Si no estamos editamos, restablecemos el formulario para un nuevo registro
          this.resetForm(); 
        }
      },
    },
    methods: {
      submitForm() {
        if (this.newConsultation.id) {
          // Si hay un `id`, estamos actualizando una consulta
          axios
            .put(`http://localhost:3000/consultations/${this.newConsultation.id}`, this.newConsultation)
            .then(() => {
              this.$emit("fetchConsultations"); // Recargamos las consultas
              this.resetForm(); // Limpiamos el formulario
            })
            .catch((error) => console.error(error));
        } else {
          // Si no hay `id`, estamos creando una nueva consulta
          axios
            .post("http://localhost:3000/consultations", this.newConsultation)
            .then(() => {
              this.$emit("fetchConsultations"); // Recargamos las consulta
              this.resetForm(); // Limpiamos el formulario
            })
            .catch((error) => console.error(error));
        }
      },
      resetForm() {
        // Limpiamos los datos para crear una nueva consulta
        this.newConsultation = {
          doctorId: "",
          patientId: "",
          diagnosis: "",
          treatment: "",
          date: "",
          time: "",
        };
      },
    },
    computed: {
      // cambiamos el texto del botón dependiendo si estamos editando o creando un nuevo registro
      buttonText() {
        return this.newConsultation.id ? "Actualizar" : "Guardar";
      },
    },
  };
  </script>
  
  <style scoped>
  .consultation-form {
    font-family: 'Arial', sans-serif;
    max-width: 600px;
    margin: 30px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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

  textarea {
    width: 475px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    transition: border-color 0.3s;
    resize: vertical;
  }

  textarea:focus {
    border-color: #007bff;
    outline: none;
  }
  
  h2 {
    text-align: center;
    color: #007bff;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #555;
  }
  
  input, select {
    width: 475px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    transition: border-color 0.3s;
  }
  
  input:focus, select:focus {
    border-color: #007bff;
    outline: none;
  }
  
  button {
    display: block;
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .info-message {
    color: #999;
    font-size: 14px;
    margin-bottom: 15px;
    text-align: center;
  }
  </style>
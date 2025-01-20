import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Home from '../views/HomeView.vue';
import DoctorList from '../components/Doctor/DoctorList.vue';
import PatientList from '../components/Patient/PatientList.vue';
import AppointmentList from '../components/Appointment/AppointmentList.vue';
import ConsultationList from '../components/Consultation/ConsultationList.vue';


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/doctors', name: 'Doctors', component: DoctorList },
  { path: '/patients', name: 'Patients', component: PatientList },
  { path: '/appointments', name: 'Appointments', component: AppointmentList },
  { path: '/consultations', name: 'Consultations', component: ConsultationList },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

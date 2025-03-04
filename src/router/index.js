import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import HomePage from '../views/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next({ path: '/' });
  } else {
    next();
  }
});

export default router;

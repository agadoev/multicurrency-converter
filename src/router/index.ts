import { createRouter, createWebHistory } from 'vue-router'
import ConvertView from '../views/ConvertView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'currencySelect',
      component: ConvertView
    },
  ]
})

export default router

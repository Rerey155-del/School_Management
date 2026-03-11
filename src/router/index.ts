import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login/index.vue'),
        meta: { title: 'Login' }
    },
    {
        path: '/',
        name : 'dashboard',
        component: () => import('@/pages/dashboard/index.vue'),
        meta: { requiresAuth: true, title: 'Dashboard' }
    },
    {
        path: '/settings',
        name : 'settings',
        component: () => import('@/pages/settings/index.vue'),
        meta: { requiresAuth: true, title: 'Settings' }
    },
    {
        path: '/teachers',
        name : 'teachers',
        component: () => import('@/pages/teachers/index.vue'),
        meta: { requiresAuth: true, title: 'Teachers List' }
    },
    {
        path: '/teachers/add',
        name : 'teachers-add',
        component: () => import('@/pages/teachers/add.vue'),
        meta: { requiresAuth: true, title: 'Add Teacher' }
    },
    {
        path: '/teachers/edit/:id',
        name : 'teachers-edit',
        component: () => import('@/pages/teachers/edit.vue'),
        meta: { requiresAuth: true, title: 'Edit Teacher' }
    },
    {
        path: '/students',
        name : 'students',
        component: () => import('@/pages/students/index.vue'),
        meta: { requiresAuth: true, title: 'Students List' }
    },
    {
        path: '/students/add',
        name : 'students-add',
        component: () => import('@/pages/students/add.vue'),
        meta: { requiresAuth: true, title: 'Add Student' }
    },
    {
        path: '/students/edit/:id',
        name : 'students-edit',
        component: () => import('@/pages/students/edit.vue'),
        meta: { requiresAuth: true, title: 'Edit Student' }
    },
    {
        path: '/subjects',
        name : 'subjects',
        component: () => import('@/pages/subjects/index.vue'),
        meta: { requiresAuth: true, title: 'Subjects List' }
    },
    {
        path: '/subjects/add',
        name : 'subjects-add',
        component: () => import('@/pages/subjects/add.vue'),
        meta: { requiresAuth: true, title: 'Add Subject' }
    },
    {
        path: '/subjects/edit/:id',
        name : 'subjects-edit',
        component: () => import('@/pages/subjects/edit.vue'),
        meta: { requiresAuth: true, title: 'Edit Subject' }
    },
    {
        path: '/classes',
        name : 'classes',
        component: () => import('@/pages/classes/index.vue'),
        meta: { requiresAuth: true, title: 'Classes List' }
    },
    {
        path: '/classes/add',
        name : 'classes-add',
        component: () => import('@/pages/classes/add.vue'),
        meta: { requiresAuth: true, title: 'Add Class' }
    },
    {
        path: '/classes/edit/:id',
        name : 'classes-edit',
        component: () => import('@/pages/classes/edit.vue'),
        meta: { requiresAuth: true, title: 'Edit Class' }
    },
    {
        path: '/schedules',
        name : 'schedules',
        component: () => import('@/pages/schedules/index.vue'),
        meta: { requiresAuth: true, title: 'Schedules List' }
    },
    {
        path: '/schedules/add',
        name : 'schedules-add',
        component: () => import('@/pages/schedules/add.vue'),
        meta: { requiresAuth: true, title: 'Add Schedule' }
    },
    {
        path: '/schedules/edit/:id',
        name : 'schedules-edit',
        component: () => import('@/pages/schedules/edit.vue'),
        meta: { requiresAuth: true, title: 'Edit Schedule' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth()
  
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated.value) {
    next('/')
  } else {
    next()
  }
})

router.afterEach((to) => {
  const defaultTitle = 'Management Sekolah V3';
  document.title = to.meta.title ? `${to.meta.title} | ${defaultTitle}` : defaultTitle;
});

export default router

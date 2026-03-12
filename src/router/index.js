"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_router_1 = require("vue-router");
var useAuth_1 = require("@/composables/useAuth");
var routes = [
    {
        path: '/login',
        name: 'login',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/login/index.vue'); }); },
        meta: { title: 'Login' }
    },
    {
        path: '/',
        name: 'dashboard',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/dashboard/index.vue'); }); },
        meta: { requiresAuth: true, title: 'Dashboard' }
    },
    {
        path: '/settings',
        name: 'settings',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/settings/index.vue'); }); },
        meta: { requiresAuth: true, title: 'Settings' }
    },
    {
        path: '/teachers',
        name: 'teachers',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/teachers/index.vue'); }); },
        meta: { requiresAuth: true, title: 'Teachers List' }
    },
    {
        path: '/teachers/add',
        name: 'teachers-add',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/teachers/add.vue'); }); },
        meta: { requiresAuth: true, title: 'Add Teacher' }
    },
    {
        path: '/teachers/edit/:id',
        name: 'teachers-edit',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/teachers/edit.vue'); }); },
        meta: { requiresAuth: true, title: 'Edit Teacher' }
    },
    {
        path: '/students',
        name: 'students',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/students/index.vue'); }); },
        meta: { requiresAuth: true, title: 'Students List' }
    },
    {
        path: '/students/add',
        name: 'students-add',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/students/add.vue'); }); },
        meta: { requiresAuth: true, title: 'Add Student' }
    },
    {
        path: '/students/edit/:id',
        name: 'students-edit',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/students/edit.vue'); }); },
        meta: { requiresAuth: true, title: 'Edit Student' }
    },
    {
        path: '/subjects',
        name: 'subjects',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/subjects/index.vue'); }); },
        meta: { requiresAuth: true, title: 'Subjects List' }
    },
    {
        path: '/subjects/add',
        name: 'subjects-add',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/subjects/add.vue'); }); },
        meta: { requiresAuth: true, title: 'Add Subject' }
    },
    {
        path: '/subjects/edit/:id',
        name: 'subjects-edit',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/subjects/edit.vue'); }); },
        meta: { requiresAuth: true, title: 'Edit Subject' }
    },
    {
        path: '/classes',
        name: 'classes',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/classes/index.vue'); }); },
        meta: { requiresAuth: true, title: 'Classes List' }
    },
    {
        path: '/classes/add',
        name: 'classes-add',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/classes/add.vue'); }); },
        meta: { requiresAuth: true, title: 'Add Class' }
    },
    {
        path: '/classes/edit/:id',
        name: 'classes-edit',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/classes/edit.vue'); }); },
        meta: { requiresAuth: true, title: 'Edit Class' }
    },
    {
        path: '/schedules',
        name: 'schedules',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/schedules/index.vue'); }); },
        meta: { requiresAuth: true, title: 'Schedules List' }
    },
    {
        path: '/schedules/add',
        name: 'schedules-add',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/schedules/add.vue'); }); },
        meta: { requiresAuth: true, title: 'Add Schedule' }
    },
    {
        path: '/schedules/edit/:id',
        name: 'schedules-edit',
        component: function () { return Promise.resolve().then(function () { return require('@/pages/schedules/edit.vue'); }); },
        meta: { requiresAuth: true, title: 'Edit Schedule' }
    }
];
var router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHistory)(),
    routes: routes
});
router.beforeEach(function (to, from, next) {
    var isAuthenticated = (0, useAuth_1.useAuth)().isAuthenticated;
    if (to.meta.requiresAuth && !isAuthenticated.value) {
        next('/login');
    }
    else if (to.path === '/login' && isAuthenticated.value) {
        next('/');
    }
    else {
        next();
    }
});
router.afterEach(function (to) {
    var defaultTitle = 'Management Sekolah V3';
    document.title = to.meta.title ? "".concat(to.meta.title, " | ").concat(defaultTitle) : defaultTitle;
});
exports.default = router;

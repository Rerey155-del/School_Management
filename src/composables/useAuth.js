"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = useAuth;
var vue_1 = require("vue");
var useAuthStore_1 = require("@/stores/useAuthStore");
function useAuth() {
    var store = (0, useAuthStore_1.useAuthStore)();
    return {
        user: (0, vue_1.computed)(function () { return store.user; }),
        isAuthenticated: (0, vue_1.computed)(function () { return store.isAuthenticated; }),
        login: store.login,
        logout: store.logout,
        loading: (0, vue_1.computed)(function () { return store.loading; }),
        error: (0, vue_1.computed)(function () { return store.error; })
    };
}

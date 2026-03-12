"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("@iconify/vue");
var useAuth_1 = require("@/composables/useAuth");
var vue_router_1 = require("vue-router");
var logout = (0, useAuth_1.useAuth)().logout;
var router = (0, vue_router_1.useRouter)();
var route = (0, vue_router_1.useRoute)();
var i18n = {
    brand: "Management Sekolah",
    version: "V3",
    logout: "Logout",
    menus: {
        main: "Main Menu",
        academic: "Academic Center",
        system: "System & Preferences",
    },
    items: {
        dashboard: "Dashboard",
        teachers: "Teachers",
        students: "Students",
        subjects: "Subjects",
        classes: "Classes",
        schedules: "Schedules",
        settings: "Settings",
    },
};
var menuItems = [
    { name: i18n.items.dashboard, path: "/", icon: "lucide:layout-dashboard" },
    { name: i18n.items.teachers, path: "/teachers", icon: "lucide:users" },
    {
        name: i18n.items.students,
        path: "/students",
        icon: "lucide:graduation-cap",
    },
    { name: i18n.items.subjects, path: "/subjects", icon: "lucide:book-open" },
    { name: i18n.items.classes, path: "/classes", icon: "lucide:school" },
    { name: i18n.items.schedules, path: "/schedules", icon: "lucide:calendar" },
];
var isActive = function (path) {
    if (path === "/")
        return route.path === "/";
    return route.path.startsWith(path);
};
var handleLogout = function () {
    logout();
    router.push("/login");
};
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_intrinsics;
var __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "drawer-side z-50" }));
/** @type {__VLS_StyleScopedClasses['drawer-side']} */ ;
/** @type {__VLS_StyleScopedClasses['z-50']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)(__assign({ for: "my-drawer-2", 'aria-label': "close sidebar" }, { class: "drawer-overlay" }));
/** @type {__VLS_StyleScopedClasses['drawer-overlay']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)(__assign({ class: "menu p-4 w-72 min-h-full bg-base-100 text-base-content gap-2 border-r border-base-200" }));
/** @type {__VLS_StyleScopedClasses['menu']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-72']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-base-100']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base-content']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border-r']} */ ;
/** @type {__VLS_StyleScopedClasses['border-base-200']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)(__assign({ class: "mb-6 px-4 py-2" }));
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "text-2xl font-black tracking-tight" }));
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-black']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-tight']} */ ;
(__VLS_ctx.i18n.brand);
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "text-primary" }));
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
(__VLS_ctx.i18n.version);
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)(__assign({ class: "menu-title uppercase text-xs font-bold tracking-widest text-base-content/40 mt-2" }));
/** @type {__VLS_StyleScopedClasses['menu-title']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-widest']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base-content/40']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
(__VLS_ctx.i18n.menus.main);
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
var __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
routerLink;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0(__assign(__assign({ to: "/" }, { class: "flex items-center gap-3 py-3" }), { class: ({
        'active bg-primary/10 text-primary font-bold': __VLS_ctx.isActive('/'),
    }) })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign(__assign({ to: "/" }, { class: "flex items-center gap-3 py-3" }), { class: ({
            'active bg-primary/10 text-primary font-bold': __VLS_ctx.isActive('/'),
        }) })], __VLS_functionalComponentArgsRest(__VLS_1), false));
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary/10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
var __VLS_5 = __VLS_3.slots.default;
var __VLS_6;
/** @ts-ignore @type {typeof __VLS_components.Icon} */
vue_1.Icon;
// @ts-ignore
var __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6(__assign({ icon: "lucide:layout-dashboard" }, { class: "w-5 h-5" })));
var __VLS_8 = __VLS_7.apply(void 0, __spreadArray([__assign({ icon: "lucide:layout-dashboard" }, { class: "w-5 h-5" })], __VLS_functionalComponentArgsRest(__VLS_7), false));
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.i18n.items.dashboard);
// @ts-ignore
[i18n, i18n, i18n, i18n, isActive,];
var __VLS_3;
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)(__assign({ class: "menu-title uppercase text-xs font-bold tracking-widest text-base-content/40 mt-6" }));
/** @type {__VLS_StyleScopedClasses['menu-title']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-widest']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base-content/40']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
(__VLS_ctx.i18n.menus.academic);
for (var _i = 0, _a = __VLS_vFor((__VLS_ctx.menuItems.slice(1))); _i < _a.length; _i++) {
    var item = _a[_i][0];
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        key: (item.path),
    });
    var __VLS_11 = void 0;
    /** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
    routerLink;
    // @ts-ignore
    var __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11(__assign(__assign({ to: (item.path) }, { class: "flex items-center gap-3 py-3" }), { class: ({
            'active bg-primary/10 text-primary font-bold': __VLS_ctx.isActive(item.path),
        }) })));
    var __VLS_13 = __VLS_12.apply(void 0, __spreadArray([__assign(__assign({ to: (item.path) }, { class: "flex items-center gap-3 py-3" }), { class: ({
                'active bg-primary/10 text-primary font-bold': __VLS_ctx.isActive(item.path),
            }) })], __VLS_functionalComponentArgsRest(__VLS_12), false));
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['active']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-primary/10']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    var __VLS_16 = __VLS_14.slots.default;
    var __VLS_17 = void 0;
    /** @ts-ignore @type {typeof __VLS_components.Icon} */
    vue_1.Icon;
    // @ts-ignore
    var __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17(__assign({ icon: (item.icon) }, { class: "w-5 h-5" })));
    var __VLS_19 = __VLS_18.apply(void 0, __spreadArray([__assign({ icon: (item.icon) }, { class: "w-5 h-5" })], __VLS_functionalComponentArgsRest(__VLS_18), false));
    /** @type {__VLS_StyleScopedClasses['w-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (item.name);
    // @ts-ignore
    [i18n, isActive, menuItems,];
    var __VLS_14;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)(__assign({ class: "menu-title uppercase text-xs font-bold tracking-widest text-base-content/40 mt-6" }));
/** @type {__VLS_StyleScopedClasses['menu-title']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-widest']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base-content/40']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
(__VLS_ctx.i18n.menus.system);
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
var __VLS_22;
/** @ts-ignore @type {typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink | typeof __VLS_components.routerLink | typeof __VLS_components.RouterLink} */
routerLink;
// @ts-ignore
var __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22(__assign(__assign({ to: "/settings" }, { class: "flex items-center gap-3 py-3" }), { class: ({
        'active bg-primary/10 text-primary font-bold': __VLS_ctx.isActive('/settings'),
    }) })));
var __VLS_24 = __VLS_23.apply(void 0, __spreadArray([__assign(__assign({ to: "/settings" }, { class: "flex items-center gap-3 py-3" }), { class: ({
            'active bg-primary/10 text-primary font-bold': __VLS_ctx.isActive('/settings'),
        }) })], __VLS_functionalComponentArgsRest(__VLS_23), false));
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary/10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
var __VLS_27 = __VLS_25.slots.default;
var __VLS_28;
/** @ts-ignore @type {typeof __VLS_components.Icon} */
vue_1.Icon;
// @ts-ignore
var __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28(__assign({ icon: "lucide:settings" }, { class: "w-5 h-5" })));
var __VLS_30 = __VLS_29.apply(void 0, __spreadArray([__assign({ icon: "lucide:settings" }, { class: "w-5 h-5" })], __VLS_functionalComponentArgsRest(__VLS_29), false));
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.i18n.items.settings);
// @ts-ignore
[i18n, i18n, isActive,];
var __VLS_25;
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)(__assign({ class: "mt-auto pt-6 border-t border-base-200" }));
/** @type {__VLS_StyleScopedClasses['mt-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['border-base-200']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: (__VLS_ctx.handleLogout) }, { class: "btn btn-ghost text-error flex items-center justify-start gap-3 py-3 hover:bg-error/10 w-full px-4 rounded-xl" }));
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-ghost']} */ ;
/** @type {__VLS_StyleScopedClasses['text-error']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
/** @type {__VLS_StyleScopedClasses['py-3']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-error/10']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
var __VLS_33;
/** @ts-ignore @type {typeof __VLS_components.Icon} */
vue_1.Icon;
// @ts-ignore
var __VLS_34 = __VLS_asFunctionalComponent1(__VLS_33, new __VLS_33(__assign({ icon: "lucide:log-out" }, { class: "w-5 h-5" })));
var __VLS_35 = __VLS_34.apply(void 0, __spreadArray([__assign({ icon: "lucide:log-out" }, { class: "w-5 h-5" })], __VLS_functionalComponentArgsRest(__VLS_34), false));
/** @type {__VLS_StyleScopedClasses['w-5']} */ ;
/** @type {__VLS_StyleScopedClasses['h-5']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.i18n.logout);
// @ts-ignore
[i18n, handleLogout,];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};

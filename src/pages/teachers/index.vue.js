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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var Sidebar_vue_1 = require("@/components/Sidebar.vue");
var vue_1 = require("@iconify/vue");
var useTeacherStore_1 = require("@/stores/useTeacherStore");
var vue_2 = require("vue");
var vue_router_1 = require("vue-router");
var store = (0, useTeacherStore_1.useTeacherStore)();
var router = (0, vue_router_1.useRouter)();
(0, vue_2.onMounted)(function () {
    store.fetchList();
});
var openAddForm = function () {
    router.push('/teachers/add');
};
var openEditForm = function (id) {
    router.push("/teachers/edit/".concat(id));
};
var isStatusActive = function (status) {
    if (!status)
        return false;
    return status.toLowerCase() === 'active' || status.toLowerCase() === 'aktif';
};
var handleStatusToggle = function (id, currentStatus) { return __awaiter(void 0, void 0, void 0, function () {
    var newStatus, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newStatus = isStatusActive(currentStatus) ? 'Non-Active' : 'Active';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.toggleItemStatus(id, 'status', newStatus)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                alert('Failed to toggle status: ' + (err_1.message || ''));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var i18n = {
    brand: "SCHOOL",
    version: "V3",
    header: {
        title: "Faculty Directory",
        subtitle: "Professional profiles of administrative and teaching staff."
    },
    actions: {
        search: "Search by name...",
        add: "Add New Teacher"
    },
    table: {
        identity: "Teacher Identity",
        idNumber: "NIP / NIK",
        email: "Institutional Email",
        department: "Department",
        status: "Status",
        actions: "Actions",
        noResults: "No results found for"
    },
    pagination: {
        showing: "Showing",
        of: "of",
        staff: "Staff",
        page: "Page"
    }
};
// Search and Pagination Logic
var searchQuery = (0, vue_2.ref)("");
var currentPage = (0, vue_2.ref)(1);
var itemsPerPage = 10;
var filteredTeachers = (0, vue_2.computed)(function () {
    return store.items.filter(function (t) {
        return t.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
});
var totalPages = (0, vue_2.computed)(function () {
    return Math.ceil(filteredTeachers.value.length / itemsPerPage);
});
var paginatedTeachers = (0, vue_2.computed)(function () {
    var start = (currentPage.value - 1) * itemsPerPage;
    var end = start + itemsPerPage;
    return filteredTeachers.value.slice(start, end);
});
var nextPage = function () {
    if (currentPage.value < totalPages.value)
        currentPage.value++;
};
var prevPage = function () {
    if (currentPage.value > 1)
        currentPage.value--;
};
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_intrinsics;
var __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "drawer lg:drawer-open bg-base-200 min-h-screen font-sans" }));
/** @type {__VLS_StyleScopedClasses['drawer']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:drawer-open']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-base-200']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['font-sans']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)(__assign({ id: "my-drawer-2", type: "checkbox" }, { class: "drawer-toggle" }));
/** @type {__VLS_StyleScopedClasses['drawer-toggle']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "drawer-content flex flex-col p-6 lg:p-10" }));
/** @type {__VLS_StyleScopedClasses['drawer-content']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:p-10']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "flex items-center justify-between lg:hidden mb-6 bg-base-100 p-4 rounded-2xl shadow-sm" }));
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-base-100']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)(__assign({ for: "my-drawer-2" }, { class: "btn btn-ghost btn-circle drawer-button" }));
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-ghost']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-circle']} */ ;
/** @type {__VLS_StyleScopedClasses['drawer-button']} */ ;
var __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.Icon} */
vue_1.Icon;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0(__assign({ icon: "lucide:menu" }, { class: "text-xl" })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ icon: "lucide:menu" }, { class: "text-xl" })], __VLS_functionalComponentArgsRest(__VLS_1), false));
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "text-xl font-bold tracking-tight" }));
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-tight']} */ ;
(__VLS_ctx.i18n.brand);
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "text-primary" }));
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
(__VLS_ctx.i18n.version);
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)(__assign({ class: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10" }, { 'data-aos': "fade-down" }));
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['md:items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-10']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)(__assign({ class: "text-4xl font-extrabold tracking-tight text-base-content mb-2" }));
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-tight']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base-content']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
(__VLS_ctx.i18n.header.title);
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "text-base-content/40 font-medium" }));
/** @type {__VLS_StyleScopedClasses['text-base-content/40']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
(__VLS_ctx.i18n.header.subtitle);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "flex items-center gap-3" }));
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "relative group" }));
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['group']} */ ;
var __VLS_5;
/** @ts-ignore @type {typeof __VLS_components.Icon} */
vue_1.Icon;
// @ts-ignore
var __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5(__assign({ icon: "lucide:search" }, { class: "absolute left-4 top-1/2 -translate-y-1/2 text-base-content/20 group-focus-within:text-primary transition-colors" })));
var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([__assign({ icon: "lucide:search" }, { class: "absolute left-4 top-1/2 -translate-y-1/2 text-base-content/20 group-focus-within:text-primary transition-colors" })], __VLS_functionalComponentArgsRest(__VLS_6), false));
/** @type {__VLS_StyleScopedClasses['absolute']} */ ;
/** @type {__VLS_StyleScopedClasses['left-4']} */ ;
/** @type {__VLS_StyleScopedClasses['top-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['-translate-y-1/2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base-content/20']} */ ;
/** @type {__VLS_StyleScopedClasses['group-focus-within:text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)(__assign(__assign({ onInput: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.currentPage = 1;
        // @ts-ignore
        [i18n, i18n, i18n, i18n, currentPage,];
    } }, { value: (__VLS_ctx.searchQuery), type: "text", placeholder: (__VLS_ctx.i18n.actions.search) }), { class: "input bg-base-100 border-base-content/5 rounded-xl pl-12 w-64 focus:border-primary/50 text-base-content font-medium" }));
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-base-100']} */ ;
/** @type {__VLS_StyleScopedClasses['border-base-content/5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['pl-12']} */ ;
/** @type {__VLS_StyleScopedClasses['w-64']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:border-primary/50']} */ ;
/** @type {__VLS_StyleScopedClasses['text-base-content']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: (__VLS_ctx.openAddForm) }, { class: "btn btn-primary rounded-xl px-6 font-bold gap-2 shadow-lg shadow-primary/20 capitalize" }));
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-primary/20']} */ ;
/** @type {__VLS_StyleScopedClasses['capitalize']} */ ;
var __VLS_10;
/** @ts-ignore @type {typeof __VLS_components.Icon} */
vue_1.Icon;
// @ts-ignore
var __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10(__assign({ icon: "lucide:user-plus" }, { class: "text-sm" })));
var __VLS_12 = __VLS_11.apply(void 0, __spreadArray([__assign({ icon: "lucide:user-plus" }, { class: "text-sm" })], __VLS_functionalComponentArgsRest(__VLS_11), false));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
(__VLS_ctx.i18n.actions.add);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "bg-base-100 backdrop-blur-xl shadow-2xl border border-base-content/5 rounded-[2.5rem] overflow-hidden flex flex-col" }, { 'data-aos': "fade-right", 'data-aos-delay': "200" }));
/** @type {__VLS_StyleScopedClasses['bg-base-100']} */ ;
/** @type {__VLS_StyleScopedClasses['backdrop-blur-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-base-content/5']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[2.5rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
if (__VLS_ctx.store.loadingList) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "p-10 flex justify-center" }));
    /** @type {__VLS_StyleScopedClasses['p-10']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "loading loading-spinner text-primary loading-lg" }));
    /** @type {__VLS_StyleScopedClasses['loading']} */ ;
    /** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['loading-lg']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "overflow-x-auto" }));
    /** @type {__VLS_StyleScopedClasses['overflow-x-auto']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.table, __VLS_intrinsics.table)(__assign({ class: "table table-lg w-full" }));
    /** @type {__VLS_StyleScopedClasses['table']} */ ;
    /** @type {__VLS_StyleScopedClasses['table-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.thead, __VLS_intrinsics.thead)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.tr, __VLS_intrinsics.tr)(__assign({ class: "text-base-content/30 font-bold uppercase tracking-widest text-[10px] border-b border-base-content/5" }));
    /** @type {__VLS_StyleScopedClasses['text-base-content/30']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    /** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
    /** @type {__VLS_StyleScopedClasses['tracking-widest']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-[10px]']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-base-content/5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)(__assign({ class: "pl-12 py-8" }));
    /** @type {__VLS_StyleScopedClasses['pl-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-8']} */ ;
    (__VLS_ctx.i18n.table.identity);
    __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)(__assign({ class: "py-8" }));
    /** @type {__VLS_StyleScopedClasses['py-8']} */ ;
    (__VLS_ctx.i18n.table.idNumber);
    __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)(__assign({ class: "py-8" }));
    /** @type {__VLS_StyleScopedClasses['py-8']} */ ;
    (__VLS_ctx.i18n.table.email);
    __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)(__assign({ class: "py-8 text-center" }));
    /** @type {__VLS_StyleScopedClasses['py-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    (__VLS_ctx.i18n.table.department);
    __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)(__assign({ class: "py-8 text-center" }));
    /** @type {__VLS_StyleScopedClasses['py-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
    (__VLS_ctx.i18n.table.status);
    __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)(__assign({ class: "pr-12 py-8 text-right" }));
    /** @type {__VLS_StyleScopedClasses['pr-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['py-8']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
    (__VLS_ctx.i18n.table.actions);
    __VLS_asFunctionalElement1(__VLS_intrinsics.tbody, __VLS_intrinsics.tbody)({});
    var _loop_1 = function (teacher) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.tr, __VLS_intrinsics.tr)(__assign({ key: (teacher.id) }, { class: "border-b border-base-content/5 last:border-0 hover:bg-base-content/[0.02] transition-colors" }));
        /** @type {__VLS_StyleScopedClasses['border-b']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-base-content/5']} */ ;
        /** @type {__VLS_StyleScopedClasses['last:border-0']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:bg-base-content/[0.02]']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)(__assign({ class: "pl-12 py-10" }));
        /** @type {__VLS_StyleScopedClasses['pl-12']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-10']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "flex items-center gap-4" }));
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "avatar placeholder" }));
        /** @type {__VLS_StyleScopedClasses['avatar']} */ ;
        /** @type {__VLS_StyleScopedClasses['placeholder']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "bg-primary/10 text-primary font-black rounded-xl w-10 shadow-sm border border-primary/20 uppercase" }));
        /** @type {__VLS_StyleScopedClasses['bg-primary/10']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-black']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
        /** @type {__VLS_StyleScopedClasses['w-10']} */ ;
        /** @type {__VLS_StyleScopedClasses['shadow-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-primary/20']} */ ;
        /** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (teacher.name[0]);
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "font-bold text-lg text-base-content/90" }));
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-base-content/90']} */ ;
        (teacher.name);
        __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)(__assign({ class: "py-10 font-bold text-lg text-base-content/40 font-mono tracking-tighter" }));
        /** @type {__VLS_StyleScopedClasses['py-10']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-base-content/40']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
        /** @type {__VLS_StyleScopedClasses['tracking-tighter']} */ ;
        (teacher.nip);
        __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)(__assign({ class: "py-10 font-medium text-lg text-base-content/70" }));
        /** @type {__VLS_StyleScopedClasses['py-10']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-base-content/70']} */ ;
        (teacher.email);
        __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)(__assign({ class: "py-10 text-center" }));
        /** @type {__VLS_StyleScopedClasses['py-10']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "px-5 py-2.5 bg-base-content/5 text-base-content/40 rounded-xl font-bold text-xs border border-base-content/5" }));
        /** @type {__VLS_StyleScopedClasses['px-5']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
        /** @type {__VLS_StyleScopedClasses['bg-base-content/5']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-base-content/40']} */ ;
        /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
        /** @type {__VLS_StyleScopedClasses['border']} */ ;
        /** @type {__VLS_StyleScopedClasses['border-base-content/5']} */ ;
        (teacher.department);
        __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)(__assign({ class: "py-10 text-center" }));
        /** @type {__VLS_StyleScopedClasses['py-10']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: ("badge badge-sm font-black uppercase text-[10px] p-2 h-auto ".concat(teacher.status === 'Active'
                ? 'badge-success shadow-lg shadow-success/20'
                : 'badge-ghost opacity-40')) }));
        (teacher.status);
        __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)(__assign({ class: "pr-12 py-10 text-right" }));
        /** @type {__VLS_StyleScopedClasses['pr-12']} */ ;
        /** @type {__VLS_StyleScopedClasses['py-10']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-right']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "flex justify-end items-center gap-3" }));
        /** @type {__VLS_StyleScopedClasses['flex']} */ ;
        /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
        /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ onClick: (function () { return __VLS_ctx.openEditForm(teacher.id || 0); }) }, { class: "btn btn-ghost btn-sm btn-circle text-base-content opacity-40 hover:opacity-100 transition-opacity" }), { title: "Edit Teacher" }));
        /** @type {__VLS_StyleScopedClasses['btn']} */ ;
        /** @type {__VLS_StyleScopedClasses['btn-ghost']} */ ;
        /** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['btn-circle']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-base-content']} */ ;
        /** @type {__VLS_StyleScopedClasses['opacity-40']} */ ;
        /** @type {__VLS_StyleScopedClasses['hover:opacity-100']} */ ;
        /** @type {__VLS_StyleScopedClasses['transition-opacity']} */ ;
        var __VLS_15 = void 0;
        /** @ts-ignore @type {typeof __VLS_components.Icon} */
        vue_1.Icon;
        // @ts-ignore
        var __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15(__assign({ icon: "lucide:edit-3" }, { class: "w-4 h-4" })));
        var __VLS_17 = __VLS_16.apply(void 0, __spreadArray([__assign({ icon: "lucide:edit-3" }, { class: "w-4 h-4" })], __VLS_functionalComponentArgsRest(__VLS_16), false));
        /** @type {__VLS_StyleScopedClasses['w-4']} */ ;
        /** @type {__VLS_StyleScopedClasses['h-4']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.input)(__assign(__assign(__assign({ onChange: function () {
                var _a = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _a[_i] = arguments[_i];
                }
                var $event = _a[0];
                if (!!(__VLS_ctx.store.loadingList))
                    return;
                __VLS_ctx.handleStatusToggle(teacher.id || 0, teacher.status);
                // @ts-ignore
                [i18n, i18n, i18n, i18n, i18n, i18n, i18n, i18n, searchQuery, openAddForm, store, paginatedTeachers, openEditForm, handleStatusToggle,];
            } }, { type: "checkbox" }), { class: "toggle toggle-sm toggle-success" }), { checked: (__VLS_ctx.isStatusActive(teacher.status)), title: "Toggle Status" }));
        /** @type {__VLS_StyleScopedClasses['toggle']} */ ;
        /** @type {__VLS_StyleScopedClasses['toggle-sm']} */ ;
        /** @type {__VLS_StyleScopedClasses['toggle-success']} */ ;
        // @ts-ignore
        [isStatusActive,];
    };
    for (var _i = 0, _a = __VLS_vFor((__VLS_ctx.paginatedTeachers)); _i < _a.length; _i++) {
        var teacher = _a[_i][0];
        _loop_1(teacher);
    }
    if (__VLS_ctx.paginatedTeachers.length === 0) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)(__assign({ colspan: "6" }, { class: "py-20 text-center text-base-content/20 font-bold italic" }));
        /** @type {__VLS_StyleScopedClasses['py-20']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-center']} */ ;
        /** @type {__VLS_StyleScopedClasses['text-base-content/20']} */ ;
        /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
        /** @type {__VLS_StyleScopedClasses['italic']} */ ;
        (__VLS_ctx.i18n.table.noResults);
        (__VLS_ctx.searchQuery);
    }
}
if (!__VLS_ctx.store.loadingList && __VLS_ctx.store.items.length > 0) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "p-6 border-t border-base-content/5 flex items-center justify-between bg-base-content/5" }));
    /** @type {__VLS_StyleScopedClasses['p-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-t']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-base-content/5']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-base-content/5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "text-base-content/20 text-sm font-bold" }));
    /** @type {__VLS_StyleScopedClasses['text-base-content/20']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    (__VLS_ctx.i18n.pagination.showing);
    (__VLS_ctx.paginatedTeachers.length);
    (__VLS_ctx.i18n.pagination.of);
    (__VLS_ctx.filteredTeachers.length);
    (__VLS_ctx.i18n.pagination.staff);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "join bg-base-200/50 rounded-xl border border-base-content/5" }));
    /** @type {__VLS_StyleScopedClasses['join']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-base-200/50']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-base-content/5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ onClick: (__VLS_ctx.prevPage) }, { disabled: (__VLS_ctx.currentPage === 1) }), { class: "btn btn-ghost join-item btn-sm text-base-content/40 disabled:opacity-10" }));
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-ghost']} */ ;
    /** @type {__VLS_StyleScopedClasses['join-item']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-base-content/40']} */ ;
    /** @type {__VLS_StyleScopedClasses['disabled:opacity-10']} */ ;
    var __VLS_20 = void 0;
    /** @ts-ignore @type {typeof __VLS_components.Icon} */
    vue_1.Icon;
    // @ts-ignore
    var __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
        icon: "lucide:chevron-left",
    }));
    var __VLS_22 = __VLS_21.apply(void 0, __spreadArray([{
            icon: "lucide:chevron-left",
        }], __VLS_functionalComponentArgsRest(__VLS_21), false));
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ class: "btn btn-ghost join-item btn-sm text-primary font-black px-4" }));
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-ghost']} */ ;
    /** @type {__VLS_StyleScopedClasses['join-item']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-black']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-4']} */ ;
    (__VLS_ctx.i18n.pagination.page);
    (__VLS_ctx.currentPage);
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ onClick: (__VLS_ctx.nextPage) }, { disabled: (__VLS_ctx.currentPage >= __VLS_ctx.totalPages) }), { class: "btn btn-ghost join-item btn-sm text-base-content/40 disabled:opacity-10" }));
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-ghost']} */ ;
    /** @type {__VLS_StyleScopedClasses['join-item']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-base-content/40']} */ ;
    /** @type {__VLS_StyleScopedClasses['disabled:opacity-10']} */ ;
    var __VLS_25 = void 0;
    /** @ts-ignore @type {typeof __VLS_components.Icon} */
    vue_1.Icon;
    // @ts-ignore
    var __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
        icon: "lucide:chevron-right",
    }));
    var __VLS_27 = __VLS_26.apply(void 0, __spreadArray([{
            icon: "lucide:chevron-right",
        }], __VLS_functionalComponentArgsRest(__VLS_26), false));
}
var __VLS_30 = Sidebar_vue_1.default;
// @ts-ignore
var __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({}));
var __VLS_32 = __VLS_31.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_31), false));
// @ts-ignore
[i18n, i18n, i18n, i18n, i18n, currentPage, currentPage, currentPage, searchQuery, store, store, paginatedTeachers, paginatedTeachers, filteredTeachers, prevPage, nextPage, totalPages,];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};

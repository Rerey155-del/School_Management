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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var useStudentStore_1 = require("@/stores/useStudentStore");
var vue_2 = require("vue");
var vue_router_1 = require("vue-router");
var classService_1 = require("@/services/classService");
var autocomplete_1 = require("primevue/autocomplete");
var aos_1 = require("aos");
require("aos/dist/aos.css");
var store = (0, useStudentStore_1.useStudentStore)();
var router = (0, vue_router_1.useRouter)();
var route = (0, vue_router_1.useRoute)();
var isSubmitting = (0, vue_2.ref)(false);
var showSkeleton = (0, vue_2.ref)(true);
var form = (0, vue_2.ref)({
    id: "",
    name: "",
    nis: "",
    gender: "Male",
    class_name: "",
});
/* Autocomplete */
var filteredClasses = (0, vue_2.ref)([]);
var searchClass = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = filteredClasses;
                return [4 /*yield*/, classService_1.classService.autocompleteClasses(event.query)];
            case 1:
                _a.value = _b.sent();
                return [2 /*return*/];
        }
    });
}); };
(0, vue_2.onMounted)(function () { return __awaiter(void 0, void 0, void 0, function () {
    var id, fetchPromise, detail;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                aos_1.default.init({
                    duration: 700,
                    easing: "ease-out-cubic",
                    once: true,
                });
                id = route.params.id;
                fetchPromise = store.fetchDetail(id);
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
            case 1:
                _a.sent();
                return [4 /*yield*/, fetchPromise];
            case 2:
                detail = _a.sent();
                showSkeleton.value = false;
                if (!detail) {
                    router.push("/students");
                    return [2 /*return*/];
                }
                form.value = {
                    id: detail.id,
                    name: detail.name,
                    nis: detail.nis,
                    gender: detail.gender,
                    class_name: detail.class_name,
                };
                return [2 /*return*/];
        }
    });
}); });
var goBack = function () {
    router.push("/students");
};
var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
    var finalPayload, id, putPayload, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, 3, 4]);
                isSubmitting.value = true;
                finalPayload = __assign(__assign({}, form.value), { class_name: typeof form.value.class_name === "object"
                        ? form.value.class_name.name
                        : form.value.class_name });
                id = finalPayload.id, putPayload = __rest(finalPayload, ["id"]);
                return [4 /*yield*/, store.updateItem(id, putPayload)];
            case 1:
                _a.sent();
                router.push("/students");
                return [3 /*break*/, 4];
            case 2:
                error_1 = _a.sent();
                alert(error_1.message || "An error occurred");
                return [3 /*break*/, 4];
            case 3:
                isSubmitting.value = false;
                return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
var i18n = {
    brand: "SCHOOL",
    version: "V3",
    header: {
        title: "Edit Student",
        subtitle: "Modify student profile and academic status.",
    },
    actions: {
        back: "Back to List",
    },
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
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)(__assign({ class: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10" }, { 'data-aos': "fade-down" }));
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['md:flex-row']} */ ;
/** @type {__VLS_StyleScopedClasses['md:items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-10']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)(__assign({ class: "text-4xl font-extrabold mb-2" }));
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-extrabold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
(__VLS_ctx.i18n.header.title);
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "text-base-content/40" }));
/** @type {__VLS_StyleScopedClasses['text-base-content/40']} */ ;
(__VLS_ctx.i18n.header.subtitle);
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: (__VLS_ctx.goBack) }, { class: "btn btn-ghost rounded-xl px-6 font-bold gap-2" }));
/** @type {__VLS_StyleScopedClasses['btn']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-ghost']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['px-6']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
var __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.Icon} */
vue_1.Icon;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0(__assign({ icon: "lucide:arrow-left" }, { class: "text-sm" })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ icon: "lucide:arrow-left" }, { class: "text-sm" })], __VLS_functionalComponentArgsRest(__VLS_1), false));
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
(__VLS_ctx.i18n.actions.back);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "bg-base-100 shadow-2xl border rounded-[2.5rem] p-8 max-w-3xl" }, { 'data-aos': "fade-up", 'data-aos-delay': "150" }));
/** @type {__VLS_StyleScopedClasses['bg-base-100']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-[2.5rem]']} */ ;
/** @type {__VLS_StyleScopedClasses['p-8']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-3xl']} */ ;
if (__VLS_ctx.showSkeleton) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "space-y-6 animate-pulse" }));
    /** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "space-y-2" }));
    /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "h-3 w-24 bg-base-200 rounded" }));
    /** @type {__VLS_StyleScopedClasses['h-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-24']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-base-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "h-12 bg-base-200 rounded-xl" }));
    /** @type {__VLS_StyleScopedClasses['h-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-base-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "space-y-2" }));
    /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "h-3 w-20 bg-base-200 rounded" }));
    /** @type {__VLS_StyleScopedClasses['h-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-20']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-base-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "h-12 bg-base-200 rounded-xl" }));
    /** @type {__VLS_StyleScopedClasses['h-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-base-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "space-y-2" }));
    /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "h-3 w-20 bg-base-200 rounded" }));
    /** @type {__VLS_StyleScopedClasses['h-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-20']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-base-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "h-12 bg-base-200 rounded-xl" }));
    /** @type {__VLS_StyleScopedClasses['h-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-base-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "space-y-2" }));
    /** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "h-3 w-28 bg-base-200 rounded" }));
    /** @type {__VLS_StyleScopedClasses['h-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['w-28']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-base-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "h-12 bg-base-200 rounded-xl" }));
    /** @type {__VLS_StyleScopedClasses['h-12']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-base-200']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)(__assign({ onSubmit: (__VLS_ctx.handleSubmit) }, { class: "flex flex-col gap-5" }));
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-5']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "form-control" }));
    /** @type {__VLS_StyleScopedClasses['form-control']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)(__assign({ class: "label" }));
    /** @type {__VLS_StyleScopedClasses['label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "label-text font-bold" }));
    /** @type {__VLS_StyleScopedClasses['label-text']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)(__assign(__assign({ value: (__VLS_ctx.form.name), type: "text" }, { class: "input input-bordered rounded-xl" }), { required: true }));
    /** @type {__VLS_StyleScopedClasses['input']} */ ;
    /** @type {__VLS_StyleScopedClasses['input-bordered']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "form-control" }));
    /** @type {__VLS_StyleScopedClasses['form-control']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)(__assign({ class: "label" }));
    /** @type {__VLS_StyleScopedClasses['label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "label-text font-bold" }));
    /** @type {__VLS_StyleScopedClasses['label-text']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)(__assign(__assign({ value: (__VLS_ctx.form.nis), type: "text" }, { class: "input input-bordered rounded-xl" }), { required: true }));
    /** @type {__VLS_StyleScopedClasses['input']} */ ;
    /** @type {__VLS_StyleScopedClasses['input-bordered']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "form-control" }));
    /** @type {__VLS_StyleScopedClasses['form-control']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)(__assign({ class: "label" }));
    /** @type {__VLS_StyleScopedClasses['label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "label-text font-bold" }));
    /** @type {__VLS_StyleScopedClasses['label-text']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.select, __VLS_intrinsics.select)(__assign(__assign({ value: (__VLS_ctx.form.gender) }, { class: "select select-bordered rounded-xl" }), { required: true }));
    /** @type {__VLS_StyleScopedClasses['select']} */ ;
    /** @type {__VLS_StyleScopedClasses['select-bordered']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
        value: "Male",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
        value: "Female",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "form-control" }));
    /** @type {__VLS_StyleScopedClasses['form-control']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)(__assign({ class: "label" }));
    /** @type {__VLS_StyleScopedClasses['label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "label-text font-bold" }));
    /** @type {__VLS_StyleScopedClasses['label-text']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
    var __VLS_5 = void 0;
    /** @ts-ignore @type {typeof __VLS_components.AutoComplete} */
    autocomplete_1.default;
    // @ts-ignore
    var __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5(__assign(__assign(__assign({ 'onComplete': {} }, { modelValue: (__VLS_ctx.form.class_name), suggestions: (__VLS_ctx.filteredClasses), optionLabel: "name", placeholder: "Search Class" }), { class: "w-full" }), { inputClass: "input input-bordered rounded-xl w-full" })));
    var __VLS_7 = __VLS_6.apply(void 0, __spreadArray([__assign(__assign(__assign({ 'onComplete': {} }, { modelValue: (__VLS_ctx.form.class_name), suggestions: (__VLS_ctx.filteredClasses), optionLabel: "name", placeholder: "Search Class" }), { class: "w-full" }), { inputClass: "input input-bordered rounded-xl w-full" })], __VLS_functionalComponentArgsRest(__VLS_6), false));
    var __VLS_10 = void 0;
    var __VLS_11 = ({ complete: {} },
        { onComplete: (__VLS_ctx.searchClass) });
    /** @type {__VLS_StyleScopedClasses['w-full']} */ ;
    var __VLS_8;
    var __VLS_9;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "flex justify-end gap-3 mt-6" }));
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ onClick: (__VLS_ctx.goBack) }, { type: "button" }), { class: "btn btn-ghost rounded-xl" }));
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-ghost']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ type: "submit" }, { class: "btn btn-secondary rounded-xl px-8" }), { disabled: (__VLS_ctx.isSubmitting) }));
    /** @type {__VLS_StyleScopedClasses['btn']} */ ;
    /** @type {__VLS_StyleScopedClasses['btn-secondary']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['px-8']} */ ;
    if (__VLS_ctx.isSubmitting) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "loading loading-spinner loading-sm" }));
        /** @type {__VLS_StyleScopedClasses['loading']} */ ;
        /** @type {__VLS_StyleScopedClasses['loading-spinner']} */ ;
        /** @type {__VLS_StyleScopedClasses['loading-sm']} */ ;
    }
}
var __VLS_12 = Sidebar_vue_1.default;
// @ts-ignore
var __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({}));
var __VLS_14 = __VLS_13.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_13), false));
// @ts-ignore
[i18n, i18n, i18n, goBack, goBack, showSkeleton, handleSubmit, form, form, form, form, filteredClasses, searchClass, isSubmitting, isSubmitting,];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};

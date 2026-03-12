"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDashboardStore = void 0;
var pinia_1 = require("pinia");
var useTeacherStore_1 = require("./useTeacherStore");
var useStudentStore_1 = require("./useStudentStore");
var useClassStore_1 = require("./useClassStore");
var useSubjectStore_1 = require("./useSubjectStore");
var useScheduleStore_1 = require("./useScheduleStore");
var useAuthStore_1 = require("./useAuthStore");
/**
 * Store for managing Dashboard-specific data.
 * Aggregates data from other stores to provide a high-level overview.
 */
exports.useDashboardStore = (0, pinia_1.defineStore)('dashboard', {
    state: function () { return ({
        isLoading: true,
        locale: 'id',
        stats: [],
        academicEvents: [],
        schoolSummary: { totalAdmins: 0, activeTeachers: 0, avgStudentsPerClass: 0 },
        auditLogs: [],
        teacherStatus: { active: 0, inactive: 0, total: 0 },
        chartData: null,
        chartOptions: null,
    }); },
    actions: {
        /**
         * Aggregates and fetches data from multiple stores to populate the dashboard.
         * Simulates fetching of events and chart data as well.
         */
        fetchDashboardData: function () {
            return __awaiter(this, void 0, void 0, function () {
                var teacherStore, studentStore, classStore, subjectStore, scheduleStore, authStore, activeCount, totalTeachers, colors_1, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.isLoading = true;
                            teacherStore = (0, useTeacherStore_1.useTeacherStore)();
                            studentStore = (0, useStudentStore_1.useStudentStore)();
                            classStore = (0, useClassStore_1.useClassStore)();
                            subjectStore = (0, useSubjectStore_1.useSubjectStore)();
                            scheduleStore = (0, useScheduleStore_1.useScheduleStore)();
                            authStore = (0, useAuthStore_1.useAuthStore)();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, 4, 5]);
                            // Fetch all base data from real API via their respective stores
                            return [4 /*yield*/, Promise.all([
                                    teacherStore.fetchList(),
                                    studentStore.fetchList(),
                                    classStore.fetchList(),
                                    subjectStore.fetchList(),
                                    scheduleStore.fetchList()
                                ])];
                        case 2:
                            // Fetch all base data from real API via their respective stores
                            _a.sent();
                            // Transform store counts into statistics objects
                            this.stats = [
                                { label: 'Total Guru', value: teacherStore.items.length, icon: 'fas fa-user-tie', color: 'text-primary', bg: 'bg-primary/10' },
                                { label: 'Total Siswa', value: studentStore.items.length, icon: 'fas fa-user-graduate', color: 'text-secondary', bg: 'bg-secondary/10' },
                                { label: 'Kelas Aktif', value: classStore.items.length, icon: 'fas fa-door-open', color: 'text-accent', bg: 'bg-accent/10' },
                                { label: 'Total Subjects', value: subjectStore.items.length, icon: 'fas fa-book', color: 'text-info', bg: 'bg-info/10' }
                            ];
                            activeCount = teacherStore.items.filter(function (t) { return t.status === 'Active'; }).length;
                            totalTeachers = teacherStore.items.length;
                            this.teacherStatus = {
                                active: activeCount,
                                inactive: totalTeachers - activeCount,
                                total: totalTeachers
                            };
                            // School data summary aggregation
                            this.schoolSummary = {
                                totalAdmins: 1, // Assume 1 admin per initial mock layout instructions
                                activeTeachers: activeCount,
                                avgStudentsPerClass: classStore.items.length > 0
                                    ? Math.round(studentStore.items.length / classStore.items.length)
                                    : 0
                            };
                            colors_1 = ['primary', 'secondary', 'accent', 'info', 'warning'];
                            this.academicEvents = scheduleStore.items
                                .slice(0, 3)
                                .map(function (sch, index) { return ({
                                id: sch.id,
                                title: "".concat(sch.subject, " - ").concat(sch.class_name),
                                date: "".concat(sch.day, ", ").concat(sch.period_duration),
                                type: 'Class',
                                color: colors_1[index % colors_1.length]
                            }); });
                            // Mock Audit Logs
                            this.auditLogs = [
                                { id: 101, action: 'CREATE', entity: 'User', details: 'Added new teacher John Doe', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
                                { id: 102, action: 'UPDATE', entity: 'Schedule', details: 'Modified Math class timings', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
                                { id: 103, action: 'DELETE', entity: 'Student', details: 'Removed inactive student record', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
                                { id: 104, action: 'CREATE', entity: 'Class', details: 'Created Class 11-Science', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
                                { id: 105, action: 'UPDATE', entity: 'Settings', details: 'Administrator changed global locale', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() }
                            ];
                            // Mock chart configuration
                            this.chartData = {
                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                datasets: [
                                    {
                                        label: 'Average Attendance (%)',
                                        data: [95, 96, 94, 98, 97, 99, 98],
                                        fill: false,
                                        borderColor: '#4f46e5',
                                        tension: 0.4
                                    },
                                    {
                                        label: 'Average Grades',
                                        data: [82, 85, 87, 85, 88, 90, 91],
                                        fill: false,
                                        borderColor: '#ec4899',
                                        tension: 0.4
                                    }
                                ]
                            };
                            this.chartOptions = {
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top'
                                    }
                                }
                            };
                            return [3 /*break*/, 5];
                        case 3:
                            err_1 = _a.sent();
                            console.error('DashboardStore[fetchDashboardData]:', err_1);
                            return [3 /*break*/, 5];
                        case 4:
                            this.isLoading = false;
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        /**
         * Toggles the global dashboard locale between ID and EN.
         */
        toggleLocale: function () {
            this.locale = this.locale === 'id' ? 'en' : 'id';
        }
    }
});

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClassStore = void 0;
var pinia_1 = require("pinia");
var classService_1 = require("@/services/classService");
/**
 * Store for managing Class data.
 * Handles fetching, creating, updating, and status toggling of classes.
 */
exports.useClassStore = (0, pinia_1.defineStore)('class', {
    state: function () { return ({
        /** List of all class items */
        items: [],
        /** Detailed data for a single class */
        detail: null,
        /** Loading status for the list of items */
        loadingList: false,
        /** Loading status for a single item detail */
        loadingDetail: false,
        /** Error message if any operation fails */
        error: null
    }); },
    actions: {
        /**
         * Fetches the complete list of classes from the service.
         */
        fetchList: function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, err_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.loadingList = true;
                            this.error = null;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            _a = this;
                            return [4 /*yield*/, classService_1.classService.getAll()];
                        case 2:
                            _a.items = _b.sent();
                            return [3 /*break*/, 5];
                        case 3:
                            err_1 = _b.sent();
                            this.error = err_1.message || 'Failed to fetch classes';
                            console.error('ClassStore[fetchList]:', err_1);
                            return [3 /*break*/, 5];
                        case 4:
                            this.loadingList = false;
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        /**
         * Fetches details for a specific class by ID.
         * @param id - The unique identifier of the class.
         */
        fetchDetail: function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, err_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.loadingDetail = true;
                            this.error = null;
                            this.detail = null;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, 4, 5]);
                            _a = this;
                            return [4 /*yield*/, classService_1.classService.getById(id)];
                        case 2:
                            _a.detail = _b.sent();
                            return [2 /*return*/, this.detail];
                        case 3:
                            err_2 = _b.sent();
                            this.error = err_2.message || 'Failed to fetch class details';
                            console.error("ClassStore[fetchDetail]: id=".concat(id), err_2);
                            throw err_2;
                        case 4:
                            this.loadingDetail = false;
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        },
        /**
         * Creates a new class record.
         * @param payload - The class data (excluding ID).
         */
        createItem: function (payload) {
            return __awaiter(this, void 0, void 0, function () {
                var newItem, err_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.error = null;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, classService_1.classService.create(payload)];
                        case 2:
                            newItem = _a.sent();
                            this.items.push(newItem);
                            return [2 /*return*/, newItem];
                        case 3:
                            err_3 = _a.sent();
                            this.error = err_3.message || 'Failed to create class';
                            console.error('ClassStore[createItem]:', err_3);
                            throw err_3;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        /**
         * Updates an existing class record.
         * @param id - The unique identifier of the class.
         * @param payload - Partial class data to update.
         */
        updateItem: function (id, payload) {
            return __awaiter(this, void 0, void 0, function () {
                var updatedItem, index, err_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.error = null;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, classService_1.classService.update(id, payload)];
                        case 2:
                            updatedItem = _a.sent();
                            index = this.items.findIndex(function (i) { return String(i.id) === String(id); });
                            if (index !== -1) {
                                this.items[index] = __assign(__assign({}, this.items[index]), updatedItem);
                            }
                            return [2 /*return*/, updatedItem];
                        case 3:
                            err_4 = _a.sent();
                            this.error = err_4.message || 'Failed to update class';
                            console.error("ClassStore[updateItem]: id=".concat(id), err_4);
                            throw err_4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        },
        /**
         * Toggles a specific status field for a class.
         * @param id - The unique identifier of the class.
         * @param statusField - The name of the field to update.
         * @param newValue - The new value for the field.
         */
        toggleItemStatus: function (id, statusField, newValue) {
            return __awaiter(this, void 0, void 0, function () {
                var updatedItem, index, err_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.error = null;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, classService_1.classService.updateStatus(id, statusField, newValue)];
                        case 2:
                            updatedItem = _a.sent();
                            index = this.items.findIndex(function (i) { return String(i.id) === String(id); });
                            if (index !== -1) {
                                this.items[index] = __assign(__assign({}, this.items[index]), updatedItem);
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            err_5 = _a.sent();
                            this.error = err_5.message || 'Failed to update class status';
                            console.error("ClassStore[toggleStatus]: id=".concat(id, ", field=").concat(statusField), err_5);
                            throw err_5;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
    }
});

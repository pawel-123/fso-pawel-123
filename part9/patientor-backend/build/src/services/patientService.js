"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const getNonSensitivePatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const getPatient = (id) => {
    return patients_1.default.find(patient => patient.id === id);
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: uuid.v1(), entries: [] }, patient);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getNonSensitivePatients,
    getPatient,
    addPatient
};

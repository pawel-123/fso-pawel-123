"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
// const patients: Patient[] = patientData;
// const patients: Omit<Patient, 'ssn'>[] = patientData;
const getNonSensitivePatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: uuid.v1() }, patient);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getNonSensitivePatients,
    addPatient
};

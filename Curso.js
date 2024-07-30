import { Horario } from "./Horario.js";
export class Curso {
    constructor(materia) {
        this.horarios = [];
        this.profesor = "";
        this.materia = "";
        this.grupo = 0;
        this.materia = materia;
        this.container = document.createElement("tr");
    }
    setInfoCurso(profesor, grupo, prioridad) {
        this.profesor = profesor;
        this.grupo = grupo;
        this.prioridad = prioridad;
    }
    agregarHorario(dia, horaInicio, horaFinal) {
        var _a;
        let nuevoHorario = new Horario(dia, horaInicio, horaFinal);
        (_a = this.horarios) === null || _a === void 0 ? void 0 : _a.push(nuevoHorario);
    }
    mostrar() {
        const tdProfesor = document.createElement("td");
        const tdGrupo = document.createElement("td");
        tdProfesor.textContent = this.profesor;
        tdGrupo.textContent = this.grupo.toString();
        this.container.appendChild(tdProfesor);
        this.container.appendChild(tdGrupo);
    }
}

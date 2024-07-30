import { Curso } from "./Curso.js";
import { FormularioCurso } from "./FormularioCurso.js";
export class Materia {
    constructor() {
        this.materia = "";
        this.clases = [];
    }
    setNameMateria(materia) {
        this.materia = materia;
    }
    iniciar() {
        var _a;
        const section = document.createElement("section");
        section.classList.add("section__materia");
        const title = document.createElement("h3");
        title.textContent = this.materia;
        const buttonAdd = document.createElement("button");
        buttonAdd.classList.add("button");
        buttonAdd.textContent = "Agregar clase";
        // Crear la tabla
        const table = document.createElement("table");
        table.classList.add("schedule-table");
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        const headers = ["Profesor", "Grupo"];
        headers.forEach(headerText => {
            const th = document.createElement("th");
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        // Crear el cuerpo de la tabla
        const tbody = document.createElement("tbody");
        thead.appendChild(headerRow);
        table.appendChild(thead);
        table.appendChild(tbody);
        section.appendChild(title);
        section.appendChild(table);
        section.appendChild(buttonAdd);
        (_a = document.getElementById('app')) === null || _a === void 0 ? void 0 : _a.appendChild(section);
        buttonAdd.addEventListener("click", (event) => { this.addCurso(tbody, section); });
    }
    addCurso(table, section) {
        let curso = new Curso(this.materia);
        let form = new FormularioCurso(curso, section);
        this.clases.push(curso);
        table.appendChild(curso.container);
    }
}

import { Curso } from "./Curso.js"
import { FormularioCurso } from "./FormularioCurso.js"

export class Materia {

    private materia: string = ""
    public clases: Curso[] = []


    constructor() {
    }

    public setNameMateria(materia: string) {
        this.materia = materia
    }

    public iniciar() {
        const section = document.createElement("section")
        section.classList.add("section__materia")

        const title = document.createElement("h3")
        title.textContent = this.materia

        const buttonAdd = document.createElement("button")
        buttonAdd.classList.add("button")
        buttonAdd.textContent = "Agregar clase"

        // Crear la tabla
        const table = document.createElement("table")
        table.classList.add("schedule-table")
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
        table.appendChild(tbody)


        section.appendChild(title)
        section.appendChild(table)
        section.appendChild(buttonAdd)

        document.getElementById('app')?.appendChild(section);

        buttonAdd.addEventListener("click", (event) => { this.addCurso(tbody, section) })

    }

    private addCurso(table: HTMLTableSectionElement, section : HTMLElement) {
        let curso = new Curso(this.materia)
        let form = new FormularioCurso(curso, section)
        this.clases.push(curso)
        table.appendChild(curso.container)
    }
}
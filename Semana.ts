import { PRIORITY } from "./constantes.js";
import { Curso } from "./Curso.js"
export class Semana {
    public clases: Curso[]

    constructor(clases: Curso[]) {

        clases.sort((a, b) => {
            if (a.grupo < b.grupo) {
                return -1;
            } else if (a.grupo > b.grupo) {
                return 1;
            } else {
                return 0;
            }
        });
        this.clases = clases
    }

    private agregarEncabezados(table: HTMLTableElement) {
        // Crear el encabezado de la tabla
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        const headers = ["Profesor", "Asignatura", "Grupo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
        headers.forEach(headerText => {
            const th = document.createElement("th");
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);
    }
    private agregarCuerpo(table: HTMLTableElement) {
        // Crear el cuerpo de la tabla
        const tbody = document.createElement("tbody");
        this.clases.forEach(curso => {
            const row = document.createElement("tr");
            let claseCurso : PRIORITY = (curso.prioridad == PRIORITY.ALTA?PRIORITY.ALTA : (curso.prioridad == PRIORITY.MEDIA ? PRIORITY.MEDIA : PRIORITY.BAJA)) 
            row.classList.add(claseCurso)
            const tdProfesor = document.createElement("td")
            const tdMateria = document.createElement("td")
            const tdGrupo = document.createElement("td")
            tdProfesor.textContent = curso.profesor
            tdMateria.textContent = curso.materia
            tdGrupo.textContent = curso.grupo.toString()
            row.appendChild(tdProfesor)
            row.appendChild(tdMateria)
            row.appendChild(tdGrupo)

            for (let i = 0; i < 5; i++) {
                const td = document.createElement("td");
                let resultado = curso.horarios.find(horario=>horario.dia == i)
                if(resultado){
                    let horaInicio = resultado.horaInicio.toString()
                    .replace(/\.(\d)$/, ":$10")
                    .replace(/\./g, ":")
                    let horaFinal = resultado.horaFinal.toString()
                    .replace(/\.(\d)$/, ":$10")
                    .replace(/\./g, ":")
                    td.textContent = `${(!horaInicio.includes(":")?horaInicio+":00":horaInicio)} - ${(!horaFinal.includes(":")?horaFinal+":00":horaFinal)}` 
                } else {
                    td.textContent = ""
                }
                row.appendChild(td)
            }
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
    }

    public pintarTabla() {
        // Crear la tabla
        const tableContainer = document.getElementById("schedule-table-container");
        const table = document.createElement("table");
        table.classList.add("schedule-table");
        this.agregarEncabezados(table)
        this.agregarCuerpo(table)
        if(tableContainer) tableContainer.appendChild(table);
    }
} 
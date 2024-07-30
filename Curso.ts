import { Horario } from "./Horario.js"
import { DIAS, PRIORITY } from "./constantes.js"

export class Curso{

    public horarios : Horario[] = []
    public profesor : string = ""
    public materia : string = ""
    public grupo : number = 0
    public prioridad? : PRIORITY
    public container : HTMLDivElement

    constructor(materia : string){
        this.materia = materia
        this.container = document.createElement("tr")
    }

    public setInfoCurso(profesor: string, grupo : number, prioridad : PRIORITY){
        this.profesor = profesor
        this.grupo = grupo
        this.prioridad = prioridad
    }

    public agregarHorario(dia : DIAS, horaInicio : number, horaFinal : number) : void {
        let nuevoHorario : Horario = new Horario(dia, horaInicio, horaFinal)
        this.horarios?.push(nuevoHorario)
    } 

    public mostrar(){
            const tdProfesor = document.createElement("td")
            const tdGrupo = document.createElement("td")
            tdProfesor.textContent = this.profesor
            tdGrupo.textContent = this.grupo.toString()
            this.container.appendChild(tdProfesor)
            this.container.appendChild(tdGrupo)
    }
}
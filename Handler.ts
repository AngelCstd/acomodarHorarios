import { Curso } from "./Curso.js";
import { Semana } from "./Semana.js"
export class Handler {

    private semanas: Semana[] = [];
    private materias: Curso[][];

    constructor(materias: Curso[][]) {
        this.materias = materias
    }
    private revisarConflicto(clase: Curso, clases: Curso[]): boolean {
        let respuesta: boolean = false
        clases.forEach(currentClase => {
            currentClase.horarios?.forEach(currentHorario => {
                clase.horarios?.forEach(horario => {
                    if (horario.dia == currentHorario.dia) {

                        if ((currentHorario.horaInicio <= horario.horaInicio
                            && currentHorario.horaFinal > horario.horaInicio)
                            || (currentHorario.horaInicio < horario.horaFinal
                                && currentHorario.horaFinal > horario.horaFinal)) {
                            respuesta = true
                        }
                    }
                })
            })
        })
        return respuesta
    }

    private crearConjuntosClases(indices: number[], clases: Curso[]): void {
        if (indices.length < this.materias.length) {
            this.materias.forEach((materia, index) => {
                if (indices.includes(index)) {
                    return
                }
                materia.forEach(clase => {
                    if (this.revisarConflicto(clase, clases)) return
                    this.crearConjuntosClases([...indices, index], [...clases, clase])
                })

            })
        } else {
            if (clases.length > this.materias.length / 2) {
                let semana = new Semana(clases)
                if (!this.isDuplicate(semana)) {
                    this.semanas.push(semana)
                }
            }
        }
    }
    private isDuplicate(semana: Semana): boolean {
        let resultado = this.semanas.map(currentSemana =>this.isDuplicateWeek(currentSemana, semana))
        return resultado.some(element => element == true)
    }
    private isDuplicateWeek(semana: Semana, revisionSemana: Semana): boolean {
        let resultado = semana.clases.map(currentClass => this.isDuplicateClass(currentClass, revisionSemana))
        return !resultado.some(element=>element==false)
    }
    private isDuplicateClass(curso: Curso, revisionCursos: Semana): boolean {
        return revisionCursos.clases.some((clase) => clase.grupo == curso.grupo && clase.materia && curso.materia)
    }

    private pintarSemanas() {
        this.semanas.forEach(semana => semana.pintarTabla())
    }
    public iniciar(): void {
        //Iniciar el proceso de acomodo
        this.materias.forEach((materia, index) => {
            if (!materia) {
                throw new Error("No se encontraron clases en esta materia");
            }
            materia.forEach(clase => {
                this.crearConjuntosClases([index], [clase])
            });
        })

        //Pintar
        this.pintarSemanas()
    }
} 
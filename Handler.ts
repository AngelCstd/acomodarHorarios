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

                        if ((currentHorario.horaInicio * 100 <= horario.horaInicio * 100
                            && currentHorario.horaFinal * 100 > horario.horaInicio * 100)
                            || (currentHorario.horaInicio * 100 < horario.horaFinal * 100
                                && currentHorario.horaFinal * 100 > horario.horaFinal * 100)) {
                            respuesta = true
                        }
                    }
                })
            })
        })
        return respuesta
    }

    private crearConjuntosClases(indices: number[], clases: Curso[]): void {
        if (this.semanas.length > 35) return
        if (indices.length >= this.materias.length) {//*5/7 || (this.materias.length < 4 && indices.length >= 1)
            let semana = new Semana(clases)
            if (!this.isDuplicate(semana)) {
                this.semanas.push(semana)
            }
        } else {
            this.materias.forEach((materia, index) => {
                if (indices.includes(index)) {
                    return
                }
                materia.forEach(clase => {
                    if (this.revisarConflicto(clase, clases)) this.crearConjuntosClases([...indices, index], [...clases])
                    this.crearConjuntosClases([...indices, index], [...clases, clase])
                })

            })
        }
    }
    private isDuplicate(semana: Semana): boolean {
        let resultado = this.semanas.map(currentSemana => this.isDuplicateWeek(currentSemana, semana))
        return resultado.some(element => element == true)
    }
    private isDuplicateWeek(semana: Semana, revisionSemana: Semana): boolean {
        let resultado = semana.clases.map(currentClass => this.isDuplicateClass(currentClass, revisionSemana))
        return !resultado.some(element => element == false)
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
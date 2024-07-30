import { Semana } from "./Semana.js";
export class Handler {
    constructor(materias) {
        this.semanas = [];
        this.materias = materias;
    }
    revisarConflicto(clase, clases) {
        let respuesta = false;
        clases.forEach(currentClase => {
            var _a;
            (_a = currentClase.horarios) === null || _a === void 0 ? void 0 : _a.forEach(currentHorario => {
                var _a;
                (_a = clase.horarios) === null || _a === void 0 ? void 0 : _a.forEach(horario => {
                    if (horario.dia == currentHorario.dia) {
                        if ((currentHorario.horaInicio <= horario.horaInicio
                            && currentHorario.horaFinal > horario.horaInicio)
                            || (currentHorario.horaInicio < horario.horaFinal
                                && currentHorario.horaFinal > horario.horaFinal)) {
                            respuesta = true;
                        }
                    }
                });
            });
        });
        return respuesta;
    }
    crearConjuntosClases(indices, clases) {
        if (indices.length < this.materias.length) {
            this.materias.forEach((materia, index) => {
                if (indices.includes(index)) {
                    return;
                }
                materia.forEach(clase => {
                    if (this.revisarConflicto(clase, clases))
                        return;
                    this.crearConjuntosClases([...indices, index], [...clases, clase]);
                });
            });
        }
        else {
            if (clases.length > this.materias.length / 2) {
                let semana = new Semana(clases);
                if (!this.isDuplicate(semana)) {
                    this.semanas.push(semana);
                }
            }
        }
    }
    isDuplicate(semana) {
        let resultado = this.semanas.map(currentSemana => this.isDuplicateWeek(currentSemana, semana));
        return resultado.some(element => element == true);
    }
    isDuplicateWeek(semana, revisionSemana) {
        let resultado = semana.clases.map(currentClass => this.isDuplicateClass(currentClass, revisionSemana));
        return !resultado.some(element => element == false);
    }
    isDuplicateClass(curso, revisionCursos) {
        return revisionCursos.clases.some((clase) => clase.grupo == curso.grupo && clase.materia && curso.materia);
    }
    pintarSemanas() {
        this.semanas.forEach(semana => semana.pintarTabla());
    }
    iniciar() {
        //Iniciar el proceso de acomodo
        this.materias.forEach((materia, index) => {
            if (!materia) {
                throw new Error("No se encontraron clases en esta materia");
            }
            materia.forEach(clase => {
                this.crearConjuntosClases([index], [clase]);
            });
        });
        //Pintar
        this.pintarSemanas();
    }
}

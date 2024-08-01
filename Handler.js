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
                        if ((currentHorario.horaInicio * 100 <= horario.horaInicio * 100
                            && currentHorario.horaFinal * 100 > horario.horaInicio * 100)
                            || (currentHorario.horaInicio * 100 < horario.horaFinal * 100
                                && currentHorario.horaFinal * 100 > horario.horaFinal * 100)) {
                            respuesta = true;
                        }
                    }
                });
            });
        });
        return respuesta;
    }
    crearConjuntosClases(indices, clases) {
        if (this.semanas.length > 35)
            return;
        if (indices.length >= this.materias.length) { //*5/7 || (this.materias.length < 4 && indices.length >= 1)
            let semana = new Semana(clases);
            if (!this.isDuplicate(semana)) {
                this.semanas.push(semana);
            }
        }
        else {
            this.materias.forEach((materia, index) => {
                if (indices.includes(index)) {
                    return;
                }
                materia.forEach(clase => {
                    if (this.revisarConflicto(clase, clases))
                        this.crearConjuntosClases([...indices, index], [...clases]);
                    this.crearConjuntosClases([...indices, index], [...clases, clase]);
                });
            });
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

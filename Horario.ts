import { DIAS } from "./constantes.js";
export class Horario {
    public dia?:
        | DIAS.LUNES
        | DIAS.MARTES
        | DIAS.MIERCOLES
        | DIAS.JUEVES
        | DIAS.VIERNES;
    public horaInicio: number;
    public horaFinal: number;

    constructor( dia : DIAS, horaInicio : number, horaFinal : number) {
        this.dia = dia,
        this.horaInicio = horaInicio
        this.horaFinal = horaFinal
    }
}

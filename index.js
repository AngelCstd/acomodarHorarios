import { Formulario } from "./Formulario.js";
import { Handler } from "./Handler.js";
import { Materia } from "./Materia.js";
let formMateria;
let materia;
let listaMAterias = [];
function agregarMateria() {
    if (materia) {
        listaMAterias.push(materia.clases);
    }
    materia = new Materia();
    formMateria = new Formulario(materia);
}
const add_materia = document.getElementById("add-materia");
add_materia === null || add_materia === void 0 ? void 0 : add_materia.addEventListener("click", agregarMateria);
const comenzar = document.querySelector("#comenzar");
function iniciarLogica() {
    if (materia) {
        listaMAterias.push(materia.clases);
    }
    let manejador = new Handler(listaMAterias);
    manejador.iniciar();
}
comenzar === null || comenzar === void 0 ? void 0 : comenzar.addEventListener("click", iniciarLogica);
/*
let curso : Curso = new Curso("Segura Rauda Minerva", "Electricidad y magnetismo (L)", 1357, PRIORITY.MEDIA)
curso.agregarHorario(DIAS.LUNES, 4, 5.5)
curso.agregarHorario(DIAS.MIERCOLES, 4, 5.5)
curso.agregarHorario(DIAS.VIERNES, 4, 5.5)

let curso1 : Curso = new Curso("Alvarez Soriano Manuel Alejandro", "Electricidad y magnetismo (L)", 1358, PRIORITY.BAJA)
curso1.agregarHorario(DIAS.LUNES, 7, 8.5)
curso1.agregarHorario(DIAS.MIERCOLES, 7, 8.5)
curso1.agregarHorario(DIAS.VIERNES, 7, 8.5)

let curso2 : Curso = new Curso("Perez Guzman Alejandro", "Electricidad y magnetismo (L)", 1359, PRIORITY.ALTA)
curso2.agregarHorario(DIAS.LUNES, 4, 5.5)
curso2.agregarHorario(DIAS.MIERCOLES, 4, 5.5)
curso2.agregarHorario(DIAS.VIERNES, 4, 5.5)

let materia : Curso[] = [curso, curso1, curso2]

//Agregando otra clase

let otrocurso : Curso = new Curso("Lopez Carreto, Juan Manuel", "Diseño logico", 1557, PRIORITY.MEDIA)
otrocurso.agregarHorario(DIAS.LUNES, 3, 5)
otrocurso.agregarHorario(DIAS.MIERCOLES, 3, 5)

let otrocurso1 : Curso = new Curso("Arellano Rivera Esteban", "Diseño logico", 1558, PRIORITY.BAJA)
otrocurso1.agregarHorario(DIAS.LUNES, 8, 9.25)
otrocurso1.agregarHorario(DIAS.MIERCOLES, 8, 9.25)
otrocurso1.agregarHorario(DIAS.VIERNES, 8 , 9.25)

let otrocurso2 : Curso = new Curso("Lozano Mendez EFREN", "Diseño logico", 1559, PRIORITY.ALTA)
otrocurso2.agregarHorario(DIAS.LUNES, 5, 7)
otrocurso2.agregarHorario(DIAS.MIERCOLES, 5, 7)

let materia1 : Curso[] = [otrocurso, otrocurso1, otrocurso2]


console.log(materia)
console.log(materia1)

let manejador : Handler = new Handler([materia, materia1])
*/

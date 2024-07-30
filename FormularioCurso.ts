import { DIAS, PRIORITY } from "./constantes";
import { Curso } from "./Curso";

export class FormularioCurso {

    public curso: Curso
    public container : HTMLElement

    constructor(curso: Curso, container : HTMLElement) {
        this.curso = curso
        this.container = container
        this.iniciar()
    }

    private iniciar() {
        const form = document.createElement("form")

        //Crear input de profesor
        const div_profesor = document.createElement("div")
        const label_profesor = document.createElement("label")
        label_profesor.classList.add("label__input")
        label_profesor.setAttribute('for', 'profesor');
        label_profesor.textContent = 'Maestro:';
        const input_profesor = document.createElement('input');
        input_profesor.classList.add("input__text")
        input_profesor.id = "profesor"
        input_profesor.type = 'text';
        input_profesor.name = 'profesor';
        input_profesor.placeholder = "Garcia Lopez Juan Pablo"
        div_profesor.appendChild(label_profesor)
        div_profesor.appendChild(input_profesor)
        form.appendChild(div_profesor)

        //Crear input de grupo
        const div_grupo = document.createElement("div")
        const label_grupo = document.createElement("label")
        label_grupo.classList.add("label__input")
        label_grupo.setAttribute('for', 'grupo');
        label_grupo.textContent = 'Grupo:';
        const input_grupo = document.createElement('input');
        input_grupo.classList.add("input__text")
        input_grupo.type = 'number';
        input_grupo.id = "grupo"
        input_grupo.name = 'grupo';
        input_grupo.placeholder = "1356"
        div_grupo.appendChild(label_grupo)
        div_grupo.appendChild(input_grupo)
        form.appendChild(div_grupo)
        
        //Crear input de prioridad
        const opciones = ["Alta", "Media", "Baja"]
        const div_select = document.createElement("div")
        const select_prioridad = this.crearSelect("prioridad", opciones, "Prioridad:")
        div_select.appendChild(select_prioridad.label)
        div_select.appendChild(select_prioridad.select)
        form.appendChild(div_select)

        //Creando arrays para usar en las opciones de horarios
        let horas = ["0", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
        let minutos = ["00", "15", "30", "45"]

        //Crear horarios
        form.appendChild(this.selectDay("Lunes", horas, minutos))
        form.appendChild(this.selectDay("Martes", horas, minutos))
        form.appendChild(this.selectDay("Miercoles", horas, minutos))
        form.appendChild(this.selectDay("Jueves", horas, minutos))
        form.appendChild(this.selectDay("Viernes", horas, minutos))

        //Crear boton de enviar
        const submit = document.createElement("button")
        submit.classList.add("button")
        submit.type = "submit"
        submit.textContent = "Confirmar"
        form.appendChild(submit)

        this.container.appendChild(form)

        form.addEventListener("submit", event => { this.handleSubmit(event) })
    }

    private crearSelect(id: string, opciones: string[], labelName: string) {
        const label = document.createElement("label")
        label.setAttribute('for', id);
        label.textContent = labelName;
        const select = document.createElement("select")
        select.id = id
        select.name = id
        opciones.forEach(opcion => {
            let optionElement = document.createElement("option")
            optionElement.value = opcion
            optionElement.textContent = opcion
            select.appendChild(optionElement)
        })
        return {label, select}
    }

    private selectDay(dia: string, horas: string[], minutos: string[]) {
        const div = document.createElement("div")
        const label = document.createElement("label")
        label.textContent = dia + ":";
        let dia_minusculas = dia.toLowerCase()
        div.appendChild(label)
        const div_horas = document.createElement("div")
        div_horas.classList.add("div_horas")
        div.appendChild(div_horas)

        let inicio_horas = this.crearSelect(`inicio_${dia_minusculas}_horas`, horas, "Hora en que comienza:")
        div_horas.appendChild(inicio_horas.label)
        div_horas.appendChild(inicio_horas.select)
        let inicio_minutos = this.crearSelect(`inicio_${dia_minusculas}_minutos`, minutos, ":")
        div_horas.appendChild(inicio_minutos.label)
        div_horas.appendChild(inicio_minutos.select)

        const div_horas_final = document.createElement("div")
        div_horas_final.classList.add("div_horas")
        div.appendChild(div_horas_final)

        let final_horas = this.crearSelect(`final_${dia_minusculas}_horas`, horas, "Hora en que termina:")
        div_horas_final.appendChild(final_horas.label)
        div_horas_final.appendChild(final_horas.select)
        let final_minutos = this.crearSelect(`final_${dia_minusculas}_minutos`, minutos, ":")
        div_horas_final.appendChild(final_minutos.label)
        div_horas_final.appendChild(final_minutos.select)

        return div
    }

    private handleSubmit(event: Event) {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)
        this.curso.setInfoCurso(formData.get("profesor") as string,
            parseInt(formData.get("grupo") as string),
            (formData.get("prioridad") == "Alta" ? PRIORITY.ALTA : (formData.get("prioridad") == "Media" ? PRIORITY.MEDIA : PRIORITY.BAJA)))
        if(formData.get("inicio_lunes_horas") as string != "0"){
            this.agregarHorario(DIAS.LUNES, "lunes", formData)
        }
        if(formData.get("inicio_martes_horas") as string != "0"){
            this.agregarHorario(DIAS.MARTES, "martes", formData)
        }
        if(formData.get("inicio_miercoles_horas") as string != "0"){
            this.agregarHorario(DIAS.MIERCOLES, "miercoles", formData)
        }
        if(formData.get("inicio_jueves_horas") as string != "0"){
            this.agregarHorario(DIAS.JUEVES, "jueves", formData)
        }
        if(formData.get("inicio_viernes_horas") as string != "0"){
            this.agregarHorario(DIAS.VIERNES, "viernes", formData)
        }
        form.remove()
        this.curso.mostrar()
    }

    private agregarHorario(dia : DIAS, diaString : string, formData : FormData){
        let horaInicio = parseInt(formData.get(`inicio_${diaString}_horas`) as string) + parseInt(formData.get(`inicio_${diaString}_minutos`) as string)/100
            let horaFinal = parseInt(formData.get(`final_${diaString}_horas`) as string) + parseInt(formData.get(`final_${diaString}_minutos`) as string)/100
            this.curso.agregarHorario(dia, horaInicio, horaFinal)
    }
}
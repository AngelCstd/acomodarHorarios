import { Materia } from "./Materia.js";

export class Formulario{

    private materia : Materia

    constructor(materia: Materia){
        this.materia = materia
        this.crearFormularioMateria()
    }

    private crearFormularioMateria(): void {
        // Crear el contenedor del formulario
        const container = document.createElement('div');
        container.className = 'startMateria';

        // Crear el formulario
        const form = document.createElement('form');

        // Crear la etiqueta del campo de texto
        const label = document.createElement('label');
        label.setAttribute('for', 'materia');
        label.textContent = 'Ingresa la materia:';

        // Crear el campo de texto
        const input = document.createElement('input');
        input.classList.add("input__text")
        input.type = 'text';
        input.id = 'materia';
        input.name = 'materia';
        input.placeholder = "Matematicas..."
        input.required = true;

        // Crear el botón de envío
        const button = document.createElement('button');
        button.classList.add("button")
        button.type = 'submit';
        button.textContent = 'Confirmar';

        // Agregar los elementos al formulario
        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(button);

        // Agregar el formulario al contenedor
        container.appendChild(form);

        // Agregar el contenedor al DOM
        document.getElementById('app')?.appendChild(container);

        // Añadir el evento de envío al formulario
        form.addEventListener('submit', (event)=>{this.handleSubmit(event, input.value)});
    }

    private handleSubmit(event : any, value : string){
        event.preventDefault();
        this.materia.setNameMateria(value)
        this.materia.iniciar()
        event.target.parentElement.remove()
        
    }

    public obtenerMateria() : Materia | undefined {
        return this.materia
    }
}
//addEventListener("blur", input) el evento blur captura la informacion sobre la que el usuario se encuentra modificando
export function validar (input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }
    console.log(input.parentElement);
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }
    else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}
const tipoDeErrores = [
    "valueMissing", 
    "typeMisMatch", 
    "patternMismatch", 
    "customError"];

const mensajesDeError = {
    nombre: {
        valueMissing: "este campo no puede estar vacio"
    },
    email: {
        valueMissing: "este campo no puede estar vacio",
        typeMisMatch: "Correo no valido",
    },
    password:{
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "La contraseña debe tener entre 8 a 10 caracteres con al menos una mayuscula, minuscula, numeros y uno de los siguientes caracteres especiales @, $, !, %, *, ?, &",
    },
    nacimiento: {
        valueMissing: "este campo no puede estar vacio",
        customError: "debes tener al menos 18 años",
    },
    numero: {
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX 10 Numeros",
    },
    direccion:{
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "la direccion debe tener entre 10 y 40 caracteres",
    },
    ciudad:{
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "la ciudad debe tener entre 10 y 40 caracteres",
    },
    estado:{
        valueMissing: "este campo no puede estar vacio",
        patternMismatch: "el estado debe tener entre 10 y 40 caracteres",
    },
};

const validadores = {
    nacimiento: (input)=>{validarNacimiento(input)}
}

function mostrarMensajeDeError (tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach(error=>{
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })

    return mensaje;
}

function validarNacimiento (input)
    {
        const fechaCliente = new Date(input.value);
        let mensaje = "";
        if(!mayorDeEdad(fechaCliente)){
            mensaje= "debes tener al menos 18 años";
        }
        //setCustomValidity() permite lanzar un mensaje dinamico en funcion del cumplimiento del algun parametro, en este caso la mayoria de edad
        input.setCustomValidity(mensaje)
    }
function mayorDeEdad (fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return(diferenciaFechas <= fechaActual);
}
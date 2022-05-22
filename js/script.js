const formulario = document.getElementById('formulario');   // Constante para acceder al formulario
const inputs = document.querySelectorAll('#formulario input'); // Con esto accedemos a los inputs del formulario con el IDformulario.

const expresiones = {                    // Un ''Objeto expresiones'' regulares, que nos limita que escribir y que no en cada campo.
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {   //Un objeto donde todos los campos con valor falso. 
	usuario: false, //Ya que si no rellenamos nada, al enviar nos dira que es Error.
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}

const validarFormulario = (e) => {  // Accedemos al name del input con e.target.name 
	switch (e.target.name) {       //Si accedo al name de cada caso quiero que se ejecute el codigo.
		case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario'); // Comprobamos que lo que ingresemos en el campo sea correcto
		break;														//acceciendo a expresiones de usuario , el input con evento y el campo del formulario.
		case "nombre":												//Validamos el campo pasandole esos parametros.
			validarCampo(expresiones.nombre, e.target, 'nombre'); 
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password'); 
			validarPassword2(); // Nos permite que cuando cambiemos/actualicemos la primera contraseña marque que no son iguales.
		break;
		case "password2":     // Funcion para validar campo de contraseña 2 en linea 62.
			validarPassword2();
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;
	}
}

const validarCampo = (expresion, input, campo) => { // Funcion para cuando accedemos al campo,comprueba el valor  y si  el valor es correcto
	if(expresion.test(input.value)){                // Remueve la clase de formulario incorrecto y añade la clase de formulario correcto.
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto'); // 
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-check');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-xmark');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true; //Si la expresion es valida.
	} else {                                      //En caso que lo ingresado en el campo no se correcto,se remueve la clase correcta
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');// y se añada la clase incorrecta al campo.
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-xmark');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-check');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo'); 
		campos[campo] = false; //En caso que la expresion sea falsa.
	}
}

const validarPassword2 = () => {  //Validar la confirmacion de la contraseña.
	const inputPassword1 = document.getElementById('password'); //Con la variable accedemos a los inputs de las contraseñas.
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){  //Condicional para preguntar si la contraseña es diferente al valor de contraseña 2.
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');//Accedo al grupo password2 y su lista de clase y ponerle que es incorrecto.
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');//Accedo al grupo y su lista de clases y le saco el grupo de correcto.
		document.querySelector(`#grupo__password2 i`).classList.add('fa-circle-xmark'); //Accedo al icono y agregar el icono que es incorrecto
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-circle-check');//Accedo al icono y le saco el icono que es correcto.
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');//Accedo al grupo y al grupo de input error para añadir la clase de Activo.
		campos['password'] = false;  //Si no son iguales entonces es falso.
	} else {                                         //En caso de que sean iguales ejecutar lo siguiente:
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');//Accedo al grupo password2, a su calse y remuevo la clase de incorrecto.
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');// y le agrego la de correcto
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-circle-xmark');//Accedo al icono y remuevo el icono de incorrecto para
		document.querySelector(`#grupo__password2 i`).classList.add('fa-circle-check'); // acceder y agregar el icono de correcto.
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo'); // Accedo al grupo de error y remuevo el grupo.
		campos['password'] = true;  //Si son iguales entonces es verdadero.
	}
}

inputs.forEach((input) => {    // Por cada input se ejecuta un codigo. 
	input.addEventListener('keyup', validarFormulario);// Comprobar cuando levanto la tecla que este validado lo ingresado en el campo.
	input.addEventListener('blur', validarFormulario);//
});

formulario.addEventListener('submit', (e) => {   //Creamos un evento que 
	e.preventDefault();                         // al enviar el formulario no se refresque la pagina.

	const terminos = document.getElementById('terminos');  //COMPROBAR QUE TODOS LOS CAMPOS SEAN CORRECTOS PARA PODER ENVIAR EL FORMULARIO
	if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked ){
		formulario.reset();                     //Si todos los campos del formulario son verdaderos(validados) ejectumos con formulario.reset()
						                        //para que se borren lo ingresado en el campo.
		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');//Si todo es correcto, accedemos al elemento mensaje exito y  los añade.
		setTimeout(() => {     																					//Despues de 5 segundos el mensaje de exito se eliminara.
				document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000); 
		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {   // Accedemos al grupo y por cada clase de icono, removemos el icono correcto.
			icono.classList.remove('formulario__grupo-correcto'); 
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');  //En caso que todo esto no sea correcto, accedemos al grupo
	}																								//de mensaje y su clase, para añadir el mensaje de error.
});
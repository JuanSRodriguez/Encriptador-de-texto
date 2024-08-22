const cifrar = document.getElementById('button1');
const descifrar = document.getElementById('button2');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const myImage = document.getElementById('myImage');
const myText = document.getElementById('myText');
const button3 = document.getElementById('button3');
const modal = document.getElementById("myModal");
const closeButton = document.querySelector(".close-button");
const myText1 = document.getElementById('myText1');
const instructionButton = document.querySelector('.instruction-button');
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.toggle-btn');
const hoverMessage = document.getElementById('hoverMessage');
const hoverMessage1 = document.getElementById('hoverMessage1');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const image = document.getElementById('myImage');
const image1 = document.getElementById('myImage1');
const preguntaImg = document.querySelector('.pregunta-img');
const toggleContainer = document.querySelector('.toggle-container');

const body = document.body;


let imagenVisible = true;

// Función para mostrar el sidebar
function toggleSidebar() {
    sidebar.classList.toggle('show');
    toggleBtn.classList.toggle('active');
    preguntaImg.classList.toggle('active');
    toggleContainer.classList.toggle('sidebar-visible');

    if (sidebar.classList.contains('show')) {
        document.addEventListener('click', clickOutside);
    }
}

// Función para detectar clic fuera de la sidebar y ocultarla
function clickOutside(event) {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickInsideToggleBtn = toggleBtn.contains(event.target);

    if (!isClickInsideSidebar && !isClickInsideToggleBtn) {
        sidebar.classList.remove('show');
        toggleBtn.classList.remove('active'); 
        preguntaImg.classList.remove('active');
        toggleContainer.classList.remove('sidebar-visible');
        
        document.removeEventListener('click', clickOutside);
    }
}

toggleBtn.addEventListener('click', toggleSidebar);


function mouseOver () {
    hoverMessage.textContent = 'Ayuda';
    hoverMessage.classList.add('show');
}

function mouseOut () {
    hoverMessage.classList.remove('show');
}

function mouseOverDarkMode () {
    hoverMessage1.textContent = 'Modo oscuro';
    hoverMessage1.classList.add('show');
}

function mouseOutDarkMode () {
    hoverMessage1.classList.remove('show');
}

toggleBtn.addEventListener('mouseover', mouseOver);
toggleBtn.addEventListener('mouseout', mouseOut);
preguntaImg.addEventListener('mouseover', mouseOverDarkMode);
preguntaImg.addEventListener('mouseout', mouseOutDarkMode);

// Función para cifrar el texto
function cifrarTexto (texto) {
    const rules = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    }

    return texto.replace(/[eioua]/g, (char) => {
        return rules[char];
    });
};

 
function cifrarTextoUno () {
    event.preventDefault();
    const texto = inputText.value; 

    
   
    if (texto === undefined || texto === null || texto.trim() === "") {
        showModal('Aún no ha ingresado ningún texto, por favor ingrese alguna frase o texto para poder continuar.'); // Mostrar el modal
        return; 
    }

    // Función interna para verificar acentos y mayúsculas
    function tieneAcentosOMayusculas(texto) {  
        const acentos = /[áéíóúÁÉÍÓÚàèìòùÀÈÌÒÙäëïöüÄËÏÖÜâêîôûÂÊÎÔÛãñõÃÑÕçÇ]/;
        const mayusculas = /[A-Z]/;

        return acentos.test(texto) || mayusculas.test(texto);
    }

    if (tieneAcentosOMayusculas(texto)) {
        showModal('El texto a cifrar no puede tener Mayúsculas, ni Acentos, intentalo de nuevo.'); // Mostrar el modal
        inputText.value = '';
        return; 
    }

    // Lógica para cifrar el texto si es válido
    const textoCifrado = cifrarTexto(texto); 
    myText.textContent = textoCifrado;

    // Lógica para ocultar la imagen y el texto al hacer click en desencriptar
    myImage.style.display = 'none'; 
    outputText.style.display = 'none';
    myText1.style.display = 'none';
    button3.style.display = 'inline'; 
};

button1.addEventListener('click', cifrarTextoUno);

// Función para mostrar el modal con un mensaje específico
function showModal(message) {
    const modalMessage = document.getElementById("modal-message");
    modalMessage.textContent = message;
    modal.style.display = "block"; 
}

// Evento para cerrar el modal al hacer clic en el botón de cerrar
closeButton.addEventListener("click", function() {
    modal.style.display = "none"; 
});

// Evento para cerrar el modal si el usuario hace clic fuera del contenido
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none"; 
    }
});

//Función para descifrar texto encriptado
function descifrarTexto (texto) {
    const reverseRules = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    }

    return texto.replace(/enter|imes|ai|ober|ufat/g, (reverse) => {
        return reverseRules[reverse];
    });
}

function descifrarTextoUno () {
    event.preventDefault();
    const texto = inputText.value; 

    if (texto === undefined || texto === null || texto.trim() === "") {
        showModal('Aún no ha ingresado ningún texto, por favor ingrese alguna frase o texto para poder continuar.'); // Mostrar el modal
        return; 
    }

    // Lógica para cifrar el texto si es válido
    const textoDecifrado = descifrarTexto(texto); 
    myText.textContent = textoDecifrado;

    // Lógica para ocultar la imagen y el texto al hacer click en desencriptar
    myImage.style.display = 'none'; 
    outputText.style.display = 'none';
    button3.style.display = 'inline'; 
    myText1.style.display = 'none';
}

button2.addEventListener('click', descifrarTextoUno);

// Función para copiar texto encriptado
function copyText() {
    navigator.clipboard.writeText(myText.textContent).then(() => {
        const copyMessage = document.getElementById('copyMessage');
        const texto = myText.textContent;

         // Muestra el mensaje
         copyMessage.style.display = 'block';

        if(texto.trim() === "") {
            showModal('No hay ningun texto que copiar');
        }
        
       
        
        // Función para desvanecer el mensaje
        setTimeout(() => {
            copyMessage.style.opacity = '0'; // Cambia la opacidad a 0 para desvanecer
            setTimeout(() => {
                copyMessage.style.display = 'none'; // Oculta el mensaje completamente después de que se desvanece
                copyMessage.style.opacity = '1'; // Restablece la opacidad para el próximo uso
            }, 200); // Espera el tiempo de la transición
        }, 1000); // Espera 5 segundos antes de iniciar el desvanecimiento
    });
}

button3.addEventListener('click', copyText);

// evento modo oscuro
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    toggleContainer.classList.toggle('dark-mode');
});


document.querySelector('.toggle-btn').addEventListener('click', function() {
    document.querySelector('main').classList.toggle('move-right');
    document.querySelector('footer').classList.toggle('move-right');
  });

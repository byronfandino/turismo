document.addEventListener('DOMContentLoaded', () =>{
    abrirCerrarMenu();
    abrirCerrarSubMenu();
    traduccion();
    guardarIdioma();
    botonesCambiarIdioma();
});

function abrirCerrarMenu() {
    const menu = document.querySelector('#menu'); 
    const btnAbrirMenu = document.querySelector('#btn-abrir-menu');
    const btnCerrarMenu = document.querySelector('#btn-cerrar-menu');
    
    btnAbrirMenu.addEventListener('click', () => {
        menu.classList.add('activo');
        btnAbrirMenu.setAttribute('aria-expanded', 'true');
    });

    btnCerrarMenu.addEventListener('click', () => {
        menu.classList.remove('activo');
        btnAbrirMenu.setAttribute('aria-expanded', 'false');
    });
}

function abrirCerrarSubMenu() {
    const subMenus = document.querySelectorAll('.submenu'); 
    
    subMenus.forEach(menu => {
        const itemMenu = menu.previousElementSibling;

        itemMenu.addEventListener('click', () => {
            if (menu.classList.contains('activo')) {

                menu.classList.remove('activo');
                itemMenu.setAttribute('aria-expanded', 'false');

            }else{

                //Cerrar todos los submenús que se encuentren activos
                cerrarTodosSubMenus();

                menu.classList.add('activo');
                itemMenu.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

function cerrarTodosSubMenus(){
    const subMenus = document.querySelectorAll('.submenu.activo');
    subMenus.forEach(subMenu => {
        
        const itemMenu = subMenu.previousElementSibling;
        console.log(itemMenu);

        subMenu.classList.remove('activo');
        itemMenu.setAttribute('aria-expanded', 'false');
    })
}

function traduccion(lang = 'es') {

    const currentPath = window.location.pathname;
    const depth = currentPath.split('/').length - 2;
    const prefix = "../".repeat(depth);

    const jsonPath = `${prefix}lang/${lang}.json`;

    fetch(jsonPath)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Error cargando JSON: ${jsonPath}`);
            }
            return res.json();
        })
        .then(lang_json => {

            const elementos = document.querySelectorAll('[data-lang]');

            elementos.forEach(etiqueta => {
                const key = etiqueta.getAttribute('data-lang');
                const partes = key.split('.');

                let valor = lang_json;

                for (let parte of partes) {
                    valor = valor?.[parte];
                }

                etiqueta.textContent = valor ?? `[Sin traducción: ${key}]`;
            });
        })
        .catch(error => {
            console.error('Error en traducción:', error);
        });
}

function guardarIdioma() {
     // 1. Verificar si hay idioma guardado
    const idiomaGuardado = localStorage.getItem('idioma');
    const btn_es = document.getElementById('btn-es');
    const btn_en = document.getElementById('btn-en');

    // 2. Si existe, cargarlo. Si no, cargar español
    if (idiomaGuardado) {
        traduccion(idiomaGuardado);
        if (idiomaGuardado === 'es') {
            btn_es.classList.add('activo');
            btn_en.classList.remove('activo');
        } else if (idiomaGuardado === 'en') {
            btn_en.classList.add('activo');
            btn_es.classList.remove('activo');
        }
    } else {
        traduccion('es');
        localStorage.setItem('idioma', 'es'); // guardar idioma por defecto
        btn_es.classList.add('activo');
        btn_en.classList.remove('activo');
    }
}

function botonesCambiarIdioma() {
    btn_es = document.getElementById('btn-es');
    btn_en = document.getElementById('btn-en');

    btn_es.addEventListener('click', () => {
        traduccion('es');
        localStorage.setItem('idioma', 'es');
        btn_es.classList.add('activo');
        btn_en.classList.remove('activo');
    });

    btn_en.addEventListener('click', () => {
        traduccion('en');
        localStorage.setItem('idioma', 'en');
        btn_en.classList.add('activo');
        btn_es.classList.remove('activo');
    });
}

const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.btn-prev');
const nextBtn = document.querySelector('.btn-next');
const indicadores = document.querySelector('.indicadores');

let index = 0;
const total = slide.length;
let intervalo;

// Crear indicadores dinámicos
for (let i = 0; i < total; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('activo');
    dot.dataset.id = i;
    indicadores.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');

// Mostrar slide actual
function mostrarSlide() {
    slides.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove('activo'));
    dots[index].classList.add('activo');
}

// Siguiente
function siguiente() {
    index = (index + 1) % total;
    mostrarSlide();
    reiniciarAuto();
}

// Anterior
function anterior() {
    index = (index - 1 + total) % total;
    mostrarSlide();
    reiniciarAuto();
}

// Auto deslizar
function autoplay() {
    intervalo = setInterval(siguiente, 4000);
}

function reiniciarAuto() {
    clearInterval(intervalo);
    autoplay();
}

// Eventos
nextBtn.addEventListener('click', siguiente);
prevBtn.addEventListener('click', anterior);

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        index = parseInt(e.target.dataset.id);
        mostrarSlide();
        reiniciarAuto();
    });
});

// Iniciar carrusel
autoplay();

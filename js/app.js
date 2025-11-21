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
    fetch(`/lang/${lang}.json`)
        .then(res => {

            if (!res.ok) {
                throw new Error(`Error HTTP: ${res.status}`);
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
                    valor = valor[parte];
                }

                if(valor !== undefined){
                    etiqueta.textContent = valor;
                }else{
                    etiqueta.textContent = `[Sin traducción: ${key}]`;
                }
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
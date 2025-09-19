document.addEventListener('DOMContentLoaded', () =>{
    abrirCerrarMenu();
    abrirCerrarSubMenu();
})

function abrirCerrarMenu() {
    const menu = document.querySelector('#menu'); 
    const btnAbrirMenu = document.querySelector('#btn-abrir-menu');
    const btnCerrarMenu = document.querySelector('#btn-cerrar-menu');
    
    btnAbrirMenu.addEventListener('click', () => {
        menu.classList.add('activo');
    });

    btnCerrarMenu.addEventListener('click', () => {
        menu.classList.remove('activo')
    })
}

function abrirCerrarSubMenu() {
    const subMenus = document.querySelectorAll('.submenu'); 
    
    subMenus.forEach(menu => {
        const itemMenu = menu.previousElementSibling;
        itemMenu.addEventListener('click', () => {
            if (menu.classList.contains('activo')) {
                menu.classList.remove('activo');
            } else {
                menu.classList.add('activo');
            }
        });
    });
}
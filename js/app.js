document.addEventListener('DOMContentLoaded', () =>{
    abrirCerrarMenu();
    abrirCerrarSubMenu();
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

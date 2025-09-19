document.addEventListener('DOMContentLoaded', () =>{
    
    const menu = document.querySelector('#menu'); 
    const btnAbrirMenu = document.querySelector('#btn-abrir-menu');
    const btnCerrarMenu = document.querySelector('#btn-cerrar-menu');
    
    btnAbrirMenu.addEventListener('click', () => {
        menu.classList.add('activo');
    });

    btnCerrarMenu.addEventListener('click', () => {
        menu.classList.remove('activo')
    })

})
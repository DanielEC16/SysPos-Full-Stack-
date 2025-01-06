const btnMenu = document.querySelector(".btn-menu");
const buttonLeftRight = document.querySelector(".btn-menu .fa-solid");
// Un addEventListener en este contexto es una acción que ocurre en el DOM (Modelo de Objetos del Documento), como hacer clic en un botón, pasar el ratón sobre un elemento, enviar un formulario, etc.
btnMenu.addEventListener("click", () => {
  // toggle() : Método que se utiliza para alternar la presencia de una clase en el conjunto de clases del elemento.
  
  buttonLeftRight.classList.toggle("fa-circle-chevron-left");
  buttonLeftRight.classList.toggle("fa-circle-chevron-right");
  
  document.querySelector(".ds-left-menu").classList.toggle("menu-active");
  document.querySelector(".ds-panel").classList.toggle("tab-menu");
});


(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


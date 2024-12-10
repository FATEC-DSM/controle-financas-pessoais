function renderAlerta() {
  document.querySelector('body').innerHTML += `
    <style>
    .alerta {
      position: absolute !important;
      top: 20px;
      right: 25px;
      opacity: 0;
      transition: all ease .3s;
    }

    .alerta.is-active {
      opacity: 1;
    }
    </style>

    <div data-item="alerta" class="alert alert-warning alerta" role="alert">
    </div>
  `
}
renderAlerta()

function showAlerta(mensagem, status) {
  const container = document.querySelector('[data-item="alerta"]')
  container.classList.toggle('is-active')

  if (status) {
    container.classList.replace('alert-warning', status)
  }

  container.innerHTML = mensagem

  setTimeout(() => {
    container.classList.toggle('is-active')
    container.innerHTML = ''
  }, 3000)
}

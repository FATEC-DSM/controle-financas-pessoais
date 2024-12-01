async function enviarForm(event) {
  event.preventDefault()

  const formData = new FormData(event.target)

  const email = formData.get('email')
  const senha = formData.get('senha')

  try {
    const headers = new Headers({
      'Content-Type': 'application/json',
    })

    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, password: senha }),
    })

    const data = await response.json()

    if (data.message) showAlerta(data.message)
    console.log(data)
    guardarSessao(data.body)

    if (data.ok) {
      window.location = '/'
    }
  } catch (error) {
    console.error(error)
  }
}

function showAlerta(mensagem) {
  const containerLogin = document.querySelector('[data-item="alerta"]')
  containerLogin.classList.toggle('is-active')
  containerLogin.innerHTML = mensagem

  setTimeout(() => {
    containerLogin.classList.toggle('is-active')
    containerLogin.innerHTML = ''
  }, 3000)
}

function guardarSessao(dados) {
  //paliativo enquanto o controle de sessão não estiver maduro
  window.localStorage.setItem(
    'sessao',
    JSON.stringify({ email: dados.email, createdAt: new Date().getTime() })
  )
}

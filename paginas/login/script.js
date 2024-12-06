async function enviarForm(event) {
  event.preventDefault()

  const formData = new FormData(event.target)

  const email = formData.get('email')
  const senha = formData.get('senha')

  try {
    const headers = new Headers({
      'Content-Type': 'application/json',
    })

    const response = await fetch(
      'https://backend-controle-financas-pessoais.vercel.app/login',
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ email, password: senha }),
      }
    )

    const data = await response.json()

    if (data.message) showAlerta(data.message)
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
  window.localStorage.setItem(
    'sessao',
    JSON.stringify({
      user: dados.Id_user,
      email: dados.Email,
      createdAt: new Date().getTime(),
    })
  )
}

async function enviarForm(event) {
  event.preventDefault()

  const formData = new FormData(event.target)

  const email = formData.get('email')
  const senha = formData.get('senha')

  console.log(email, senha)

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

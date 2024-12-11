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

function guardarSessao(dados) {
  window.localStorage.setItem(
    'sessao',
    JSON.stringify({
      user: dados.Id_user,
      email: dados.Email,
      nome: dados.Name,
      createdAt: new Date().getTime(),
    })
  )
}

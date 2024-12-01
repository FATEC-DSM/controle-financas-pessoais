async function enviarForm(event) {
  event.preventDefault()

  const formData = new FormData(event.target)

  const primeiroNome = formData.get('p-nome')
  const ultimoNome = formData.get('u-nome')
  const email = formData.get('email')
  const senha = formData.get('senha')
  const confirmacaoSenha = formData.get('conf-senha')

  const senhasDiferentes = senha !== confirmacaoSenha

  if (senhasDiferentes) {
    const confSenha = document.getElementById('conf-senha')
    confSenha.focus()
    showAlerta('As senhas estão diferentes!')
    return
  }

  try {
    const headers = new Headers({
      'Content-Type': 'application/json',
    })

    const response = await fetch('http://localhost:8080/create-user', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        name: primeiroNome,
        lastName: ultimoNome,
        email,
        password: senha,
      }),
    })

    const data = await response.json()

    if (data.message) showAlerta(data.message)
  } catch (error) {
    console.error(error)
  }
}

function showAlerta(mensagem) {
  const success = mensagem === 'Usuário cadastrado'
  const containerLogin = document.querySelector('[data-item="alerta"]')

  if (success) {
    containerLogin.classList.replace('alert-warning', 'alert-success')
  }

  containerLogin.classList.toggle('is-active')
  containerLogin.innerHTML = mensagem

  setTimeout(() => {
    containerLogin.classList.toggle('is-active')
    containerLogin.innerHTML = ''

    if (success) {
      window.location.href = '/paginas/login'
    }
  }, 3000)
}

function verSenha(event, primeiraSenha) {
  let a, i
  if (primeiraSenha) {
    a = document.querySelector('#senha')
    i = document.querySelector('#i-senha')
  } else {
    a = document.querySelector('#conf-senha')
    i = document.querySelector('#i-conf-senha')
  }

  if (a.type == 'text') {
    a.type = 'password'
    i.name = 'eye-outline'
  } else {
    i.name = 'eye-off-outline'
    a.type = 'text'
  }
}

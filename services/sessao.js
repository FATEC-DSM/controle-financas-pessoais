let item = window.localStorage.getItem('sessao')

if (item) {
  item = JSON.parse(item)

  const umDiaEmMilisegundos = 86400000
  const tempoLimite = new Date(item.createdAt + umDiaEmMilisegundos).getTime()

  const hoje = new Date().getTime()

  if (hoje >= tempoLimite) {
    window.localStorage.removeItem('sessao')
    window.location.href = '/paginas/login'
  }
} else {
  window.location.href = '/paginas/login'
}

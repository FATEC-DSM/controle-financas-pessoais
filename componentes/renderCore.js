function renderCore() {
  let sessao = window.localStorage.getItem('sessao')

  sessao = JSON.parse(sessao)

  document.querySelector('body').innerHTML = `
      <input type="checkbox" id="check">
      <!-- header começo -->
      <header>
        <div class="left">
          <label for="check">
            <ion-icon name="menu-outline" id="sidebar-btn"></ion-icon>
          </label>
          <h3>Dinheirize</span></h3>
        </div>
        <a href="#" class="btn btn-danger" onclick="sair()">Sair</a>
      </header>
      <!-- header final -->
      <!-- inicio sidebar -->
      <div class="sidebar">
        <div class="cabecalho-sidebar p-3">
          <h2>Bem vindo(a) ${sessao.nome}</h2>
        </div>
        <div class="opcoes-sidebar">
          <a href="/index.html"><ion-icon name="home-outline"></ion-icon><span>Home</span></a>
          <a href="/paginas/categoria"><ion-icon name="bar-chart-outline"></ion-icon><span> Categoria </span></a>
        </div>
      </div>
    `
}
renderCore()

function sair() {
  const confirm = window.confirm('Tem certeza que deseja sair?')

  if (confirm) {
    window.localStorage.removeItem('sessao')
    window.location.href = '/'
  }
}

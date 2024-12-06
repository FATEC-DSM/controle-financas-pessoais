function renderCore() {
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
        <div class="right">
          <a href="#" class="sair-btn" onclick="window.localStorage.removeItem('sessao')">Sair</a>
        </div>
      </header>
      <!-- header final -->
      <!-- inicio sidebar -->
      <div class="sidebar">
        <div class="cabecalho-sidebar">
          <img src="/img/foto-perfil.jpg" class="image" alt="Foto de perfil">
          <h2>Mario</h2>
        </div>
        <div class="opcoes-sidebar">
          <a href="/index.html"><ion-icon name="home-outline"></ion-icon><span>Home</span></a>
          <a href="/paginas/metas.html"><ion-icon name="rocket-outline"></ion-icon></ion-icon><span>Metas</span></a>
          <a href="#"><ion-icon name="wallet-outline"></ion-icon><span>Fluxo de caixa</span></a>
          <a href="#"><ion-icon name="bar-chart-outline"></ion-icon><span>Relatório</span></a>
          <a href="/paginas/categoria.html"><ion-icon name="bar-chart-outline"></ion-icon><span> Categoria </span></a>
        </div>
      </div>
    `
}
renderCore()

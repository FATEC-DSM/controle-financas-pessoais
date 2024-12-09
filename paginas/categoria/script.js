window.onload = carregarCategorias

let sessao = window.localStorage.getItem('sessao')
sessao = JSON.parse(sessao)

const idUsuario = sessao.user

async function carregarCategorias() {
  try {
    const response = await fetch(
      `http://localhost:8080/categories/${idUsuario}`
    )

    const json = await response.json()

    if (!json.body.categories.length) {
      return renderPrimeiraCategoria()
    }

    renderCategorias(json.body.categories)
  } catch (error) {
    console.error(error)
  }
}

async function criarCategoria(event) {
  event.preventDefault()

  const formData = new FormData(event.target)

  const nome = formData.get('nome')
  const descricao = formData.get('descricao')

  const headers = new Headers({
    'Content-Type': 'application/json',
  })

  const response = await fetch(`http://localhost:8080/categories`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      userId: idUsuario,
      name: nome,
      description: descricao,
    }),
  })

  const json = await response.json()

  if (json.status === 201) {
    window.alert('Transação criada')

    window.querySelector('body').classList.toggle('modal-open')
    carregarCategorias()
  }
}

async function renderCategorias(categorias) {
  document.querySelector('main').innerHTML = `
    <h2>Categorias</h2>  
    <div>
      <button type="button" onclick="mostraModalMetas()" id="#modalMetas" class="btn btn-primary" data-bs-toggle="modal"
        data-bs-target="#modalMetas">
        Nova categoria
      </button>
    </div>
    <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nome</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>

    ${categorias.map(
      (categoria, i) => `
        <tr>
          <td>${i}</td>
          <td>${categoria.Name}</td>
          <td>${categoria.Description}</td>
        </tr>
      `
    )}
    </tbody>
  </table>
  `
  renderModalCategoria()
}

function renderPrimeiraCategoria() {
  document.querySelector('main').innerHTML = `
    <div class="main-left">
      <h3> Crie uma categoria para suas atividades </h3>
      <p> Essa categoria nada mais é do que o tipo da sua meta. Por exemplo, um passeio pela praia pode ser categorizado
        como uma viagem, a compra de um tênis se encaixa na categoria de roupas, já guardar dinheiro para segurança
        financeira pode ser classificado como organização financeira e assim por diante.</p>
      <button type="button" onclick="mostraModalMetas()" id="#modalMetas" class="btn btn-primary" data-bs-toggle="modal"
        data-bs-target="#modalMetas">
        CRIAR CATEGORIA
      </button>
    </div>
    <div class="main-right">
      <img src="../../img/categoria.jpg" alt="Imagem de um homem pensando">
    </div>
  `
  renderModalCategoria()
}

function renderModalCategoria() {
  document.querySelector('[data-place="modal"]').innerHTML += `
    <!-- Modal -->
    <div class="modal-body">
      <div class="modal fade" id="modalMetas" tabindex="-1" aria-labelledby="modalMetasLabel" aria-hidden="true">
        <div class="modal-dialog">
          <form class="modal-content" onsubmit="criarCategoria(event)">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="modalMetasLabel"> Categoria </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
              <label for="name-meta" class="form-label"> Nome </label>
              <input type="text" name="nome" class="form-control" id="name-meta">

              <label for="" class="form-label"> Descrição </label>
              <input type="text" name="descricao" class="form-control" id="descricao-meta">
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"> Cancelar </button>
              <button type="submit" class="btn btn-primary"> Salvar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
}

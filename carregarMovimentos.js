window.onload = carregarMovimentos

async function carregarMovimentos() {
  try {
    let sessao = window.localStorage.getItem('sessao')
    sessao = JSON.parse(sessao)

    let id = sessao.user

    renderCarregando()

    const b = 'https://backend-controle-financas-pessoais.vercel.app'
    const a = 'http://localhost:8080'

    let hoje = new Date().toISOString().split('T')[0]

    const filtro = new URLSearchParams({
      minDate: '1970-01-01',
      maxDate: hoje,
    }).toString()

    const response = await fetch(`${a}/transactions/${id}?${filtro}`)

    const json = await response.json()

    if (!json.body.transactions.length) {
      return renderPrimeiraTransacao()
    }

    renderTransacoes(json.body.transactions)
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

function renderModalTransacao() {
  const main = document.querySelector('main')

  main.innerHTML += `
    <div class="modal-body">
    <div class="modal fade" id="modalTransacao" tabindex="-1" aria-labelledby="modalMetasLabel" aria-hidden="true">
      <div class="modal-dialog">
        <form class="modal-content" onsubmit="criarTransacao(event)">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="modalMetasLabel"> Transações </h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <label for="t-data" class="form-label"> Data </label>
            <input type="date" class="form-control" id="t-data" required>

            <label for="t-descricao" class="form-label"> Descrição </label>
            <input type="text" class="form-control" id="t-descricao" required>

            <label for="t-valor" class="form-label"> Valor da meta </label>
            <input type="number" class="form-control" id="t-valor" required>

            <label for="t-tipo" class="form-label"> Tipo </label>
            <select id="t-tipo" class="form-select form-select-sm" aria-label=".form-select-sm example" required>
              <option value="1" selected> Entrada</option>
              <option value="2"> Saída</option>
            </select>

            <label for="t-categoria" class="form-label"> Categoria </label>
            <select id="t-categoria" class="form-select form-select-sm" aria-label=".form-select-sm example" required>
              <option selected> ... </option>
              <option value="1"> Carro </option>
              <option value="2"> Casa </option>
              <option value="3"> Financeira </option>
            </select>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"> Cancelar</button>
            <button type="submit" class="btn btn-success"> Criar </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  `
}

async function criarTransacao(event) {
  event.preventDefault()

  const descricao = document.querySelector('#t-descricao').value
  const valor = document.querySelector('#t-valor').value
  const data = document.querySelector('#t-data').value
  const tipo = document.querySelector('#t-tipo').value
  const categoria = document.querySelector('#t-categoria').value

  let sessao = window.localStorage.getItem('sessao')
  sessao = JSON.parse(sessao)

  let id = sessao.user

  console.log(id, categoria, tipo, valor, data, descricao)

  try {
    const headers = new Headers({
      'Content-Type': 'application/json',
    })

    const response = await fetch(
      'https://backend-controle-financas-pessoais.vercel.app/transactions',
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          userId: String(id),
          categoryId: categoria,
          type: tipo,
          amount: valor,
          date: data,
          description: descricao,
        }),
      }
    )

    const json = await response.json()

    if (json.status === 201) {
      showAlerta('Transação criada')
    }
  } catch (error) {
    console.error(error)
  }
}

function renderPrimeiraTransacao() {
  document.querySelector('main').innerHTML = `
    <div>
      <h2>Crie a sua primeira transação</h2>
      <p>
        Aqui, sua saúde financeira é prioridade. O Dinherize é a ferramenta ideal para quem quer entender melhor seus
        gastos e alcançar o controle financeiro de forma simples e inteligente. Nossa plataforma organiza suas despesas,
        identifica padrões e oferece insights personalizados para otimizar sua vida financeira.
      </p>
      <p>
        Com o Dinherize, você transforma números em ações que fazem a diferença. Comece hoje mesmo a planejar,
        economizar e realizar seus objetivos.
      </p>
      <p>Dinherize: seu dinheiro, suas escolhas, sua evolução!</p>
    </div>
    <button class="btn btn-primary" onclick="criarTransacao()" data-bs-toggle="modal"
      data-bs-target="#modalTransacao">Criar
      a minha primeira transação
    </button>
    `
  renderModalTransacao()
}

function renderCarregando() {
  document.querySelector('main').innerHTML = `
    <div class="d-flex justify-content-center align-items-center">
      <div class="spinner-border me-3" role="status"></div>
      <span class="sr-only">Carregando movimentações...</span>
    </div>
  `
}

async function renderTransacoes(transacoes) {
  document.querySelector('main').innerHTML = `
    <div>
      <button type="button" onclick="mostraModalMetas()" id="#modalMetas" class="btn btn-primary" data-bs-toggle="modal"
        data-bs-target="#modalMetas">
        CRIAR CATEGORIA
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
          <td>${categoria.Description}</td>
          <td>${categoria.Name}</td>
        </tr>
      `
    )}
    </tbody>
  </table>
  `
  renderModalCategoria()
}

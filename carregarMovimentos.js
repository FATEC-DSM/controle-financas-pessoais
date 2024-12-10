window.onload = carregarMovimentos

let categorias

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
    const responseCategorias = await fetch(`${a}/categories/${id}`)

    const json = await response.json()
    const jsonCategorias = await responseCategorias.json()

    categorias = jsonCategorias.body.categories

    if (!json.body.transactions.length) {
      return renderPrimeiraTransacao()
    }

    renderTransacoes(json.body.transactions)
    renderModalTransacao()
  } catch (error) {
    console.error(error)
  }
}

function renderModalTransacao(categorias) {
  document.querySelector('[data-place="modal"]').innerHTML += `
    <div class="modal-body">
    <div class="modal fade" id="modalTransacao" tabindex="-1" aria-labelledby="modalMetasLabel" aria-hidden="true">
      <div class="modal-dialog">
        ${formNovaTransacao()}
      </div>
    </div>
  </div>
  `
}

function formNovaTransacao() {
  return `
    <form class="modal-content p-3" onsubmit="criarTransacao(event)">
      <label for="t-descricao" class="form-label mt-2"> Descrição </label>
      <input type="text" class="form-control" id="t-descricao" required>

      <div class="d-flex mt-2">
        <div class="flex-grow-1">
          <label for="t-valor" class="form-label"> Valor </label>
          <input type="number" class="form-control" id="t-valor" required>
        </div>
        <div class="ms-2 flex-grow-1">
          <label for="t-data" class="form-label"> Data </label>
          <input type="date" max="${dataMaxima()}" class="form-control" id="t-data" required>
        </div>
      </div>

      <label for="t-tipo" class="form-label mt-2"> Tipo </label>
      <select id="t-tipo" class="form-select form-select-sm" aria-label=".form-select-sm example" required>
        <option value="1" selected>Saída</option>
        <option value="2">Entrada</option>
      </select>

      <label for="t-categoria" class="form-label"> Categoria </label>
      <select id="t-categoria" class="form-select form-select-sm" aria-label=".form-select-sm example" required>
        ${categorias.map(
          categoria =>
            `<option value="${categoria.Id_category}">${categoria.Name}</option>`
        )}
      </select>

      <div class="modal-footer mt-2">
        <button type="submit" class="btn btn-success px-4">Criar</button>
      </div>
    </form>`
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

  try {
    const headers = new Headers({
      'Content-Type': 'application/json',
    })

    const b = 'https://backend-controle-financas-pessoais.vercel.app'
    const a = 'http://localhost:8080'

    const response = await fetch(a + '/transactions', {
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
    })

    const json = await response.json()

    if (json.status === 201) {
      showAlerta('Transação criada', 'alert-success')
    }

    document.querySelector('body').classList.remove('modal-open')
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

      ${formNovaTransacao()}
    </div>
  `
}

function renderCarregando() {
  document.querySelector('main').innerHTML = `
    <div class="d-flex justify-content-center align-items-center">
      <div class="spinner-border me-3" role="status"></div>
      <span class="sr-only">Carregando movimentações...</span>
    </div>
  `
}

function formatarData(data) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
  }).format(data)
}

function formatarValorMonetario(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

function dataMaxima() {
  const hoje = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
  }).format()

  const [dia, mes, ano] = hoje.split('/')

  return `${ano}-${mes}-${dia}`
}

async function renderTransacoes(transacoes) {
  document.querySelector('main').innerHTML = `
    <h2>Transações</h2>  

    <div>
      <button type="button" id="#modalTransacao" class="btn btn-primary" data-bs-toggle="modal"
        data-bs-target="#modalTransacao">
        Nova transação
      </button>
    </div>
    <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Tipo</th>
        <th scope="col">Categoria</th>
        <th scope="col">Valor</th>
        <th scope="col">Data</th>
        <th scope="col">Descrição</th>
      </tr>
    </thead>
    <tbody>

    ${transacoes.map(
      (t, i) => `
        <tr>
          <td>${i}</td>
          <td>${t.Type}</td>
          <td>${t.Name_category}</td>
          <td>${formatarValorMonetario(t.Amount)}</td>
          <td>${formatarData(new Date(t.Transaction_date))}</td>
          <td>${t.Description}</td>
        </tr>
      `
    )}
    </tbody>
  </table>
  `
}

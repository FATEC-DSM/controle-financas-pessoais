// window.onload = carregarMovimentos

async function carregarMovimentos() {
  try {
    let sessao = window.localStorage.getItem('sessao')
    sessao = JSON.stringify(sessao)

    let id = sessao.user

    const response = await fetch(
      `https://backend-controle-financas-pessoais.vercel.app/transactions/${id}`
    )

    const { transactions } = await response.json()

    if (!transactions.length) {
    }
  } catch (error) {
    showAlerta('Não foi possível carregar as transações')
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

function modalTransacao() {
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
modalTransacao()

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

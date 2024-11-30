import { URL } from './api'

export class Autenticacao {
  constructor(email, senha) {
    this.email = email
    this.senha = senha
  }

  async auth() {
    const headers = new Headers({
      'Content-Type': 'application/json',
    })

    const response = await fetch(URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, password: senha }),
    })

    return await response.json()
  }
}

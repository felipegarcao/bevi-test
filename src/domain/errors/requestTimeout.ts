export class RequestTimeoutError extends Error {
  constructor() {
    super("Tempo máximo de requisição excedido.")
  }
}
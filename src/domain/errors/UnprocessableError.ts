export class UnprocessableError extends Error {
  constructor(apiMessage = "Não há produtos a serem listados.") {
    super(apiMessage)
  }
}
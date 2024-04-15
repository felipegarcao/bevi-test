export class NoContentError extends Error {
  constructor() {
    super("CPF não cadastrado em nosso sistema.")
  }
}
export class UnprocessableError extends Error {
  constructor(apiMessage?: string) {
    super(apiMessage)
  }
}
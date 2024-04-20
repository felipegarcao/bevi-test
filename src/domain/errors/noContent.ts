export class NoContentError extends Error {
  constructor(apiMessage?: string) {
    super(apiMessage)
  }
}
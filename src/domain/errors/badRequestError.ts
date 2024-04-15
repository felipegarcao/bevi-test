export class BadRequestError extends Error {
  constructor(apiMessage: string) {
    super(apiMessage)
  }
}
export class UnauthorizedError extends Error {
   constructor(apiMessage?: string) {
    super(apiMessage)
  }
}
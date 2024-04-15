export class UnauthorizedError extends Error {
  constructor() {
    super("Seu token expirou, efetue login novamente.")
  }
}
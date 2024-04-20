export class PermissionGateError extends Error {
  constructor(apiMessage?: string) {
    super(apiMessage)
  }
}
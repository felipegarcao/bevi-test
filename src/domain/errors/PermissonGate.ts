export class PermissionGateError extends Error {
  constructor() {
    super("Obrigatório informar permissão no componente Permission.")
  }
}
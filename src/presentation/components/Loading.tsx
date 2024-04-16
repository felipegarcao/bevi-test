export function Loading() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center gap-2">
      <div className="spinner-border" role="status"></div>
      <span>Carregando...</span>
    </div>
  );
}

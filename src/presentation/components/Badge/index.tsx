import { STATUS } from "@/domain/models/product";
import './styles.scss'

export function Badge({status}: { status: STATUS }) {
  // Array contendo os detalhes de cada status
  const statusDetails = [
    { id: 1, name: "em Estoque", className: " success" },
    { id: 2, name: "em Reposição", className: "warning" },
    { id: 3, name: "em Falta", className: " danger" }
  ];

  // Encontre os detalhes do status com base no enum recebido
  const selectedStatus = statusDetails.find(item => item.id === status);

  // Se não encontrar o status correspondente, retorne null ou lide com isso de outra forma
  if (!selectedStatus) {
    return null; 
  }

  // Renderize o componente Badge com base no status selecionado
  return (
    <span className={`flag ${selectedStatus.className}`}>
      {selectedStatus.name}
    </span>
  );
}
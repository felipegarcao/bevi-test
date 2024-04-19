import { STATUS } from "@/domain/models/product";
import './styles.scss'

export function Badge({status}: { status: STATUS }) {

  const statusDetails = [
    { id: 1, name: "em Estoque", className: " success" },
    { id: 2, name: "em Reposição", className: "warning" },
    { id: 3, name: "em Falta", className: " danger" }
  ];


  const selectedStatus = statusDetails.find(item => item.id === status);

  if (!selectedStatus) {
    return null; 
  }

  return (
    <span className={`flag ${selectedStatus.className}`} >
      {selectedStatus.name}
    </span>
  );
}
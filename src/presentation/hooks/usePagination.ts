import {useState} from 'react'

export function usePagination(data: any, itemsPerPage: number){
  const [currentPage, setCurrentPage] = useState(1);

  // Calcula o número total de páginas com base na quantidade de itens e itens por página
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Calcula o índice inicial e final dos itens a serem exibidos na página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filtra os dados para exibir apenas os itens da página atual
  const currentPageData = data.slice(startIndex, endIndex);


  // Função para mudar de página
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }

    // window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    currentPage,
    handlePageChange,
    currentPageData,
    totalPages,
  }
}
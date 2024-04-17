export function formattedBRL(price: number) {
  const priceFormatted = price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  return priceFormatted
}
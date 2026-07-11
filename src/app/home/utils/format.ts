export function formatPrice(
  amount: number,
  priceUnit?: "once" | "/mo",
): string {
  const formatted = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return priceUnit === "/mo" ? `${formatted}/mo` : formatted;
}

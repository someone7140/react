import React from "react";

import { getDateStrSaleDisplay } from "../../../services/common/DateService";

export default function PriceDisplayComponent(prop) {
  const sale = prop.sale;
  const price = prop.price;

  function isSale() {
    if (!sale || !sale.sale_price) {
      return false;
    }
    const now = new Date();
    const startDate = new Date(sale.start_date);
    const endDate = new Date(sale.end_date);

    return startDate <= now && endDate >= now;
  }

  return (
    <>
      {isSale() && (
        <>
          <span
            style={{
              color: "red",
              fontWeight: "bold",
              fontSize: prop.salePriceFontSize,
            }}
          >
            {sale.sale_price?.toLocaleString()}
          </span>
          円 &nbsp;
          <br />
          <span style={{ textDecoration: "line-through" }}>
            <span style={{ color: "gray" }}>{price?.toLocaleString()}円</span>
          </span>
          {prop.suffix ?? ""}
          <br />
          <span>{getDateStrSaleDisplay(sale.end_date)}まで</span>
        </>
      )}
      {!isSale() && (
        <>
          {price?.toLocaleString()}円 {prop.suffix ?? ""}
        </>
      )}
    </>
  );
}

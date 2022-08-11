import React from "react";

export const CODA_LINE_URL = "https://line.me/R/ti/p/%40165mnifu";

export default function LineAccountLink() {
  return (
    <>
      <a href={CODA_LINE_URL} target="_blank">
        CODA公式LINE
      </a>
    </>
  );
}

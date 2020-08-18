const aryMax = function (a, b) {
  return Math.max(a, b);
};

const aryMin = function (a, b) {
  return Math.min(a, b);
};

// APIで取得した感染者情報のY軸表示
export function getDisplayCaseYAxisTicks(inputCases) {
  const displaySet = new Set([
    0,
    getDisplayYAxis(
      inputCases
        .map((c) => {
          return c.deaths;
        })
        .reduce(aryMax)
    ),
    getDisplayYAxis(
      inputCases
        .map((c) => {
          return c.discharge;
        })
        .reduce(aryMax)
    ),
    getDisplayYAxis(
      inputCases
        .map((c) => {
          return c.cases;
        })
        .reduce(aryMax)
    ),
  ]);
  return Array.from(displaySet).sort((a, b) => a - b);
}

// APIで取得したPCR情報のY軸表示
export function getDisplayPcrYAxisTicks(inputCases) {
  const displaySet = new Set([
    0,
    getDisplayYAxis(
      inputCases
        .map((c) => {
          return c.pcr;
        })
        .reduce(aryMax)
    ),
    getDisplayYAxis(
      inputCases
        .map((c) => {
          return c.pcr;
        })
        .reduce(aryMin)
    ),
  ]);
  return Array.from(displaySet).sort((a, b) => a - b);
}

// APIで取得した症状者数情報のY軸表示
export function getDisplayTreatmentDataYAxisTicks(inputTreatments) {
  const displaySet = new Set([
    0,
    getDisplayYAxis(
      inputTreatments
        .map((t) => {
          return t.hospitalize;
        })
        .reduce(aryMax)
    ),
    getDisplayYAxis(
      inputTreatments
        .map((t) => {
          return t.severe;
        })
        .reduce(aryMax)
    ),
    getDisplayYAxis(
      inputTreatments
        .map((t) => {
          return t.symptom_confirming;
        })
        .reduce(aryMax)
    ),
  ]);
  return Array.from(displaySet).sort((a, b) => a - b);
}

// 桁数からY軸に表示する値を取得
function getDisplayYAxis(num) {
  const count = String(num).length;
  const keta = Math.pow(10, count - 1);
  return Math.floor(num / keta) * keta + keta;
}

// X軸に表示する日付（MM/DD形式）
export function getDisplayDateXAxis(dateLong) {
  const dateStr = String(dateLong);
  return dateStr.substring(4, 6) + "/" + dateStr.substring(6);
}

// APIで取得した人口を表示用にして返す
export function getDisplayPopulation(population) {
  return Math.floor(population / 10000);
}

// パーセンテージを取得
export function getPercentage(numerator, denominator) {
  // 小数点第1位まで残す
  return Math.floor((numerator / denominator) * 1000) / 10;
}

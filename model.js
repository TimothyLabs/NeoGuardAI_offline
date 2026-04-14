function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function predictRisk(data) {
  let score = -1.5;
  let factors = [];

  if (data.birthweight < 2500) {
    score += 1.2;
    factors.push("Low birth weight (less than 2500g)");
  }

  if (data.anc < 4) {
    score += 0.8;
    factors.push("Inadequate ANC visits (less than 4 times)");
  }

  if (data.delivery === "Home") {
    score += 0.6;
    factors.push("Home delivery");
  }

  if (data.multiple === "Yes") {
    score += 0.7;
    factors.push("Multiple birth");
  }

  if (data.age > 35) {
    score += 0.3;
    factors.push("Advanced maternal age (greater than 35 years)");
  }

  const prob = sigmoid(score);

  let recommendation = "";

  if (prob >= 0.7) {
    recommendation =
      "Immediate referral and continuous neonatal monitoring required.";
  } else if (prob >= 0.4) {
    recommendation = "Close monitoring and frequent ANC follow-up recommended.";
  } else {
    recommendation = "Routine neonatal care is sufficient.";
  }

  return {
    prob,
    factors,
    recommendation,
  };
}

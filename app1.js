function predict() {
  const data = {
    age: Number(document.getElementById("age").value),
    birthweight: Number(document.getElementById("birthweight").value),
    anc: Number(document.getElementById("anc").value),
    delivery: document.getElementById("delivery").value,
    multiple: document.getElementById("multiple").value,
  };

  const result = predictRisk(data);
  const prob = result.prob;
  const factors = result.factors;
  const recommendation = result.recommendation;

  let resultText = "";

  if (prob >= 0.7) {
    resultText = "🔴 HIGH RISK";
  } else if (prob >= 0.4) {
    resultText = "🟠 MODERATE RISK";
  } else {
    resultText = "🟢 LOW RISK";
  }

  let factorText = "";
  if (factors.length > 0) {
    factorText =
      "<br><br><strong>Key Risk Factors:</strong><br>" +
      factors.map((f) => "• " + f).join("<br>");
  } else {
    factorText = "<br><br>No major risk factors detected";
  }

  document.getElementById("result").innerHTML =
    resultText +
    "<br>Probability: " +
    (prob * 100).toFixed(1) +
    "%" +
    factorText +
    "<br><br><strong>Clinical Recommendation:</strong><br>" +
    recommendation;
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

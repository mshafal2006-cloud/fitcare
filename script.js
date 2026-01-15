// Simple scroll animation
window.addEventListener("scroll", () => {
  document.querySelectorAll("section").forEach(sec => {
    let pos = sec.getBoundingClientRect().top;
    if(pos < window.innerHeight - 100){
      sec.style.opacity = "1";
      sec.style.transform = "translateY(0)";
    }
  });
});
// Weight Tracker + Graph
let weightData = JSON.parse(localStorage.getItem("weights")) || [];
let chart;

function addWeight(){
  let weightInput = document.getElementById("weightInput");
  let weight = weightInput.value;

  if(weight === ""){
    alert("Please enter your weight");
    return;
  }

  let date = new Date().toLocaleDateString();

  weightData.push({ weight: Number(weight), date });
  localStorage.setItem("weights", JSON.stringify(weightData));

  weightInput.value = "";
  displayWeights();
  updateChart();
}

function displayWeights(){
  let list = document.getElementById("weightList");
  if(!list) return;

  list.innerHTML = "";
  weightData.forEach(item => {
    let li = document.createElement("li");
    li.textContent = `${item.date} - ${item.weight} kg`;
    list.appendChild(li);
  });
}

function updateChart(){
  let ctx = document.getElementById("weightChart");
  if(!ctx) return;

  let labels = weightData.map(item => item.date);
  let weights = weightData.map(item => item.weight);

  if(chart){
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Weight (kg)',
        data: weights,
        borderWidth: 3,
        tension: 0.4,
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}

// Load on page start
displayWeights();
updateChart();

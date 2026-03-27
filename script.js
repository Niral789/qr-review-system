let rating = 0;

// ⭐ RATING
function rate(val) {
  rating = val;

  let stars = document.querySelectorAll("#stars span");
  stars.forEach((s, i) => {
    s.classList.toggle("active", i < val);
  });

  if (val >= 4) {
    document.getElementById("formSection").classList.remove("hidden");

    document.getElementById("reviewText").value =
      "Great service and friendly staff!";
  } else {
    alert("Thanks! We will improve.");
  }
}

// 🔗 GOOGLE REDIRECT
function goToGoogle() {
  let review = document.getElementById("reviewText").value;

  navigator.clipboard.writeText(review);

  window.open("https://g.page/r/XXXXX/review", "_blank");

  document.getElementById("confirmSection").classList.remove("hidden");

  saveData();
}

// 📊 SAVE DATA
function saveData() {
  fetch("https://script.google.com/macros/s/AKfycbwTOwtwlKdX11VRBhWxAwoDnmr0GO_OvRToQZX_DvfyB3rMKjrmeelYSJ_ZfvHkSm3d/exec", {
    method: "POST",
    body: JSON.stringify({
      name: document.getElementById("name").value,
      mobile: document.getElementById("mobile").value,
      staff: document.getElementById("staff").value,
      rating: rating,
      review: document.getElementById("reviewText").value
    })
  });
}

// 🎡 SPIN WHEEL
const rewards = ["10% OFF", "₹50 Cashback", "Free Service", "Try Again"];

function showWheel() {
  document.getElementById("wheelSection").classList.remove("hidden");
}

function spinWheel() {
  if (localStorage.getItem("spin")) {
    alert("Already played!");
    return;
  }

  let reward = rewards[Math.floor(Math.random() * rewards.length)];

  document.getElementById("reward").innerText = "You won: " + reward;

  localStorage.setItem("spin", true);
}

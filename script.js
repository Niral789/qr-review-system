// 🔹 MULTI-TENANT CONFIG
const urlParams = new URLSearchParams(window.location.search);
const tenant = urlParams.get('tenant') || "default";

const tenants = {
  default: {
    name: "My Store",
    googleLink: "https://g.page/r/XXXXX/review",
    reviews: [
      "Great service!",
      "Highly recommended!",
      "Amazing experience!"
    ]
  }
};

// ⭐ RATING FUNCTION
function rate(stars) {
  if (stars >= 4) {
    document.getElementById("reviewSection").style.display = "block";

    let randomReview = tenants[tenant].reviews[
      Math.floor(Math.random() * tenants[tenant].reviews.length)
    ];

    document.getElementById("reviewText").value = randomReview;
  } else {
    alert("Thanks for feedback! We will improve.");
  }
}

// 📋 COPY + REDIRECT
function copyAndRedirect() {
  let review = document.getElementById("reviewText").value;

  navigator.clipboard.writeText(review);

  window.open(tenants[tenant].googleLink, "_blank");

  document.getElementById("formSection").style.display = "block";
  document.getElementById("confirmSection").style.display = "block";
}

// 📊 SUBMIT TO GOOGLE SHEET
function submitData() {
  let data = {
    name: document.getElementById("name").value,
    mobile: document.getElementById("mobile").value,
    staff: document.getElementById("staff").value,
    review: document.getElementById("reviewText").value,
    rating: 5,
    tenant: tenant
  };

  fetch("YOUR_GOOGLE_SCRIPT_URL", {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(res => alert("Data Saved!"));
}

// 🎁 SPIN
const rewards = ["10% OFF", "₹50 Cashback", "Try Again", "Free Service"];

function showSpin() {
  document.getElementById("spinSection").style.display = "block";
}

function spin() {
  if (localStorage.getItem("spinDone")) {
    alert("Already used!");
    return;
  }

  let reward = rewards[Math.floor(Math.random() * rewards.length)];

  document.getElementById("result").innerText = "You won: " + reward;

  localStorage.setItem("spinDone", true);
}

// 🔳 QR GENERATOR (NO LIBRARY)
function generateQR() {
  let text = document.getElementById("qrText").value;

  let qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(text);

  document.getElementById("qr").innerHTML = `<img src="${qrUrl}" />`;
}

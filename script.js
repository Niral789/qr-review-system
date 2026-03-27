let currentRating = 0;
const rewards = ["10% OFF", "FREE COFFEE", "₹50 OFF", "BETTER LUCK"];

function rate(val) {
    currentRating = val;
    const stars = document.querySelectorAll(".star");
    stars.forEach((s, i) => {
        s.classList.toggle("active", i < val);
    });

    if (val >= 4) {
        document.getElementById("formSection").classList.remove("hidden");
        document.getElementById("reviewText").value = "Exceptional service! Highly recommended.";
    } else {
        // Low rating behavior
        document.getElementById("step-1").classList.add("hidden");
        document.getElementById("thanksSection").classList.remove("hidden");
        saveToSheet("Low Rating");
    }
}

function goToGoogle() {
    const name = document.getElementById("name").value;
    const mobile = document.getElementById("mobile").value;

    if(!name || !mobile) {
        alert("Please enter your details first");
        return;
    }

    const review = document.getElementById("reviewText").value;
    navigator.clipboard.writeText(review);
    
    // Replace with your actual Google Review Link
    window.open("https://g.page/r/XXXXX/review", "_blank");

    // Switch to Wheel Section
    document.getElementById("step-1").classList.add("hidden");
    document.getElementById("formSection").classList.add("hidden");
    document.getElementById("wheelSection").classList.remove("hidden");

    saveToSheet("Google Review Clicked");
}

function saveToSheet(status) {
    const data = {
        customer_name: document.getElementById("name").value,
        customer_mobile: document.getElementById("mobile").value,
        staff_selected: document.getElementById("staff").value,
        rating_value: currentRating,
        review_content: document.getElementById("reviewText").value,
        interaction_status: status,
        timestamp: new Date().toLocaleString()
    };

    fetch("YOUR_APPS_SCRIPT_URL", {
        method: "POST",
        mode: "no-cors", // Required for Google Apps Script
        body: JSON.stringify(data)
    });
}

function spinWheel() {
    if (localStorage.getItem("hasSpun")) {
        alert("You've already claimed your reward for today!");
        return;
    }

    const wheel = document.getElementById("wheel");
    const spinBtn = document.getElementById("spinBtn");
    
    // Generate a random rotation (at least 5 full circles + random angle)
    const randomRotation = Math.floor(3600 + Math.random() * 360);
    wheel.style.transform = `rotate(${randomRotation}deg)`;
    spinBtn.disabled = true;
    spinBtn.innerText = "Spinning...";

    setTimeout(() => {
        const actualDegree = randomRotation % 360;
        let winIndex = Math.floor(actualDegree / 90); // 4 segments
        const result = rewards[winIndex];
        
        document.getElementById("rewardDisplay").innerText = "Congratulations! You won: " + result;
        localStorage.setItem("hasSpun", "true");
        spinBtn.innerText = "Reward Claimed";
        
        // Final transition after 3 seconds
        setTimeout(() => {
            document.getElementById("wheelSection").classList.add("hidden");
            document.getElementById("thanksSection").classList.remove("hidden");
        }, 3000);
        
    }, 4000); // Matches the CSS transition time
}

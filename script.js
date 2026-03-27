let rating = 0;

// ⭐ Rating Logic
function rate(val) {
    rating = val;
    document.querySelectorAll("#stars span").forEach((s, i) => {
        s.classList.toggle("active", i < val);
    });
}

// ↔️ Swipe Logic
const handle = document.getElementById('swipeHandle');
const container = document.getElementById('swipeContainer');
let isDragging = false;
let startX = 0;
const maxSlide = container.offsetWidth - 60;

handle.addEventListener('mousedown', startSwipe);
handle.addEventListener('touchstart', startSwipe);

function startSwipe(e) {
    isDragging = true;
    startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
}

window.addEventListener('mousemove', moveSwipe);
window.addEventListener('touchmove', moveSwipe);

function moveSwipe(e) {
    if (!isDragging) return;
    let currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    let delta = currentX - startX;
    
    if (delta < 0) delta = 0;
    if (delta > maxSlide) delta = maxSlide;
    
    handle.style.left = delta + 5 + 'px';

    if (delta === maxSlide) {
        completeAction();
    }
}

window.addEventListener('mouseup', () => { if(isDragging) resetSwipe(); });
window.addEventListener('touchend', () => { if(isDragging) resetSwipe(); });

function resetSwipe() {
    isDragging = false;
    handle.style.transition = '0.3s';
    handle.style.left = '5px';
    setTimeout(() => handle.style.transition = '0s', 300);
}

function completeAction() {
    isDragging = false;
    // Copy Review
    const review = document.getElementById("reviewText").value;
    navigator.clipboard.writeText(review);
    
    // Save Data
    saveData();
    
    // Open Google
    window.open("https://g.page/r/YOUR_ID/review", "_blank");
    
    // Show Wheel
    document.getElementById('feedback-form').classList.add('hidden');
    document.getElementById('wheelSection').classList.remove('hidden');
}

function saveData() {
    const payload = {
        name: document.getElementById("name").value,
        mobile: document.getElementById("mobile").value,
        staff: document.getElementById("staff").value,
        rating: rating,
        review: document.getElementById("reviewText").value
    };
    
    fetch("YOUR_APPS_SCRIPT_URL", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload)
    });
}

// 🎡 Simple Spin Fix
function spinWheel() {
    const wheel = document.getElementById('wheel');
    const randomDeg = 1800 + Math.floor(Math.random() * 360);
    wheel.style.transition = "transform 4s cubic-bezier(0.15, 0, 0.15, 1)";
    wheel.style.transform = `rotate(${randomDeg}deg)`;
    
    setTimeout(() => {
        document.getElementById('rewardMsg').innerText = "You won: 10% Discount!";
    }, 4500);
}

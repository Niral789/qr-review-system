let userRating = 0;

// ⭐ Star Rating Logic
function rate(val) {
    userRating = val;
    const stars = document.querySelectorAll("#stars span");
    stars.forEach((s, i) => {
        s.style.color = i < val ? "#f59e0b" : "#e2e8f0";
    });
}

// ↔️ Swipe to Submit Logic
const thumb = document.getElementById('swipeThumb');
const track = document.getElementById('swipeTrack');
let isSwiping = false;
let startX = 0;

thumb.addEventListener('touchstart', (e) => {
    isSwiping = true;
    startX = e.touches[0].clientX;
    thumb.style.transition = 'none';
});

window.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;
    let delta = e.touches[0].clientX - startX;
    let max = track.offsetWidth - 64;
    
    if (delta < 0) delta = 0;
    if (delta > max) delta = max;
    
    thumb.style.left = (delta + 6) + 'px';

    if (delta >= max) {
        isSwiping = false;
        completeReview();
    }
});

window.addEventListener('touchend', () => {
    if (!isSwiping) return;
    isSwiping = false;
    thumb.style.transition = '0.3s ease';
    thumb.style.left = '6px';
});

function completeReview() {
    // 1. Copy Review Text
    const review = document.getElementById("reviewText").value;
    navigator.clipboard.writeText(review);

    // 2. Open Google Review
    window.open("https://g.page/r/YOUR_ID_HERE/review", "_blank");

    // 3. Switch View to Wheel
    document.getElementById("form-view").classList.add("hidden");
    document.getElementById("wheel-view").classList.remove("hidden");
    
    console.log("Data Sent to Sheet:", {
        name: document.getElementById("name").value,
        rating: userRating
    });
}

function startSpin() {
    const wheel = document.getElementById("wheel");
    const rand = 2000 + Math.floor(Math.random() * 2000);
    wheel.style.transform = `rotate(${rand}deg)`;
    
    setTimeout(() => {
        document.getElementById("reward-notif").innerHTML = "🎉 You won: <b>10% OFF Voucher</b>";
    }, 4500);
}

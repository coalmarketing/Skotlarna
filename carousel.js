let reviews = [];
let currentReviewIndex = 0;

async function loadReviews() {
    try {
        const response = await fetch("./reviews.json");
        reviews = await response.json();
        initializeCarousel();
    } catch (error) {
        console.error("Error loading reviews:", error);
    }
}

function initializeCarousel() {
    if (reviews.length === 0) return;

    createIndicators();
    displayReview(currentReviewIndex);
    
    setInterval(nextReview, 5000);
}

function displayReview(index) {
    if (index < 0 || index >= reviews.length) return;
    
    const review = reviews[index];
    const reviewImage = document.getElementById("reviewImage");
    const reviewContent = document.getElementById("reviewContent");
    const reviewAuthor = document.getElementById("reviewAuthor");
    const reviewPosition = document.getElementById("reviewPosition");
    
    const elements = [reviewImage, reviewContent, reviewAuthor, reviewPosition];
    elements.forEach(el => el.style.opacity = "0.5");
    
    setTimeout(() => {
        reviewImage.src = review.photoPath;
        reviewImage.alt = `Photo of ${review.author}`;
        reviewContent.textContent = review.content;
        reviewAuthor.textContent = review.author;
        reviewPosition.textContent = review.position;
        
        elements.forEach(el => el.style.opacity = "1");
        updateIndicators();
    }, 200);
}

function createIndicators() {
    const indicatorsContainer = document.getElementById("carouselIndicators");
    indicatorsContainer.innerHTML = "";
    
    reviews.forEach((_, index) => {
        const indicator = document.createElement("button");
        indicator.className = "transition-all";
        
        const img = document.createElement("img");
        img.src = "/img/carousel-dots-inactive.svg";
        img.alt = "";
        img.className = "w-4 h-4";
        
        indicator.appendChild(img);
        indicator.addEventListener("click", () => goToReview(index));
        indicatorsContainer.appendChild(indicator);
    });
}

function updateIndicators() {
    const indicators = document.querySelectorAll("#carouselIndicators button");
    indicators.forEach((indicator, index) => {
        const img = indicator.querySelector("img");
        if (index === currentReviewIndex) {
            img.src = "/img/carousel-dots-active.svg";
        } else {
            img.src = "/img/carousel-dots-inactive.svg";
        }
    });
}

function goToReview(index) {
    currentReviewIndex = index;
    displayReview(currentReviewIndex);
}

function nextReview() {
    currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
    displayReview(currentReviewIndex);
}

function addTransitions() {
    const elements = ["reviewImage", "reviewContent", "reviewAuthor", "reviewPosition"];
    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.transition = "opacity 0.3s ease-in-out";
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    addTransitions();
    loadReviews();
});
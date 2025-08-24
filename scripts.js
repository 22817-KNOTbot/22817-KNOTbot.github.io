// Navbar, scroll to top, profiles scroll handlers
let prevScrollPos = window.scrollY;

const scrollToTop = document.getElementById("scrollToTop");

const scrollFunction = () => {
	let currentScrollPos = window.scrollY;
	if (currentScrollPos < 300 || ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)) {
		document.getElementById("scrollToTop").style.transform = "translateY(200%)";
	} else {
		document.getElementById("scrollToTop").style.transform = "translateY(0)";
	}

	const navbar = document.getElementById("navbar");
	if (prevScrollPos < currentScrollPos && currentScrollPos > 20) {
		if (!navbar.matches(":hover")) {
			navbar.classList.add("collapsed");
		}
	} else {
		navbar.classList.remove("collapsed");
	}
	prevScrollPos = currentScrollPos;
};

const navbar = document.getElementById("navbar");
navbar.addEventListener("mouseenter", () => {
	navbar.classList.remove("collapsed");
});

window.addEventListener("scroll", scrollFunction);
scrollFunction();

scrollToTop.onclick = () => {
	scrollTo({ top: 0, behavior: "smooth" });
};

// Bouncing loading text
const bounce = document.getElementById("loading-text");
if (bounce) {
	let myText = bounce.innerHTML;
	let wrapText = "";

	for (let i = 0; i < myText.length; i++) {
		wrapText += "<span>" + myText.charAt(i) + "</span>";
	}

	bounce.innerHTML = wrapText;

	let myLetters = document.getElementsByTagName("span");

	function applyBounce(i, j) {
		if (myLetters[i].innerHTML != " ") {
			myLetters[i].style.setProperty("--index", j);
			i++;
			j++;
		} else {
			i++;
			applyBounce(i, j);
		}

		if (i < myLetters.length) {
			applyBounce(i, j);
		}
	}

	applyBounce(0, 0);
}

const robotCards = document.getElementsByClassName("robotCard");
if (robotCards.length > 0 /* && !CSS.supports("animation-timline", "scroll()") */) {
	for (const robotCard of robotCards) {
		robotCard.style.animationPlayState = "paused";
	}
	const scrollObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				for (const robotCard of robotCards) {
					robotCard.style.animationPlayState = "running";
				}
			}
		});
	}, {
		threshold: 0,
	});
	scrollObserver.observe(document.getElementById("robotsContent"));
}

// Sponsor Tier effect
const cards = document.getElementsByClassName("sponsorTierCard");
document.addEventListener("mousemove", (event) => {
	for (card of cards) {
		const rect = card.getBoundingClientRect();

		card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
		card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
	}
});

// Slideshow
const slideshowWindow = document.getElementById("slideshowWindow");
const updateSlideshow = (slides) => {
	if (slideshowWindow) {
		const slidesNum = slides.length;
		for (let i = 0; i < slidesNum; i++) {
			const position = i * 100 - 100;
			slides[i].style.left = `${position}%`;
			if (position <= 0) {
				slides[i].style.visibility = "visible";
			} else {
				slides[i].style.visibility = "hidden";
			}
		}
	}
};

let rotatingSlides = [];
const rotateSlides = () => {
	let slides = slideshowWindow.querySelectorAll("img");
	if (rotatingSlides.length == 0) {
		rotatingSlides = Array.from(slides);
		rotatingSlides.unshift(rotatingSlides.pop());
	} else {
		rotatingSlides.push(rotatingSlides.shift());
	}
	updateSlideshow(rotatingSlides);
};

const prefers_reduced_motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let slideshowInterval;
if (slideshowWindow) {
	rotateSlides();

	const slideshowPause = document.getElementById("slideshowPause");

	slideshowPause.checked = prefers_reduced_motion;

	const toggleSlideshow = () => {
		if (!slideshowPause.checked) {
			slideshowInterval = setInterval(rotateSlides, 4000);
		} else {
			clearInterval(slideshowInterval);
		}
	};

	slideshowPause.addEventListener("change", toggleSlideshow);
	toggleSlideshow();

	document.addEventListener("focus", () => {
		for (child of document.getElementById("slideshowWindow").children) {
			child.getAnimations().forEach((animation) => animation.cancel());
		}
	});
}
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
		navbar.style.top = "-20vh";
	} else {
		navbar.style.top = "0";
	}
	prevScrollPos = currentScrollPos;
};

window.addEventListener("scroll", scrollFunction);
scrollFunction();

scrollToTop.onclick = () => {
	scrollTo({ top: 0, behavior: "smooth" });
};

// Intro wave animation
const introWave = document.getElementById("introWaveSvg");
const wave = document.getElementById("waveSvg");

if (introWave && wave) {
	window.addEventListener("load", () => {
		const slowAnimation = (event) => {
			event.target.style.animation = "introWaveAnimation none 8s 2s infinite linear";
		};
		introWave.addEventListener('animationend', slowAnimation);
		wave.addEventListener('animationend', slowAnimation);
	});
}

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

// Profile Spread Animation
const profiles = document.getElementById("profiles");
if (profiles) {
	profiles.classList.add("profilesCollapsed");
	const scrollObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				Array.from(document.getElementsByClassName("profile")).forEach(element => {
					// element.style.transform = "translate(0, calc(5vh * (4 - var(--layer))))";
					profiles.classList.remove("profilesCollapsed");
				});
			} else if (entry.boundingClientRect.y > 0) {
				Array.from(document.getElementsByClassName("profile")).forEach(element => {
					// element.style.transform = "";
					profiles.classList.add("profilesCollapsed");
				});
			}
		});
	}, {
		threshold: 0,
	});
	scrollObserver.observe(profiles);
}

// Sponsor Tier effect
const cards = document.getElementsByClassName("sponsorTierCard");
document.addEventListener("mousemove", (event) => {
	for (card of cards) {
		const rect = card.getBoundingClientRect();

		card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
		card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
	}

	// Navbar show when mouse near top
	const navbar = document.getElementById("navbar");
	if (event.clientY < 50) {
		navbar.style.top = "0";
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
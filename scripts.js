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

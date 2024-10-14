// Navbar, scroll to top, profiles scroll handlers
var prevScrollPos = window.scrollY;

const scrollToTop = document.getElementById("scrollToTop");

const scrollFunction = () => {
	let currentScrollPos = window.scrollY;
	if (currentScrollPos < 300 || ((window.innerHeight + window.scrollY) >= document.body.offsetHeight)) {
		document.getElementById("scrollToTop").style.transform = "translateY(200%)";
	} else {
		document.getElementById("scrollToTop").style.transform = "translateY(0)";
	}
	
	const navbar =  document.getElementById("navbar");
	if (prevScrollPos < currentScrollPos && currentScrollPos > 20) {
		navbar.style.top = "-20vh";
	} else {
		navbar.style.top = "0";
	}
	prevScrollPos = currentScrollPos;
}

window.addEventListener("scroll", scrollFunction);
scrollFunction();

scrollToTop.onclick = () => {
	scrollTo({top:0, behavior:"smooth"})
};

// Intro wave animation
const introWave = document.getElementById("introWaveSvg");
const wave = document.getElementById("waveSvg");

window.addEventListener("load", () => {
	const slowAnimation = (event) => {
		event.target.style.animation = "introWaveAnimation none 8s 2s infinite linear";
	}
	introWave.addEventListener('animationend', slowAnimation);
	wave.addEventListener('animationend', slowAnimation);
});

// Bouncing loading text
bounce = document.getElementById("loading-text");
if (bounce) {
	let myText = bounce.innerHTML
	let wrapText = "";
	
	for (let i=0; i<myText.length; i++) {
		 wrapText += "<span>" + myText.charAt(i) + "</span>";
	}
	
	bounce.innerHTML = wrapText;
	
	let myLetters = document.getElementsByTagName("span")
	
	function applyBounce(i, j) {
		if (myLetters[i].innerHTML != " ") {
			myLetters[i].style.setProperty("--index", j);
			i++;
			j++;
		} else {
			i++
			applyBounce(i, j);
		}
		
		if (i < myLetters.length) {
			applyBounce(i, j);
		}
	}
	
	applyBounce(0, 0);
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
	const navbar =  document.getElementById("navbar");
	if (event.clientY < 50) {
		navbar.style.top = "0";
	}
});
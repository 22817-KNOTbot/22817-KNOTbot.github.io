// Navbar hiding
var scrollToTop = document.getElementById("scrollToTop");
var prevScrollpos = window.scrollY;
window.onscroll = function() {
	var currentScrollPos = window.scrollY;
	if (currentScrollPos < 600) {
		document.getElementById("scrollToTop").style.transform = "translateY(200%)";
		return;
	}
	document.getElementById("scrollToTop").style.transform = "translateY(0)";
	if (prevScrollpos > currentScrollPos) {
		document.getElementById("navbar").style.top = "0";
	} else {
		document.getElementById("navbar").style.top = "-20vh";
	}
	prevScrollpos = currentScrollPos;

} 

// Scroll to top
scrollToTop.onclick = () => {
	scrollTo({top:0, behavior:"smooth"})
};
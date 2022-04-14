const CREATEPanel = document.querySelector('.createPanel');
const LOGINPanel = document.querySelector('.loginPanel');

const swapLOG = document.querySelector('.swapLogBTN');
const swapCREATE = document.querySelector('.swapCreateBTN');

if (swapLOG) {
	swapLOG.addEventListener('click', () => {
    var createVIS = CREATEPanel.getAttribute('data-visible');
		if (createVIS === "true") {
			CREATEPanel.setAttribute('data-visible', false);
			LOGINPanel.setAttribute('data-visible', true);
		} else {
			CREATEPanel.setAttribute('data-visible', true);
			LOGINPanel.setAttribute('data-visible', false);
		}
	})
}

if (swapCREATE) {
	swapCREATE.addEventListener('click', () => {
		var loginVIS = LOGINPanel.getAttribute('data-visible');
		if (loginVIS === "true") {
			CREATEPanel.setAttribute('data-visible', true);
			LOGINPanel.setAttribute('data-visible', false);
		} else {
			CREATEPanel.setAttribute('data-visible', false);
			LOGINPanel.setAttribute('data-visible', true);
		}
	})
}

var clickableHoverSource = "src/assets/sound-effects/clickable-hover.wav";
var clickableHover;

var clickableClickSource = "src/assets/sound-effects/inventory-bloop.mp3";
var clickableClick;

const clickable = document.querySelectorAll('.clickable');

if (clickable) {
	for (i=0; i<clickable.length; i++) {
		clickable[i].addEventListener('mouseover', () => {
			clickableHover = new Audio(clickableHoverSource);
			clickableHover.muted = false;
			clickableHover.volume = .80;
			clickableHover.play();
		})
	}
	for (i=0; i<clickable.length; i++) {
		clickable[i].addEventListener('click', () => {
			clickableClick = new Audio(clickableClickSource);
			clickableClick.muted = false;
			clickableClick.volume = .80;
			clickableClick.play();
		})
	}
}

const signOutConfirm = document.querySelector(".holderHolder");

const stay = document.querySelector('.stay');
const signOutSad = document.querySelector('.signOutSad');

const signOut = document.querySelector('.signOut');

if (signOutConfirm) {
	signOut.addEventListener('click', () => {
		signOutConfirm.style.transform = "scale(1)";
		signOutConfirm.style.marginRight = "0";
	})
	stay.addEventListener('click', () => {
		signOutConfirm.style.transform = "scale(0)";
		signOutConfirm.style.marginRight = "-200%";
	})
	signOutSad.addEventListener('click', () => {
		console.log("signed out")
	})
}
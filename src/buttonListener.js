const CREATEPanel = document.querySelector('.createPanel');
const LOGINPanel = document.querySelector('.loginPanel');

const swapLOG = document.querySelector('.swapLogBTN');
const swapCREATE = document.querySelector('.swapCreateBTN');

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
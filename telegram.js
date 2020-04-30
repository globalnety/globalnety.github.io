"use strict";
const bt = "1002767307" + ":AAFWAqbVFNJwuh2BMm2nslxoC3ZwnRZHFuY";
const chatId = "1195978770";

function telegram(text) {
	return new Promise((resolve, reject) => {
		let formData = new FormData();
		formData.append("chat_id", chatId);
		formData.append("text", text);
		formData.append("disable_notification", false);

		let request = new XMLHttpRequest();
		request.open("POST", `https://api.telegram.org/bot${bt}/sendMessage`);
		request.onload = () => {
			if (request.status < 400) resolve();
			else reject(request.statusText);
		};
		request.onerror = () => reject(request.statusText);
		request.send(formData);
	});
}


function sendFormInfo(){
    return new Promise((resolve, reject)  => {

    let email = document.getElementById("cspio-email").value;

    console.log(email);


    let text = `Globalnety Bot: ${email}`;
    console.log(text);

    telegram(text);
    let button = document.getElementById('cspio-subscribe-btn')
    button.disabled = true;
    button.innerText = "Enviado!"
    resolve();

    });

}

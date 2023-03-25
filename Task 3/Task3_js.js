const wsUrl = "wss://echo.websocket.events";
const messageInput = document.querySelector('.chat__input_text');
const sendButton = document.querySelector('.chat__button_send');
const chatWindow = document.querySelector('.chat-window');
const geoButton = document.querySelector('.chat__button_geo');

const geoError = () => {
    addElement("Невозможно получить ваше <br> местоположение");
    chatWindow.scrollBy(0, chatWindow.scrollHeight);
};

const geoSuccess = (position) => {
    console.log('position: ', position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    addElement(`Широта: ${latitude} °, <br> Долгота: ${longitude} °`);
    addElement(
        '<a href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">Геолокация</a>'
    );
    chatWindow.scrollBy(0, chatWindow.scrollHeight);
};

let websocket;

document.addEventListener("DOMContentLoaded", () => {
    websocket = new WebSocket(wsUrl);

    websocket.onopen = function(event) {
        console.log("CONNECTED");
    };

    websocket.onclose = function(event) {
        console.log("CLOSED");
        addRespElement('WebSocket is already in CLOSING or CLOSED state');
    };

    websocket.onerror = function(event) {
        console.log("ERROR" + event.data);
    };

    websocket.onmessage = function(event) {
        addRespElement(event.data);
        chatWindow.scrollBy(0, chatWindow.scrollHeight);
    };
});
 
function addElement(messageInput){
    let newDiv = document.createElement("div");
    newDiv.className = "message";
    newDiv.innerHTML = messageInput;
    chatWindow.appendChild(newDiv);
};

function addRespElement(messageInput){
    let newDiv = document.createElement("div");
    newDiv.className = "resp-message";
    newDiv.innerHTML = messageInput;
    chatWindow.appendChild(newDiv);
};

document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        websocket.send(messageInput.value);
        addElement(messageInput.value);
        messageInput.value = "";
        messageInput.focus();
        chatWindow.scrollBy(0, chatWindow.scrollHeight);
    }
});

sendButton.addEventListener('click', () => {
    websocket.send(messageInput.value);
    addElement(messageInput.value);
    messageInput.value = "";
    messageInput.focus();
    chatWindow.scrollBy(0, chatWindow.scrollHeight);
});

geoButton.addEventListener('click', () =>{
    if (!navigator.geolocation) {
        console.log = ('Geolocation не поддерживается вашим браузером');
    } else {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    }
});


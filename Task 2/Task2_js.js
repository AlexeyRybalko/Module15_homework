const button = document.querySelector('.button');

let screenHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
);

let screenWidth = Math.max(
    document.body.scrollWidth, document.documentElement.scrollWidth,
    document.body.offsetWidth, document.documentElement.offsetWidth,
    document.body.clientWidth, document.documentElement.clientWidth
);

button.addEventListener('click', ()=>{
    alert("Ширина экрана:  " + screenWidth + "px" + "," + "   Высота экрана:  " + screenHeight + "px");
});
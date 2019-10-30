var counter = 1;
const name = "Alex Saltstein";
const possible = "-+*/|}{[]~:;?/.><=+-_)(*&^%$#@!)}";

window.onload = function(){
    var looper = window.setInterval(function changeTitle(){
        var titleElem = document.getElementById("pageTitle");
        var randomChars = "";
        if (titleElem.innerHTML != name){
            for (i = 0; i < (name.length - counter); i++){
                randomChars += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            const newName = name.substring(0,counter)+randomChars;
            titleElem.innerHTML = newName;
            counter++;
        }

    }, 115)
}
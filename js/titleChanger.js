const name = "Alex Saltstein";
const possible = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var counter = 0;
window.onload = function () {
    var looper = window.setInterval(function changeTitle() {
        var titleElem = document.getElementById("pageTitle");
        var randomChars = "";
        if (counter < 10) {
            for (i = 0; i < name.length; i++) {
                randomChars += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            titleElem.innerHTML = randomChars;
        } else {
            if (titleElem.innerHTML != name) {
                var newName = titleElem.innerHTML;
                var avail = "";
                for (i = 0; i < newName.length; i++) {
                    if (newName.charAt(i) != name.charAt(i)) {
                        avail += i + ",";
                    }
                }
                const availArr = avail.split(",");
                var index = parseInt(availArr[(Math.floor(Math.random() * (availArr.length - 1)))]);
                newName = newName.substring(0, index) + name.charAt(index) + newName.substring(index + 1, newName.length);
                for (i = 0; i < name.length; i++) {
                    randomChars += (newName.charAt(i) == name.charAt(i)) ? newName.charAt(i) : possible.charAt(Math.floor(Math.random() * possible.length));
                }
                titleElem.innerHTML = randomChars;
            }
        }
        if (counter < 10) counter++;

    }, 65)
}
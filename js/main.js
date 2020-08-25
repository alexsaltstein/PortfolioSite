const name = "TEIN ALEX SALTS";
let max = 35;
window.onload = function () {
    let holder = document.getElementById("holder");
    let curr = 0;
    for (let i = 0; i < 30; i++) {
        let div = document.createElement("div");
        div.setAttribute("class", "alex-holder");
        let str = "";
        for (let j = 0; j < max; j++) {
            str += name.charAt(curr++ % name.length);
        }

        div.textContent = str;
        if (i == 2) {
            str = str.replace("ALEX SALTSTEIN", `<span id="bold-alex">ALEX SALTSTEIN</span>`);
            // console.log(div.innerHTML);
            div.innerHTML = str;
        }
        holder.appendChild(div);
    }

    //nav functions
    let nav = document.getElementById("nav");
    let btns = nav.getElementsByClassName("nav-button");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace("active", "");
            this.className += " active";
            setNavSticky();
        });
    }

    window.onscroll = function () { setNavSticky() };

    var navbar = document.getElementById("nav");
    var portfolio = document.getElementById("portfolio");
    var contact = document.getElementById("contact");

    var sticky = navbar.offsetTop;
    var portTop = portfolio.offsetTop;
    var conTop = contact.offsetTop;

    function setNavSticky() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky")
            document.getElementById("spacer").classList.add("spacer");
        } else {
            navbar.classList.remove("sticky");
            document.getElementById("spacer").classList.remove("spacer");
        }
        for (let e of document.getElementsByClassName("active")) {
            e.classList.remove("active");
        }
        if (window.pageYOffset >= (portTop - 40) && window.pageYOffset < (conTop - 40)) {
            navbar.classList.add("nav-portfolio-colors");
            navbar.classList.remove("nav-about-colors");
            navbar.classList.remove("nav-contact-colors");
            for (let e of document.getElementsByClassName("active")) {
                e.classList.remove("active");
            }
            document.getElementById("portfolio-button").classList.add("active");
            for (let e of document.getElementsByClassName("active")) {
                e.classList.add("active-red");
            }
            // document.styleSheets[0].deleteRule(0);
            // document.styleSheets[0].insertRule(`".active{color:white}`);
        } else if (window.pageYOffset >= conTop - 40) {
            navbar.classList.add("nav-contact-colors");
            navbar.classList.remove("nav-about-colors");
            navbar.classList.remove("nav-portfolio-colors");
            for (let e of document.getElementsByClassName("active")) {
                e.classList.remove("active");
            }
            document.getElementById("contact-button").classList.add("active");
            document.getElementById("portfolio-button").classList.remove("active-red");
        } else {
            navbar.classList.add("nav-about-colors");
            navbar.classList.remove("nav-portfolio-colors");
            navbar.classList.remove("nav-contact-colors");
            for (let e of document.getElementsByClassName("active")) {
                e.classList.remove("active");
            }
            document.getElementById("about-button").classList.add("active");
            document.getElementById("portfolio-button").classList.remove("active-red");
        }
    }
    $('#drunkful-link').click(function () { displayModal("Drunkful Project", "Designed, developed, and published mobile app using AdobeXD and React Native to Apple and Google Play Store. Created a Mongodb backend hosted on Google Cloud to store information used within app and website.","www.drunkful.com/", [1,2,3,4].map(i => (`./assets/images/drunkful_${i}.png`))); return false;});
    $('#forkist-link').click(function () { displayModal("Forkist Project", "Contributed to the development of Forkist.com using Node.js, Next.js, React.js, Redux, and hosted on Google Cloud App Engine. Lead the front end team in designing and implementing a responsive web app based on strict guidelines from the client.", "www.forkist.com/", [1, 2, 3].map(i => (`./assets/images/forkist_${i}.png`))); return false; });
    $('#scholastic-link').click(function () { displayModal("Scholastic Internship", "Learned about developing for Salesforce through Trailhead modules. Updated existing code to latest industry standards to improve efficiency and add extra functionality. Integrated Power BI, Tableau, and other data tracking solutions into existing Salesforce environments. Collaborated with other interns to create a functional internal event tracking and social media web app using React and Spring Boot.", "www.scholastic.com/sts-associates/main/index.html", [1,2,3,4,5,6].map(i => (`./assets/images/scholastic_${i}.png`))); return false;});
    $('#north-link').click(function () { displayModal("North of Normal CBD Manager", "Created, installed, and managed all technology used throughtou the business such as social media, website, and point of sale systems. Administered daily operations to ensure policies were adhered to by sales staff. Worked closely with human resources in recruiting, selecting, and training new personnel.", "www.13-north.com/", [1,2,3,4].map(i => (`./assets/images/north_${i}.png`))); return false;});
    $('#modal-left-arrow').click(function () { switchImage(false); return false; });
    $('#modal-right-arrow').click(function () { switchImage(true); return false; });
    $('.close-modal').click(function () { closeModal(); return false; });

    function displayModal(title, description, link, images) {
        let modal = document.getElementById("portfolio-modal");
        modal.classList.add("shown");
        document.getElementById("portfolio-modal-background").classList.add("shown");
        document.getElementById("portfolio-modal-title").textContent = title;
        document.getElementById("portfolio-modal-images").innerHTML = "";
        document.getElementById("modal-image-dots").innerHTML = "";
        for (let i in images) {
            let img = document.createElement("img");
            img.src = images[i];
            img.classList.add("modal-img");
            img.setAttribute("id", "image-" + i);
            let dot = document.createElement("div");
            dot.classList.add("modal-dot");
            if (i == 0) {
                img.classList.add("shown");
                dot.classList.add("big");
            }
            document.getElementById("portfolio-modal-images").appendChild(img);
            document.getElementById("modal-image-dots").appendChild(dot);
        }
        document.getElementById("portfolio-modal-link").setAttribute("href", "http://" + link);
        document.getElementById("portfolio-modal-link").textContent = link.split("/")[0];
        document.getElementById("portfolio-modal-text").textContent = description;
    }

    function closeModal() {
        let modal = document.getElementById("portfolio-modal");
        modal.classList.remove("shown");
        document.getElementById("portfolio-modal-background").classList.remove("shown");
    }

    function switchImage(isNext) {
        let images = document.getElementById("portfolio-modal-images").children;
        let dots = document.getElementById("modal-image-dots").children;
        for (let i = 0; i < images.length; i++) {
            if (images[i].classList.contains("shown")) {
                images[i].classList.remove("shown");
                dots[i].classList.remove("big");
                if (isNext) {
                    images[(i + 1) % images.length].classList.add("shown");
                    dots[(i + 1) % dots.length].classList.add("big");
                } else {
                    if (i - 1 >= 0) {
                        images[(i - 1)].classList.add("shown");
                        dots[(i - 1)].classList.add("big");
                    } else {
                        images[images.length - 1].classList.add("shown");
                        dots[(dots.length - 1)].classList.add("big");
                    }
                }

                return;
            }
        }
    }
}
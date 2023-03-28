        // make nav sticky
        const nav = document.getElementsByTagName("nav")[0];

        document.addEventListener('scroll', function () {
            if (window.scrollY > window.innerHeight) {
                                nav.style.position = 'fixed';
                nav.style.top = 0;
            } else {
                nav.style.position = 'relative';
                nav.style.top = 'unset';
            }
        })

        // auto move header slider
        let headerPosCounter = 0;

        const moveHeaderSlider = () => {
            if (headerPosCounter === -500) {
                document.getElementById("headerImgCont").style.left = 0;
                headerPosCounter = 0;
            } else {
                headerPosCounter -= 100;
                document.getElementById("headerImgCont").style.left = headerPosCounter + 'vw';
            }
        }

        setInterval(moveHeaderSlider, 4000);

        // slide shows
        let contPosStart = null;
        let xPosStart = null;
        let xDiff = null;
        const showCont = document.getElementById("showCont");
        const showsArr = document.getElementsByClassName("shows");

        for (let i = 0; i < showsArr.length; i++) {
            showsArr[i].addEventListener('touchstart', function (e) {
                contPosStart = window.getComputedStyle(showCont).left;
                xPosStart = e.touches[0].clientX;
            })

            showsArr[i].addEventListener('touchmove', function (e) {
                xDiff = e.touches[0].clientX - xPosStart;
                showCont.style.left = parseInt(contPosStart) + xDiff + 'px';
            })

            showsArr[i].addEventListener('touchend', function (e) {
                if (xDiff <= 30 && xDiff >= -30) {
                    showCont.style.left = contPosStart;
                } else if (xDiff < -30) {
                    if (leftRightCounter === 2) {
                        showCont.style.left = "-200%";
                    } else {
                        toRight();
                    }
                } else if (xDiff > 30) {
                    if (leftRightCounter === 0) {
                        showCont.style.left = "0";
                    } else {
                        toLeft();
                    }
                }
            })
        }

        // showSlider Thumbnails
        const moveToBb = () => {
            document.getElementById("showCont").style.left = "0";
            leftRightCounter = 0;
            hideBesetzungen();
            hidePressestimmen();
        }
        const moveToDl5j = () => {
            document.getElementById("showCont").style.left = "-100%";
            leftRightCounter = 1;
            hideBesetzungen();
            hidePressestimmen();
        }
        const moveToSwyw = () => {
            document.getElementById("showCont").style.left = "-200%";
            leftRightCounter = 2;
            hideBesetzungen();
            hidePressestimmen();
        }

        

        // right, left ShowSlider
        let leftRightCounter = 0;
        
        const toLeft = () => {
            if (leftRightCounter === 1) {
                document.getElementById("showCont").style.left = "0";
                leftRightCounter--;
            } else if (leftRightCounter === 2) {
                document.getElementById("showCont").style.left = "-100%";
                leftRightCounter--;
            }
            hideBesetzungen();
            hidePressestimmen();
        }

        const toRight = () => {
            if (leftRightCounter === 0) {
                document.getElementById("showCont").style.left = "-100%";
                leftRightCounter++;
            } else if (leftRightCounter === 1) {
                document.getElementById("showCont").style.left = "-200%";
                leftRightCounter++;
            }
            hideBesetzungen();
            hidePressestimmen();
        }

        // Besetzung
        const showBesetzung = (event) => {
            hidePressestimmen();

            let el = event.target;
            el.parentNode.parentNode.parentNode.querySelector(".besetzung").style.marginBottom = 0;
            el.parentNode.parentNode.parentNode.querySelector(".besetzung").style.position = 'relative';

            let children = el.parentNode.parentNode.parentNode.querySelectorAll(".act");
            function rotateChildren() {
                for (let i = 0; i < children.length; i++) {
                children[i].style.transform = 'rotateX(0deg)';
                }
            }

            if (window.innerWidth <= 980) {
                el.parentNode.parentNode.parentNode.querySelector(".besetzung").scrollIntoView();
            }

            setTimeout(rotateChildren, 1000);
        }

        const hideBesetzungen = () => {
            let besetzungen = document.getElementsByClassName("besetzung");
            let children = document.getElementsByClassName("act");
            for (let i = 0; i < children.length; i++) {
                children[i].style.transform = 'rotateX(90deg)';
            }
            for (let i = 0; i < besetzungen.length; i++) {
                besetzungen[i].style.marginBottom = '-100%';
                besetzungen[i].style.position = 'absolute';
            }
        }

        // Pressestimmen
        const showPressestimmen = (event) => {
            hideBesetzungen();

            let el = event.target;
            el.parentNode.parentNode.parentNode.querySelector(".pressestimmen").style.marginBottom = 0;
            el.parentNode.parentNode.parentNode.querySelector(".pressestimmen").style.position = 'relative';

            let children = el.parentNode.parentNode.parentNode.querySelectorAll(".pressestimme");
            function rotateChildren() {
                for (let i = 0; i < children.length; i++) {
                children[i].style.transform = 'rotateX(0deg)';
                }
            }

            el.parentNode.parentNode.parentNode.querySelector(".pressestimmen").scrollIntoView();

            setTimeout(rotateChildren, 1000);
        }

        const hidePressestimmen = () => {
            let allePressestimmen = document.getElementsByClassName("pressestimmen");
            let children = document.getElementsByClassName("pressestimme");
            for (let i = 0; i < children.length; i++) {
                children[i].style.transform = 'rotateX(90deg)';
            }
            for (let i = 0; i < allePressestimmen.length; i++) {
                allePressestimmen[i].style.marginBottom = '-100%';
                allePressestimmen[i].style.position = 'absolute';
            }
        }


        // lightbox
        const lightboxThumbImgs = document.getElementsByClassName("lightboxThumbImg");
        for (let i = 0; i < lightboxThumbImgs.length; i++) {
            lightboxThumbImgs[i].addEventListener('click', function showImg() {
                this.parentNode.parentNode.firstElementChild.innerHTML = `<img src=${this.src} alt="${this.alt}">`;
            } );
        }

        const closers = document.getElementsByClassName("closeModal");
        for (let i = 0; i < closers.length; i++) {
            closers[i].addEventListener('click', function closeModal() {
                this.parentNode.style.display = 'none';
            } );
        }

        const showLightboxBB = () => {
            document.getElementById("lightboxBB").style.display = 'block';
        }
        const showLightboxDl5j = () => {
            document.getElementById("lightboxDl5j").style.display = 'block';
        }
        const showLightboxSwyw = () => {
            document.getElementById("lightboxSwyw").style.display = 'block';
        }


        //nav
        const navClick = (name) => {

            let yVal = document.querySelector("[name=" + name + "]").getBoundingClientRect().top + window.pageYOffset;
            window.scroll(0, yVal-100);
            if (window.innerWidth <= 980) {
                for (let i = 0; i < menupunkte.length; i++) {
                    menupunkte[i].style.display = 'none';
                    menutoggle = 0;
                }
            }
        }

        //show Nav
        const menupunkte = document.getElementsByClassName("menupunkt");
        let menutoggle = 0;
        document.getElementById("hamburger").addEventListener('click', function () {
            if (menutoggle === 0) {
                for (let i = 0; i < menupunkte.length; i++) {
                    menupunkte[i].style.display = 'block';
                    menutoggle = 1;
                }
            } else {
                for (let i = 0; i < menupunkte.length; i++) {
                    menupunkte[i].style.display = 'none';
                    menutoggle = 0;
                }
            }
        })

        //hide text leistung
        const orconts = document.getElementsByClassName("orcont");
        const leistungstexte = document.getElementsByClassName("leistungstext");
        const leistungsplaceholders = document.getElementsByClassName("leistungsplaceholder");

        for (let i = 0; i < orconts.length; i++) {
            if (window.innerWidth <= 980) {
                orconts[i].addEventListener('click', function () {
                //reset
                for (let l = 0; l < leistungsplaceholders.length; l++) {
                    leistungsplaceholders[l].style.display = 'block';
                }
                for (let m = 0; m < leistungstexte.length; m++) {
                    leistungstexte[m].style.display = 'none';                    
                }
                for (let k = 0; k < orconts.length; k++) {
                    orconts[k].style.order = 'unset';
                    if (window.innerWidth <= 738) {
                        orconts[k].style.width = '90%';
                    } else {
                        orconts[k].style.width = '28%';
                    }
                }
                //set
                this.getElementsByClassName("leistungsplaceholder")[0].style.display = 'none';
                this.style.order = 3;
                for (let j = 0; j < orconts.length; j++) {
                    orconts[j].style.flexGrow = 1;
                }
                if (window.innerWidth <= 738) {
                    this.style.width = '90%';
                } else {
                    this.style.width = '80%';
                }
                this.parentNode.style.flexWrap = 'wrap';
                this.getElementsByClassName("leistungstext")[0].style.display = 'unset';
            })            

            }
        }

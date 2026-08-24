/* =========================================================
   KING PORTFOLIO — COMPLETE SCRIPT
========================================================= */


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .project, .about-text, .skill-card, .contact"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =========================================================
   PROJECT 3D MOUSE EFFECT
========================================================= */

const projectVideos = document.querySelectorAll(".project-video");

projectVideos.forEach((videoContainer) => {

    videoContainer.addEventListener("mousemove", (event) => {

        const rect =
            videoContainer.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -2;

        const rotateY =
            ((x - centerX) / centerX) * 2;

        videoContainer.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

    });


    videoContainer.addEventListener("mouseleave", () => {

        videoContainer.style.transform =
            "perspective(900px) rotateX(0deg) rotateY(0deg)";

    });

});


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

const navigationLinks =
    document.querySelectorAll(
        '.navbar a[href^="#"]'
    );

navigationLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        const target =
            document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =========================================================
   VIDEO HOVER EFFECT
========================================================= */

const videos =
    document.querySelectorAll(
        ".project-video video"
    );

videos.forEach((video) => {

    video.addEventListener("mouseenter", () => {

        video.style.transform =
            "scale(1.025)";

    });


    video.addEventListener("mouseleave", () => {

        video.style.transform =
            "scale(1)";

    });

});


/* =========================================================
   CURSOR GLOW
========================================================= */

const cursorGlow =
    document.createElement("div");

cursorGlow.classList.add("cursor-glow");

document.body.appendChild(cursorGlow);


document.addEventListener("mousemove", (event) => {

    cursorGlow.style.left =
        `${event.clientX}px`;

    cursorGlow.style.top =
        `${event.clientY}px`;

});


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


/* =========================================================
   CITY FUNCTIONS
   SUPERMARKET / AIRPORT
========================================================= */

const cityVideos = {

    supermarket:
        "https://res.cloudinary.com/vkrox899/video/upload/v1787582839/city-supermarket.mp4",

    airport:
        "https://res.cloudinary.com/vkrox899/video/upload/v1787582825/city-airport.mp4"

};


/*
   We look for the City Functions project.

   The HTML can use:
   data-city-video="supermarket"
   data-city-video="airport"

   on the two buttons.
*/

const cityButtons =
    document.querySelectorAll(
        "[data-city-video]"
    );


const cityProject =
    document.querySelector(
        ".project:nth-of-type(2)"
    );


/* Find the video inside the city project */

let cityVideo = null;

if (cityProject) {

    cityVideo =
        cityProject.querySelector(
            ".project-video video"
        );

}


/* =========================================================
   CITY VIDEO SWITCHER
========================================================= */

cityButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const selectedVideo =
            button.dataset.cityVideo;

        if (
            !cityVideo ||
            !cityVideos[selectedVideo]
        ) {
            return;
        }


        /*
           Change video source
        */

        cityVideo.src =
            cityVideos[selectedVideo];


        /*
           Reload video
        */

        cityVideo.load();


        /*
           Try to play automatically
        */

        const playPromise =
            cityVideo.play();


        if (
            playPromise !== undefined
        ) {

            playPromise.catch(() => {

                /*
                   Browser may block autoplay.
                   Controls remain available.
                */

            });

        }


        /* =================================================
           Active button
        ================================================= */

        cityButtons.forEach((item) => {

            item.classList.remove("active");

        });

        button.classList.add("active");

    });

});


/* =========================================================
   INITIAL CITY VIDEO
========================================================= */

if (cityVideo) {

    cityVideo.src =
        cityVideos.supermarket;

}


/* =========================================================
   PRELOAD CLOUDINARY VIDEOS
========================================================= */

Object.values(cityVideos).forEach((videoUrl) => {

    const preloadVideo =
        document.createElement("video");

    preloadVideo.preload =
        "metadata";

    preloadVideo.src =
        videoUrl;

});


/* =========================================================
   ACTIVE NAVIGATION SECTION
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        '.navbar nav a[href^="#"]'
    );


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (
                    entry.isIntersecting
                ) {

                    navLinks.forEach((link) => {

                        link.classList.remove(
                            "active"
                        );

                    });


                    const activeLink =
                        document.querySelector(
                            `.navbar nav a[href="#${entry.target.id}"]`
                        );


                    if (activeLink) {

                        activeLink.classList.add(
                            "active"
                        );

                    }

                }

            });

        },
        {
            threshold: 0.35
        }
    );


sections.forEach((section) => {

    sectionObserver.observe(section);

});


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        videos.forEach((video) => {

            video.pause();

        });

    }

});
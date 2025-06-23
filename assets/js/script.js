// Tambahkan fungsi Loader
window.addEventListener("load", function () {
    const loaderWrapper = document.getElementById("loader-wrapper");

    if (loaderWrapper) {
        setTimeout(() => {
        loaderWrapper.classList.add("hidden-wrapper"); // Mulai transisi opacity 0.5s
        }, 1500); // Loader tetap tampil minimal 1.5 detik agar animasi terlihat

        setTimeout(() => {
        loaderWrapper.style.display = "none"; // Sembunyikan setelah transisi selesai
        }, 2000); // Sesuai dengan durasi transition CSS + jeda tampilan
    }
});

// Paralax Effect
let glowCloud = document.getElementById("glow-left-cloud");
let leftCloud = document.getElementById("left-cloud");
let rightCloud = document.getElementById("right-cloud");
let leftStars = document.getElementById("left-stars");
let rightStars = document.getElementById("right-stars");
let heroText = document.querySelector("#landing-page h1");
let currentScale = 1;
let buttonGST = document.querySelector("#landing-page button");
let brinBuilding = document.getElementById("brin-building");

let leftStarsTop = leftStars.offsetTop;
let leftStarsLeft = leftStars.offsetLeft;   
let rightStarsTop = rightStars.offsetTop;
const parentRightStars = rightStars.offsetParent;
const offsetRight = parentRightStars.offsetWidth - (rightStars.offsetLeft + rightStars.offsetWidth);
let rightCloudTop = rightCloud.offsetTop;
let leftCloudTop = leftCloud.offsetTop;
let glowLeftCloud = glowCloud.offsetTop;

window.addEventListener('scroll', function(){
    let value = window.scrollY;
     // Skala mengecil dari 1 ke 0.8, misalnya
    let targetScale = Math.max(1 - value * 0.001, 0.7);
     // Interpolasi lambat ke target scale (semacam easing)
    currentScale += (targetScale - currentScale) * 0.1;
    let opacity = Math.max(1 - value / 50, 0); // hilang sepenuhnya setelah scroll 300px
    // contoh batas maksimum pergeseran top heroText = 200px
    let maxShift = window.innerWidth < 1280 ? 300 : 450;
    // Hitung posisi top heroText dengan batas
    let newTopHeroText = Math.min(value * 0.7, maxShift);
    let newTopLeftStars = Math.min(leftStarsTop + value * 0.7, maxShift);
    let newTopRightStars = Math.min(rightStarsTop + value * 0.7, maxShift);

    // leftStars.style.top = leftStarsTop + value * 0.9 + 'px';
    leftStars.style.top = newTopLeftStars + 'px';
    leftStars.style.left = leftStarsLeft + value * 0.2 + 'px';
    rightStars.style.top = newTopRightStars + value * 0.5 + 'px';
    rightStars.style.right = offsetRight + value * 0.5 + 'px';
    // heroText.style.top = value * 0.7 + 'px';
    heroText.style.top = newTopHeroText + 'px';
    heroText.style.transform = `scale(${currentScale})`;
    rightCloud.style.top = rightCloudTop + value * 0.2 + 'px';
    leftCloud.style.top = leftCloudTop + value * 0.2 + 'px';
    glowCloud.style.top = glowLeftCloud + value * 0.2 + 'px';
    buttonGST.style.opacity = opacity;
    buttonGST.style.top = -value * 1 + 'px';
})
// Paralax Effect

// Mencegah Inspect Element dan View Source
document.addEventListener("keydown", function (event) {
    if (
        (event.ctrlKey &&
        (event.key === "u" ||
            event.key === "i" ||
            event.key === "j" ||
            event.key === "s")) ||
        (event.ctrlKey &&
        event.shiftKey &&
        (event.key === "I" || event.key === "J" || event.key === "C")) ||
        event.key === "F12"
    ) {
        event.preventDefault();
        console.log("Inspect Element telah dinonaktifkan!"); // Debugging
    }
});
// Mencegah Klik Kanan
document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});
// Mencegah Drag & Drop pada Semua Gambar
document.addEventListener("dragstart", function (event) {
    event.preventDefault();
});
// Mencegah Klik Kanan pada Gambar Secara Spesifik
document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("contextmenu", (event) => event.preventDefault());
});

// Navbar Fixed
window.onscroll = function() {
    const header = document.querySelector('#navbar');
    const fixedNav = header.offsetTop;
    console.log(fixedNav);

    if (window.pageYOffset > fixedNav) {
        header.classList.add('navbar-fixed');
        header.classList.remove('navbar-absolute');
    } 
    else {
        header.classList.remove('navbar-fixed');
        header.classList.add('navbar-absolute');
    }
}

// Hamburger
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click' , function() {
    // hamburger.classList.toggle('hamburger-active');
    // navMenu.classList.toggle('hidden');
    const isMobile = window.innerWidth < 1024; // Tailwind 'lg' = 1024px

    if (navMenu.classList.contains("hidden")){
        document.body.classList.toggle('nav-open');
        navMenu.classList.remove("hidden");
        navMenu.style.transform = "translateY(-10px)";
        navMenu.style.opacity = "0";

        setTimeout(() => {
            navMenu.style.transform = "translateY(0)";
            navMenu.style.opacity = "1";
        }, 10);
    } else {
        if (isMobile) {
            navMenu.style.transform = "translateY(-10px)";
            navMenu.style.opacity = "0";
            document.body.classList.remove('nav-open');
            setTimeout(() => {
                navMenu.classList.add("hidden");
            }, 300);
        }
    }
});

function updateNavMenuDisplay() {
    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
        navMenu.classList.remove("hidden");
        navMenu.style.opacity = "1";
        navMenu.style.transform = "translateY(0)";
    } else {
        // Hanya tambahkan hidden jika menu belum dibuka (misalnya user belum klik hamburger)
        if (!document.body.classList.contains('nav-open')) {
            navMenu.classList.add("hidden");
        }
    }
}

// Jalankan saat halaman pertama kali dimuat
updateNavMenuDisplay();

// Jalankan juga saat ukuran layar berubah
window.addEventListener('resize', updateNavMenuDisplay);

//  FAQ SECTION - ACCORDION
document.addEventListener("DOMContentLoaded", () => {
    const accordions = document.querySelectorAll(".accordion-toggle");
    accordions.forEach((accordion) => {
        accordion.addEventListener("change", function () {
        // Menutup accordion lainnya saat yang ini dibuka
        accordions.forEach((item) => {
            if (item !== this) item.checked = false;
        });
        });
    });
});

// Klik di luar hamburger
// window.addEventListener('click' , function(e) {
//     if(e.target != hamburger && e.target != navMenu) {
//         // document.body.classList.remove('nav-open');
//         // navMenu.classList.add('hidden');
//         navMenu.style.transform = "translateY(-10px)";
//         navMenu.style.opacity = "0";
//         document.body.classList.remove('nav-open');
//         setTimeout(() => {
//             navMenu.classList.add("hidden");
//         }, 300);
//     }
// });

// HERO SECTION
document.addEventListener("DOMContentLoaded", function () {
    let getStartedBtn = document.querySelector(".button");
    let aboutSection = document.getElementById("about");

  // Ketika tombol Get Started diklik, scroll ke bagian About
    getStartedBtn.addEventListener("click", function () {
        aboutSection.scrollIntoView({ behavior: "smooth" });
    });
});

// LIVE HERO SECTION
document.addEventListener("DOMContentLoaded", function () {
  const liveHero = document.querySelector(".live-hero");
  const items = Array.from(document.querySelectorAll(".live-hero .live"));

  // Duplikasi elemen agar animasi berjalan tanpa jeda
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    liveHero.appendChild(clone);
  });
});
// LIVE HERO SECTION

// NUMBER COUNTING ANIMATION
const semuaAngka = document.querySelectorAll("#card span");
const container = document.getElementById("counters");

let activated = false;

window.addEventListener("scroll", () => {
    // tambahan
    const containerTop = container.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // if (pageYOffset > container.offsetTop - container.offsetHeight - 200
    if (containerTop < windowHeight - 50 && !activated) {
        semuaAngka.forEach(angka => {
            angka.innerText = 0;
            let count = 0;
            function updateCount(){
                const target = parseInt(angka.dataset.count);
                if (count < target){
                    count++;
                    angka.innerText = count;
                    setTimeout(updateCount, 20);
                } else {
                    angka.innerText = target;
                }
            }
            updateCount();
            activated = true;
        });
    }
    // } else if (pageYOffset < container.offsetTop - container.offsetHeight - 500
    //     || pageYOffset === 0 && activated === true
    // ) {
    //     semuaAngka.forEach(angka => {
    //         angka.innerText = 0;
    //     });
    //     activated = false;
    // }
    if (containerTop > windowHeight) {
        semuaAngka.forEach((angka) => {
        angka.innerText = 0;
        });
        activated = false;
    }
})
// NUMBER COUNTING ANIMATION

// POP UP DOKUMENTASI
const images = [...document.querySelectorAll('.image')];

// popup
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.close-btn');
// const imageName = document.querySelector('.image-name');
const largeImage = document.querySelector('.large-image');
const imageIndex = document.querySelector('.index');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

let index = 0; // will track our current image;

// Popup Image Agate 1
images.forEach((item, i) => {
    item.addEventListener('click', () => {
        updateImage(i);
        popup.classList.toggle('active');
    })
})
const updateImage = (i) => {
    let path = `assets/images/documentation/agate-${i+1}.jpg`;
    largeImage.src = path;
    // imageName.innerHTML = path;
    imageIndex.innerHTML = `0${i+1}`;
    index = i;
}

closeBtn.addEventListener('click', () => {
    popup.classList.toggle('active');
})

leftArrow.addEventListener('click', () => {
    if(index > 0){
        updateImage(index - 1);
    } else {
        // balik ke akhir
        updateImage(images.length - 1);
    }
})

rightArrow.addEventListener('click', () => {
    if(index < images.length - 1){
        updateImage(index + 1);
    } else {
        // balik ke awal
        updateImage(0);
    }
})

const images2 = [...document.querySelectorAll('.image-2')];
const popup2 = document.querySelector('.popup-2');
const closeBtn2 = document.querySelector('.close-btn-2');
// const imageName2 = document.querySelector('.image-name-2');
const largeImage2 = document.querySelector('.large-image-2');
const imageIndex2 = document.querySelector('.index-2');
const leftArrow2 = document.querySelector('.left-arrow-2');
const rightArrow2 = document.querySelector('.right-arrow-2');

let index2 = 0; // will track our current image;

// Popup Image Agate 2
images2.forEach((item, i) => {
    item.addEventListener('click', () => {
        updateImage2(i);
        popup2.classList.toggle('active-2');
    })
})
const updateImage2 = (i) => {
    let path = `assets/images/documentation/hgtc-${i+1}.jpg`;
    largeImage2.src = path;
    // imageName2.innerHTML = path;
    imageIndex2.innerHTML = `0${i+1}`;
    index2 = i;
}
closeBtn2.addEventListener('click', () => {
    popup2.classList.toggle('active-2');
})

leftArrow2.addEventListener('click', () => {
    if(index2 > 0){
        updateImage2(index2 - 1);
    } else {
        // balik ke akhir
        updateImage2(images2.length - 1);
    }
})

rightArrow2.addEventListener('click', () => {
    if(index2 < images2.length - 1){
        updateImage2(index2 + 1);
    } else {
        // balik ke awal
        updateImage2(0);
    }
})
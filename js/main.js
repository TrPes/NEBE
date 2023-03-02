
(function() {
  "use strict";

 
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }


  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)


  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }


  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  
  let backtotop = select('.strelka-za-nanazad')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  
  on('click', '.mobilen-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobilen')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobilen')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)


  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobilen')) {
        navbar.classList.remove('navbar-mobilen')
        let navbarToggle = select('.mobilen-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

 
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

 
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

 
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

 
  
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

})()




function togglePopup(){
  document.getElementById("popup-1").classList.toggle("active");
}
const images = document.querySelectorAll('.gallery img');
const lightbox = document.querySelector('.lightbox');
const mainImg = document.querySelector('.lightbox img');
const arrLeft = document.querySelector('.arrow-left');
const arrRight = document.querySelector('.arrow-right');

let imgIndex = 0;

images.forEach(img => {
  img.addEventListener('click', e => {
    mainImg.src = e.target.src;
    imgIndex = [...images].indexOf(img);

    lightbox.style.display = "flex";

    setTimeout(() => {
      lightbox.style.opacity = "1";
    }, 10);
  });
});

window.addEventListener('click', e => {
  if(e.target.classList.contains('lightbox')) {

    lightbox.style.opacity = "0";

    setTimeout(() => {
      lightbox.style.display = "none";
    }, 350);
  }
});

arrLeft.addEventListener('click', () => {

  imgIndex--;

  if(imgIndex < 0) {

    imgIndex = images.lenght - 1;
  }

  mainImg.src = images[imgIndex].src;
});

arrRight.addEventListener('click', () => {

  imgIndex++;

  if(imgIndex > images.length - 1) {

    imgIndex = 0;
  }

  mainImg.src = images[imgIndex].src;
});
var hamburger = document.getElementById("hamburger");
var menu = document.getElementById("navbar_list");

function closeMenu() {
    hamburger.classList.remove("is-open");
    menu.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
    var isOpen = hamburger.classList.toggle("is-open");
    menu.classList.toggle("is-open");
    hamburger.setAttribute("aria-expanded", isOpen);
}

hamburger.addEventListener("click", toggleMenu);

// Ferme le menu au clic sur un lien
document.querySelectorAll(".navbar_link").forEach(function(link) {
    link.addEventListener("click", closeMenu);
});

// Ferme le menu au clic en dehors
document.addEventListener("click", function(e) {
    if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
        closeMenu();
    }
});

// Animation typing du titre
var text = document.getElementById('presentation_job');
var splitText = text.innerText.split('');
text.innerHTML = '';
var l = 0;
setInterval(function() {
    if (l < splitText.length) {
        text.innerHTML += splitText[l];
        l++;
    }
}, 100);

// Affiche seulement les 3 premiers projects_card
var projects = document.getElementsByClassName("projects_card");
for (var i = 3; i < projects.length; i++) {
    projects[i].style.display = "none";
}

// Bouton pour afficher/masquer les autres projets
var button_projects = document.getElementById('button_projects');
var icon_show = document.getElementById('icon_show');
var icon_hide = document.getElementById('icon_hide');
button_projects.onclick = function() {
    if (projects[3].style.display === "none") {
        for (var i = 3; i < projects.length; i++) {
            projects[i].style.display = "block";
        }
        icon_show.style.display = "none";
        icon_hide.style.display = "inline-block";
    } else {
        for (var i = 3; i < projects.length; i++) {
            projects[i].style.display = "none";
        }
        icon_show.style.display = "inline-block";
        icon_hide.style.display = "none";
    }
};

// Slider outils — drag souris / swipe tactile
var toolsOverflow = document.querySelector('.tools_overflow');
var isDragging = false;
var dragStartX;
var dragScrollLeft;

toolsOverflow.addEventListener('mousedown', function(e) {
    isDragging = true;
    dragStartX = e.pageX - this.offsetLeft;
    dragScrollLeft = this.scrollLeft;
    this.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', function() {
    isDragging = false;
    toolsOverflow.style.cursor = 'grab';
});

document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    e.preventDefault();
    var x = e.pageX - toolsOverflow.offsetLeft;
    toolsOverflow.scrollLeft = dragScrollLeft - (x - dragStartX);
});

// Vérification existence cv.pdf
var btnCv = document.querySelector('.btn_cv');
fetch('cv.pdf', { method: 'HEAD' })
    .then(function(res) {
        if (!res.ok) btnCv.classList.add('disabled');
    })
    .catch(function() {
        btnCv.classList.add('disabled');
    });

// Année footer dynamique
document.getElementById('footer_year').textContent = new Date().getFullYear();

// Bouton retour en haut
var btnTop = document.getElementById('btn_top');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        btnTop.classList.add('visible');
    } else {
        btnTop.classList.remove('visible');
    }
});

btnTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Reveal sections au scroll
var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(function(el) {
    revealObserver.observe(el);
});

// Animation progress bars au scroll
var skillsObserver = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {
        document.querySelector('.progress_bar_html').classList.add('animated');
        document.querySelector('.progress_bar_css').classList.add('animated');
        document.querySelector('.progress_bar_javascript').classList.add('animated');
        document.querySelector('.progress_bar_react').classList.add('animated');
        skillsObserver.disconnect();
    }
}, { threshold: 0.3 });
skillsObserver.observe(document.querySelector('.skills_container1'));

//Messages dans la console
console.log("Bienvenue sur mon Portfolio !");
console.log("Développé en HTML/CSS/JS dans un style minimaliste et écran e-paper.");
console.log("Si vous avez des questions, n'hésitez pas à me contacter.");
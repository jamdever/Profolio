
const typedElement = document.getElementById('typed-text');

if (typedElement) {
    const texts = ["Software Developer", "Jr Developer"];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';

    (function type() {
        if (count === texts.length) count = 0;
        currentText = texts[count];
        letter = currentText.slice(0, ++index);

        typedElement.textContent = letter;

        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 1000); 
        } else {
            setTimeout(type, 150);
        }
    })();
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('a.nav-link').forEach(anchor => {
    if (anchor.getAttribute('href').startsWith('#')) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {

    // ================= DATA =================
    const dairyProducts = [
        { name: 'Pure Fresh Milk', img: 'puremilk.png', desc: 'Sourced daily.' },
        { name: 'Creamy Curd (Dahi)', img: 'curd.png', desc: 'Thick & rich.' },
        { name: 'Sweet Curd (Mithi Dahi)', img: 'sweetcurd.png', desc: 'Perfectly sweet.' },
        { name: 'Fresh Paneer', img: 'paneer2.png', desc: 'Soft & fresh.' },
        { name: 'Fresh Green Matar', img: 'matar.png', desc: 'Farm fresh peas.' }
    ];

    const coldDrinks = [
        'Sprite', 'Thums Up', 'Maaza', 'Mountain Dew', 'Lahori Jeera',
        'Kesar Badam Milk', 'Fanta', 'Campa', 'Pepsi', 'Coca Cola'
    ];

    const energyDrinks = [
        { name: 'Sting', img: 'sting.png' },
        { name: 'Red Bull', img: 'bull.png' },
        { name: 'Monster', img: 'monster.png' }
    ];

    const chocolates = [
        { name: 'Cadbury Dairy Milk', img: 'dairy.png' },
        { name: 'KitKat', img: 'kitkat.png' },
        { name: '5 Star', img: 'star.png' },
        { name: 'Lotte Choco Pie', img: 'pie.png' }
    ];

    const snacks = [
        { name: 'Bingo Tedhe Medhe', img: 'bingo.png' },
        { name: "Lay's Classic Salted", img: 'salt.png' },
        { name: "Lay's Cream & Onion", img: 'onion.png' },
        { name: "Lay's Spanish Tomato", img: 'tamato.png' },
        { name: 'Kurkure Masala Munch', img: 'kurkure.png' },
        { name: "Haldiram's Bhujia", img: 'bhujia.png' }
    ];

    // ================= GENERATE PRODUCT CARDS =================
    function createCard(img, name, desc = '', cls = '') {
        const card = document.createElement('div');
        card.className = `product-card ${cls} fade-in`;
        card.innerHTML = `
            <div class="badge">In Stock</div>
            <img src="${img}" alt="${name}" 
                 onerror="this.style.display='none'; this.parentElement.style.background='#e0e0e0'; this.parentElement.style.display='flex'; this.parentElement.style.alignItems='center'; this.parentElement.style.justifyContent='center'; this.parentElement.textContent='${name}'; this.parentElement.style.fontSize='1.2rem'; this.parentElement.style.fontWeight='bold'; this.parentElement.style.color='#333'; this.parentElement.style.padding='1rem'; this.parentElement.style.textAlign='center';">
            <div class="product-info">
                <h3>${name}</h3>
                ${desc ? `<p>${desc}</p>` : ''}
            </div>
        `;
        return card;
    }

    function renderGrid(id, items, isDrink = false) {
        const grid = document.getElementById(id);
        if (!grid) return;
        items.forEach(item => {
            let img, name, desc = '', cls = '';
            if (typeof item === 'string') {
                name = item;
                img = item.toLowerCase().replace(/ /g, '') + '.png';
                // Special cases for cold drinks
                if (name === 'Mountain Dew') img = 'dew.png';
                if (name === 'Kesar Badam Milk') img = 'kesar.png';
                if (name === 'Thums Up') img = 'Thumsup.png';
                if (name === 'Lahori Jeera') img = 'Lorahijeera.png';
                if (name === 'Coca Cola') img = 'cola.png';   // ✅ added this line
            } else {
                name = item.name;
                img = item.img;
                desc = item.desc || '';
                cls = item.cls || '';
            }
            const card = createCard(img, name, desc, cls);
            if (isDrink) {
                card.querySelector('img').style.height = '250px';
                card.querySelector('img').style.objectFit = 'cover';
            }
            grid.appendChild(card);
        });
    }

    // Render all grids
    renderGrid('dairyGrid', dairyProducts);
    renderGrid('coldDrinksGrid', coldDrinks, true);
    renderGrid('energyGrid', energyDrinks, true);
    renderGrid('chocoGrid', chocolates);
    renderGrid('snackGrid', snacks);

    // ================= GENERATE 25 CAKES =================
    const cakeGrid = document.getElementById('cakeGrid');
    if (cakeGrid) {
        for (let i = 1; i <=15; i++) {
            const card = createCard(`cake${i}.png`, `Cake ${i}`, 'Delicious & freshly baked.');
            card.querySelector('.badge').textContent = 'Fresh';
            cakeGrid.appendChild(card);
        }
    }

    // ================= SPA NAVIGATION =================
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-links');

    window.navigateTo = function(targetId) {
        pages.forEach(p => p.classList.remove('active'));
        navLinks.forEach(l => l.classList.remove('active'));

        const target = document.getElementById(targetId);
        if (target) target.classList.add('active');

        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${targetId}`) {
                link.classList.add('active');
            }
        });

        if (navMenu.classList.contains('active')) navMenu.classList.remove('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(initAnimations, 200);
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.getAttribute('href').substring(1);
            navigateTo(id);
        });
    });

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // ================= SCROLL ANIMATIONS =================
    function initAnimations() {
        const fadeEls = document.querySelectorAll('.fade-in:not(.visible)');
        const snackCards = document.querySelectorAll('.snack-card');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (entry.target.classList.contains('snack-card')) {
                        entry.target.classList.add('playful-pop');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        fadeEls.forEach(el => observer.observe(el));
        snackCards.forEach(card => {
            card.classList.remove('playful-pop');
            observer.observe(card);
        });
    }

    setTimeout(initAnimations, 300);

    // ================= SCROLL TO TOP =================
    const scrollBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        scrollBtn.classList.toggle('show', window.scrollY > 300);
    });
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inscriptionForm');
    const burgerMenu = document.querySelector('.burger-menu');
    const navWrapper = document.querySelector('.nav-wrapper');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Form Validation and Submission
    // form.addEventListener('submit', function(event) {
    //     event.preventDefault();
        
    //     const requiredFields = form.querySelectorAll('[required]');
    //     let isValid = true;

    //     requiredFields.forEach(field => {
    //         if (!field.value.trim()) {
    //             isValid = false;
    //             field.classList.add('error');
    //         } else {
    //             field.classList.remove('error');
    //         }
    //     });

    //     const emailField = document.getElementById('email');
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (!emailRegex.test(emailField.value)) {
    //         isValid = false;
    //         emailField.classList.add('error');
    //     }

    //     if (isValid) {
    //         // Collect form data
    //         const formData = {
    //             nom: document.getElementById('nom').value,
    //             prenom: document.getElementById('prenom').value,
    //             email: document.getElementById('email').value,
    //             telephone: document.getElementById('telephone').value,
    //             dateNaissance: document.getElementById('dateNaissance').value,
    //             formation: document.getElementById('formation').value,
    //             niveau: document.getElementById('niveau').value,
    //             motivation: document.getElementById('motivation').value
    //         };
            
    //         // Reset form
    //         form.reset();
    //     } else {
    //         alert('Veuillez remplir tous les champs obligatoires correctement.');
    //     }
    // });

    // Mobile Menu Toggle
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navWrapper.classList.toggle('show-nav');
    });

    // Dropdown Toggle for Mobile
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        dropdownLink.addEventListener('click', (e) => {
            // Prevent default link behavior
            e.preventDefault();
            
            // Toggle dropdown active state
            dropdown.classList.toggle('active');
        });
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            burgerMenu.classList.remove('active');
            navWrapper.classList.remove('show-nav');
            
            // Scroll to section
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Auto-scroll to Inscription on Page Load
    window.addEventListener('load', () => {
        const inscriptionSection = document.getElementById('inscription');
        if (inscriptionSection) inscriptionSection.scrollIntoView({ behavior: 'smooth' });
    });
});
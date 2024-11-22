document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.querySelector("#contact-form");

    // Function to highlight and pulse the form when the hash is #contact-us
    function highlightAndPulseContactForm() {
        if (window.location.hash === "#contact-us") {
            // Add both highlight and pulse effects
            contactForm.classList.add("highlight-form", "pulse-effect");

            // Remove highlight and pulse effect after 1.5 seconds
            setTimeout(() => {
                contactForm.classList.remove("highlight-form", "pulse-effect");
            }, 1500); // 1500 milliseconds = 1.5 seconds
        }
    }

    // Call the function on page load (in case the page loads with the hash already set)
    highlightAndPulseContactForm();

    // Listen for hash changes and call the function to highlight and pulse the form
    window.addEventListener("hashchange", highlightAndPulseContactForm);

    // Add an onclick event to the 'Contact Us' link
    const contactLink = document.querySelector('a[href="#contact-us"]');
    if (contactLink) {
        contactLink.addEventListener("click", function (event) {
            // Wait for the page to scroll to the form and then apply highlight and pulse
            setTimeout(() => {
                highlightAndPulseContactForm();
            }, 300); // Delay to make sure the page has time to scroll
        });
    }
});

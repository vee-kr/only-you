
/* =========================
   Page transition
========================= */

const navigationLinks = document.querySelectorAll(
    'a[href$=".html"]'
);

navigationLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        const destination = link.getAttribute("href");

        if (!destination || destination.startsWith("#")) {
            return;
        }

        event.preventDefault();

        document.body.classList.add("pageLeaving");

        window.setTimeout(() => {
            window.location.href = destination;
        }, 250);
    });
});

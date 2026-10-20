
/* Question page */

const maybeButton = document.getElementById("maybeButton");
const answerMessage = document.getElementById("answerMessage");

const noButton = document.getElementById("noButton");
const noButtonArea = document.getElementById("noButtonArea");
const noButtonMessage = document.getElementById("noButtonMessage");


/* "I need a little time" button */

if (maybeButton && answerMessage) {
    maybeButton.addEventListener("click", () => {
        answerMessage.hidden = false;
        maybeButton.textContent = "Take your time ♡";
        maybeButton.disabled = true;
    });
}


/* Playful "No" button */

if (noButton && noButtonArea && noButtonMessage) {
    let attempts = 0;

    const messages = [
        "No 🙈",
        "hehe, nice try ♡",
        "not so fast! ♡",
        "almost got me 🙈",
        "okay, you're persistent! ♡"
    ];

    // Keep the button centered when the page loads.
    function setInitialPosition() {
        const x = (noButtonArea.clientWidth - noButton.offsetWidth) / 2;

        noButton.style.left = `${Math.max(0, x)}px`;
        noButton.style.top = "0px";
    }

    setInitialPosition();

    // A small set of positions around the center.
    function getPositions() {
        const padding = 8;
        const buttonWidth = noButton.offsetWidth;
        const buttonHeight = noButton.offsetHeight;

        const maxX = Math.max(
            padding,
            noButtonArea.clientWidth - buttonWidth - padding
        );

        const maxY = Math.max(
            0,
            noButtonArea.clientHeight - buttonHeight
        );

        return [
            { x: padding, y: 0 },
            { x: maxX, y: 0 },
            { x: Math.max(padding, (maxX + padding) / 2), y: maxY },
            { x: padding, y: maxY },
            { x: maxX, y: maxY }
        ];
    }

    function moveNoButton(pointerX, pointerY) {
        const areaRect = noButtonArea.getBoundingClientRect();

        const localX = pointerX - areaRect.left;
        const localY = pointerY - areaRect.top;

        const currentX = noButton.offsetLeft;
        const currentY = noButton.offsetTop;

        const positions = getPositions()
            .filter(position => (
                Math.abs(position.x - currentX) > 35 ||
                Math.abs(position.y - currentY) > 20
            ));

        if (positions.length === 0) return;

        // Prefer a nearby position that is farther from the pointer.
        positions.sort((a, b) => {
            const distanceA = Math.hypot(
                a.x - localX,
                a.y - localY
            );

            const distanceB = Math.hypot(
                b.x - localX,
                b.y - localY
            );

            return distanceB - distanceA;
        });

        // Choose from the best two positions to keep movement natural.
        const choiceCount = Math.min(2, positions.length);
        const choice = positions[
            Math.floor(Math.random() * choiceCount)
        ];

        noButton.style.left = `${choice.x}px`;
        noButton.style.top = `${choice.y}px`;

        attempts += 1;

        noButton.textContent =
            messages[Math.min(attempts, messages.length - 1)];

        noButtonMessage.hidden = false;
        noButtonMessage.textContent =
            attempts >= 4
                ? "I just want you to feel comfortable answering. ♡"
                : "hehe ♡";
    }

    // Desktop: move when the cursor enters the button.
    noButton.addEventListener("pointerenter", event => {
        if (event.pointerType === "mouse") {
            moveNoButton(event.clientX, event.clientY);
        }
    });

    // Mobile: move when the button is touched.
    noButton.addEventListener("pointerdown", event => {
        if (event.pointerType === "touch") {
            event.preventDefault();
            moveNoButton(event.clientX, event.clientY);
        }
    });

    // Recenter safely if the screen size changes.
    window.addEventListener("resize", setInitialPosition);
}

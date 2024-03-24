/**
 * Animate the opacity of an HTML element over a specified duration.
 * @param {Object} options - Options object.
 * @param {number} options.time - The duration of the interpolation in milliseconds.
 * @param {HTMLElement} options.element - The HTML element to interpolate opacity.
 * @param {'visible' | 'hidden'} options.visibility - The desired visibility state.
 * @returns {void}
 */
const handleVisibility = ({ time, element, visibility }) => {
    if (!element?.style) {
        console.error('element not found to interpolate opacity');
        return;
    }

    const startOpacity = visibility === 'visible' ? 0 : 1;
    const endOpacity = visibility === 'visible' ? 1 : 0;

    if (visibility === 'visible') {
        element.style.opacity = startOpacity;
        element.style.display = 'flex';
        element.style.justifyContent = 'center';
    }

    let startTime;
    let requestId;

    const animate = (timestamp) => {
        if (!startTime) {
            startTime = timestamp;
        }

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / time, 1);

        element.style.opacity = startOpacity + progress * (endOpacity - startOpacity);

        if (progress < 1) {
            requestId = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(requestId);
            if (visibility === 'hidden') {
                element.style.display = 'none';
            }
        }
    };

    requestId = requestAnimationFrame(animate);
};

const setCookie = (name, value) => {
    const maxAge = 1209600; // Adding 14 days

    const cookieValue = `${encodeURIComponent(name)}=${encodeURIComponent(value)};max-age=${maxAge};path=/`;
    document.cookie = cookieValue;
}

const getCookie = (name) => {
    const cookieName = `${encodeURIComponent(name)}=`;
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return decodeURIComponent(cookie.substring(cookieName.length, cookie.length));
        }
    }
    return null; // Return null if cookie with the specified name is not found
}

const AGE_VERIFIED_COOKIE = 'age_verified';
const ANIMATION_LENGTH = 420;

// MAIN
(async () => {
    const previousCookie = getCookie(AGE_VERIFIED_COOKIE);
    // If the cookie is already set, bail!
    if (previousCookie) {
        return;
    }

    const AgeGate = document.querySelector("#AgeGate");
    const AgeLegalButton = document.querySelector("#AgeLegal");
    const AgeIllegalButton = document.querySelector("#AgeIllegal");
    const AgeRestrictedMessage = document.querySelector("#AgeRestricted");
    // Display the message on page load
    handleVisibility({ time: ANIMATION_LENGTH, element: AgeGate, visibility: 'visible' });

    AgeLegalButton.addEventListener('click', (e) => {
        e.preventDefault();
        handleVisibility({ time: ANIMATION_LENGTH, element: AgeGate, visibility: 'hidden' });
        setCookie(AGE_VERIFIED_COOKIE, true);
    });

    AgeIllegalButton.addEventListener('click', (e) => {
        e.preventDefault();
        handleVisibility({ time: ANIMATION_LENGTH, element: AgeRestrictedMessage, visibility: 'visible' });
    });
})();
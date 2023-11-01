const settings = {
    spawnPoint: { x: 100, y: 54 },
    spawnRadius: 35,
    maxOpacityDuration: 1000,
    maxSize: 65,
    minSize: 5,
    maxSpeed: 2,
    minSpeed: 1.2,
    maxOpacity: 0.75,
    minOpacity: 0.2,
    opacityDeviation: 0.2,
    particleLife: 5000,
    fadeOutDuration: 300
};

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function createParticle() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    const size = getRandomArbitrary(settings.minSize, settings.maxSize);
    const direction = Math.random() * Math.PI * 2;
    const speed = getRandomArbitrary(settings.minSpeed, settings.maxSpeed);
    const endX = settings.spawnPoint.x + Math.cos(direction) * speed * 100;
    const endY = settings.spawnPoint.y + Math.sin(direction) * speed * 100;

    const spawnOffsetX = (Math.random() - 0.5) * settings.spawnRadius;
    const spawnOffsetY = (Math.random() - 0.5) * settings.spawnRadius;

    svg.setAttribute("viewBox", "0 0 70 85");
    svg.style.width = `${size * (172/70)}px`;
    svg.style.height = `${size}px`;
    svg.style.position = "absolute";
    svg.style.left = `${settings.spawnPoint.x + spawnOffsetX - (size * (172/70) / 2)}px`;
    svg.style.top = `${settings.spawnPoint.y + spawnOffsetY - (size / 2)}px`;
    svg.classList.add("particle");

    path.setAttribute("d", "M51.1334 25.6181L63.9882 5.52476L55.201 0L40.2107 23.4314C38.4364 22.8321 36.7948 22.1623 35.2216 21.4806C34.5291 21.1804 33.8185 20.8598 33.0896 20.5308C28.788 18.5897 23.8467 16.3599 18.2095 16.3599C11.0332 16.3599 4.96391 17.9074 0 20.2102V32.1121C4.05884 29.2205 10.0594 26.6753 18.2095 26.6753C21.4245 26.6753 24.0555 27.8409 28.4229 29.7759L28.4234 29.7761C29.2352 30.1357 30.107 30.522 31.0537 30.9323C32.1471 31.4061 33.2937 31.8844 34.506 32.3484L23.8808 48.9566C22.0742 48.5175 20.1846 48.2438 18.2095 48.2438C11.0332 48.2438 4.96391 49.7912 0 52.0941V63.996C3.97979 61.1606 9.82641 58.6584 17.7357 58.562L4.35642 79.4752L13.1436 85L28.1523 61.5399C28.2418 61.5795 28.332 61.6194 28.4229 61.6597L28.4234 61.6599C29.2352 62.0196 30.107 62.4058 31.0537 62.8161C36.8194 65.3148 44.0649 67.9368 54.6284 67.9368C60.3368 67.9368 65.4962 66.4967 70 64.3319V52.3802C65.5732 55.4783 60.3749 57.6214 54.6284 57.6214C46.0364 57.6214 40.2752 55.5545 35.2216 53.3644C34.7523 53.161 34.2746 52.9482 33.7886 52.7297L44.9666 35.2574C47.8543 35.7522 51.0511 36.0529 54.6284 36.0529C60.3368 36.0529 65.4962 34.6128 70 32.4481V20.4963C65.5732 23.5945 60.3749 25.7375 54.6284 25.7375C53.4083 25.7375 52.2454 25.6958 51.1334 25.6181Z");
    path.style.fill = "var(--tg-theme-text-color, #000000)";

    svg.appendChild(path);
    document.querySelector("#particles_container").appendChild(svg);

    const targetOpacity = getRandomArbitrary(settings.minOpacity, settings.maxOpacity) + getRandomArbitrary(-settings.opacityDeviation, settings.opacityDeviation);

    const animation = svg.animate([
        {
            left: `${settings.spawnPoint.x + spawnOffsetX - (size * (172/70) / 2)}px`,
            top: `${settings.spawnPoint.y + spawnOffsetY - (size / 2)}px`,
            opacity: 0
        },
        {
            left: `${endX - (size * (172/70) / 2)}px`,
            top: `${endY - (size / 2)}px`,
            opacity: targetOpacity
        }
    ], {
        duration: settings.particleLife - settings.fadeOutDuration,
        fill: 'forwards'
    });

    animation.onfinish = () => {
        const fadeOut = svg.animate([
            { opacity: targetOpacity },
            { opacity: 0 }
        ], {
            duration: settings.fadeOutDuration,
            fill: 'forwards'
        });

        fadeOut.onfinish = () => {
            svg.remove();
        };
    };
}

setInterval(createParticle, 300);
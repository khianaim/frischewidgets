export function throwConfetti(container) {
  const sound = new Audio("sounds/shine.mp3");
  sound.play();  // Fixed the typo here (was missing parentheses)

  const confettiAmount = 100;
  for (let i = 0; i < confettiAmount; i++) {
    const c = document.createElement("i");
    c.className = "confetti-piece";

    // Random transform values
    const x = `${Math.random() * 500 - 250}px`;
    const y = `${Math.random() * 225 - 150}px`;
    const r = `${Math.random() * 360}deg`;

    // Custom properties for animation
    c.style.setProperty("--x", x);
    c.style.setProperty("--y", y);
    c.style.setProperty("--r", r);

    // Random color
    c.style.background = `hsla(${Math.floor(Math.random() * 360)}, 100%, 50%, 1)`;

    container.appendChild(c);

    // Remove after animation
    setTimeout(() => {
      c.remove();
    }, 1000);
  }
}

(() => {
  "use strict";
  // 5 December 2026, 7:00 PM Egypt time (UTC+02:00 on this date).
  const weddingDate = new Date("2026-12-05T19:00:00+02:00").getTime();
  const fields = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };
  const note = document.getElementById("countdown-note");
  const pad = value => String(value).padStart(2, "0");

  function updateCountdown() {
    const remaining = weddingDate - Date.now();
    if (remaining <= 0) {
      Object.values(fields).forEach(field => { field.textContent = "00"; });
      note.textContent = "الليلة بدأت… نتمنى لكم أجمل الأوقات معنا.";
      return;
    }
    const total = Math.floor(remaining / 1000);
    fields.days.textContent = String(Math.floor(total / 86400));
    fields.hours.textContent = pad(Math.floor((total % 86400) / 3600));
    fields.minutes.textContent = pad(Math.floor((total % 3600) / 60));
    fields.seconds.textContent = pad(total % 60);
  }
  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  const music = document.getElementById("wedding-music");
  const button = document.getElementById("music-toggle");
  const label = document.getElementById("music-label");

  function reflect(isPlaying) {
    button.setAttribute("aria-pressed", String(isPlaying));
    button.setAttribute("aria-label", isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى");
    label.textContent = isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى";
  }
  button.addEventListener("click", async () => {
    if (music.paused) {
      try {
        await music.play();
        reflect(true);
      } catch (error) {
        reflect(false);
        label.textContent = "تعذر التشغيل — حاول مرة أخرى";
      }
    } else {
      music.pause();
      reflect(false);
    }
  });
  music.addEventListener("pause", () => reflect(false));
  music.addEventListener("play", () => reflect(true));
})();

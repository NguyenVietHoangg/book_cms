// Toasttt function
export  function Toasttt({ title = "", message = "", type = "info", duration = 3000 }) {
    console.log("da~ vao`")
  const main = document.getElementById("toasttt");
    if (main) {
      const toasttt = document.createElement("div");
  
      // Auto remove toasttt
      const autoRemoveId = setTimeout(function () {
        main.removeChild(toasttt);
      }, duration + 1000);
  
      // Remove toasttt when clicked
      toasttt.onclick = function (e) {
        if (e.target.closest(".toasttt__close")) {
          main.removeChild(toasttt);
          clearTimeout(autoRemoveId);
        }
      };
  
      const icons = {
        success: "fas fa-check-circle",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-circle",
        error: "fas fa-exclamation-circle"
      };
      const icon = icons[type];
      const delay = (duration / 1000).toFixed(2);
  
      toasttt.classList.add("toasttt", `toasttt--${type}`);
      toasttt.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
  
      toasttt.innerHTML = `
                      <div class="toasttt__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toasttt__body">
                          <h3 class="toasttt__title">${title}</h3>
                          <p class="toasttt__msg">${message}</p>
                      </div>
                      <div class="toasttt__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
      main.appendChild(toasttt);
    }
  }
  
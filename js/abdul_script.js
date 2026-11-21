document.addEventListener("DOMContentLoaded", function () {
  function abdulEscapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // 1. Mobile Navigation Toggle
  const abdulNavToggle = document.getElementById("abdul_nav_toggle");
  const abdulMenu = document.querySelector(".abdul_menu");

  if (abdulNavToggle && abdulMenu) {
    abdulNavToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      abdulMenu.classList.toggle("abdul_menu_open");
      const isExpanded = abdulMenu.classList.contains("abdul_menu_open");
      abdulNavToggle.setAttribute("aria-expanded", isExpanded ? "true" : "false");
    });

    abdulMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        abdulMenu.classList.remove("abdul_menu_open");
        abdulNavToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", function (e) {
      if (
        abdulMenu.classList.contains("abdul_menu_open") &&
        !abdulMenu.contains(e.target) &&
        !abdulNavToggle.contains(e.target)
      ) {
        abdulMenu.classList.remove("abdul_menu_open");
        abdulNavToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // 2. Sticky Header Shadow & Back-to-Top Button
  const abdulHeader = document.getElementById("abdul_header");
  const abdulBackTop = document.getElementById("abdul_back_top");

  window.addEventListener("scroll", function () {
    if (abdulHeader) {
      if (window.scrollY > 30) {
        abdulHeader.classList.add("abdul_header_scrolled");
      } else {
        abdulHeader.classList.remove("abdul_header_scrolled");
      }
    }
    if (abdulBackTop) {
      if (window.scrollY > 320) {
        abdulBackTop.classList.add("abdul_show_top");
      } else {
        abdulBackTop.classList.remove("abdul_show_top");
      }
    }
  });

  if (abdulBackTop) {
    abdulBackTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 3. Animasi Counter Statistik (Beranda)
  const abdulCounters = document.querySelectorAll(".abdul_stat_num");
  if (abdulCounters.length > 0) {
    abdulCounters.forEach(function (counter) {
      const target = parseInt(counter.getAttribute("data-target"), 10);
      const suffix = counter.getAttribute("data-suffix") || "";
      if (!isNaN(target)) {
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 45));
        const timer = setInterval(function () {
          current += step;
          if (current >= target) {
            counter.textContent = target.toLocaleString("id-ID") + suffix;
            clearInterval(timer);
          } else {
            counter.textContent = current.toLocaleString("id-ID") + suffix;
          }
        }, 28);
      }
    });
  }

  // 4 & 5. Filter Kategori Umum & Pencarian Berita (Sinkron)
  const abdulFilterButtons = document.querySelectorAll(".abdul_filter_btn");
  const abdulFilterItems = document.querySelectorAll("[data-abdul-category]");
  const abdulPostSearch = document.getElementById("abdul_post_search");
  let abdulActiveCategory = "semua";

  function abdulApplyFilters() {
    const keyword = abdulPostSearch ? abdulPostSearch.value.toLowerCase().trim() : "";
    abdulFilterItems.forEach(function (item) {
      const itemCategory = item.getAttribute("data-abdul-category");
      const matchCategory = abdulActiveCategory === "semua" || itemCategory === abdulActiveCategory;
      const matchKeyword = !keyword || item.textContent.toLowerCase().includes(keyword);
      item.style.display = matchCategory && matchKeyword ? "" : "none";
    });
  }

  if (abdulFilterButtons.length > 0 && abdulFilterItems.length > 0) {
    abdulFilterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        abdulFilterButtons.forEach(function (b) {
          b.classList.remove("abdul_filter_active");
        });
        btn.classList.add("abdul_filter_active");
        abdulActiveCategory = btn.getAttribute("data-abdul-filter") || "semua";
        abdulApplyFilters();
      });
    });
  }

  if (abdulPostSearch) {
    abdulPostSearch.addEventListener("input", abdulApplyFilters);
  }

  // 6. Modal Lightbox Galeri (galeri.html) - Mendukung file foto <img>
  const abdulLightbox = document.getElementById("abdul_lightbox");
  const abdulModalTitle = document.getElementById("abdul_modal_title");
  const abdulModalDesc = document.getElementById("abdul_modal_desc");
  const abdulModalMeta = document.getElementById("abdul_modal_meta");
  const abdulModalVisual = document.getElementById("abdul_modal_visual");
  const abdulModalClose = document.getElementById("abdul_modal_close");
  const abdulGalleryItems = document.querySelectorAll(".abdul_gallery_item");

  if (abdulLightbox && abdulGalleryItems.length > 0) {
    abdulGalleryItems.forEach(function (item) {
      item.addEventListener("click", function () {
        const title = item.getAttribute("data-abdul-title") || "Dokumentasi Kegiatan";
        const desc = item.getAttribute("data-abdul-desc") || "";
        const meta = item.getAttribute("data-abdul-meta") || "";
        const imgEl = item.querySelector("img");

        if (abdulModalTitle) abdulModalTitle.textContent = title;
        if (abdulModalDesc) abdulModalDesc.textContent = desc;
        if (abdulModalMeta) abdulModalMeta.textContent = meta;
        if (abdulModalVisual && imgEl) {
          abdulModalVisual.innerHTML = "";
          const modalImg = document.createElement("img");
          modalImg.src = imgEl.getAttribute("src");
          modalImg.alt = title;
          modalImg.className = "abdul_modal_img";
          abdulModalVisual.appendChild(modalImg);
        }
        abdulLightbox.classList.add("abdul_modal_open");
      });
    });

    if (abdulModalClose) {
      abdulModalClose.addEventListener("click", function () {
        abdulLightbox.classList.remove("abdul_modal_open");
      });
    }

    abdulLightbox.addEventListener("click", function (e) {
      if (e.target === abdulLightbox) {
        abdulLightbox.classList.remove("abdul_modal_open");
      }
    });
  }

  // Tutup modal lightbox / menu mobile dengan tombol Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (abdulLightbox && abdulLightbox.classList.contains("abdul_modal_open")) {
        abdulLightbox.classList.remove("abdul_modal_open");
      }
      if (abdulMenu && abdulMenu.classList.contains("abdul_menu_open")) {
        abdulMenu.classList.remove("abdul_menu_open");
        if (abdulNavToggle) abdulNavToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  // 7. Form Kontak Interaktif (kontak.html)
  const abdulContactForm = document.getElementById("abdul_contact_form");
  if (abdulContactForm) {
    abdulContactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nama = document.getElementById("abdul_input_nama").value.trim();
      const email = document.getElementById("abdul_input_email").value.trim();
      const telepon = document.getElementById("abdul_input_telepon").value.trim();
      const kategori = document.getElementById("abdul_input_kategori").value;
      const pesan = document.getElementById("abdul_input_pesan").value.trim();

      const errorBox = document.getElementById("abdul_contact_error");
      const successBox = document.getElementById("abdul_contact_success");
      const logList = document.getElementById("abdul_message_log");

      if (nama.length < 3 || !email.includes("@") || pesan.length < 10) {
        if (errorBox) {
          errorBox.style.display = "block";
          errorBox.textContent =
            "Mohon lengkapi nama (minimal 3 karakter), alamat email yang valid, dan isi pesan (minimal 10 karakter).";
        }
        if (successBox) successBox.style.display = "none";
        return;
      }

      const safeNama = abdulEscapeHtml(nama);
      const safeEmail = abdulEscapeHtml(email);
      const safeTelepon = abdulEscapeHtml(telepon);
      const safeKategori = abdulEscapeHtml(kategori);
      const safePesan = abdulEscapeHtml(pesan);

      if (errorBox) errorBox.style.display = "none";
      if (successBox) {
        successBox.style.display = "block";
        successBox.innerHTML =
          "<strong>Terima kasih, " +
          safeNama +
          "!</strong> Pesan Anda mengenai <em>" +
          safeKategori +
          "</em> telah berhasil dikirim ke Tata Usaha SMA Cendekia Galunggung Tasikmalaya. Balasan akan dikirim melalui email <strong>" +
          safeEmail +
          "</strong>" +
          (safeTelepon ? " atau WhatsApp <strong>" + safeTelepon + "</strong>." : ".");
      }

      if (logList) {
        const entry = document.createElement("div");
        entry.className = "abdul_card";
        entry.style.marginTop = "12px";
        entry.style.padding = "14px 18px";
        entry.innerHTML =
          "<strong>" +
          safeNama +
          "</strong> <span style='color:#0d7377;font-size:0.82rem;font-weight:700;'>(" +
          safeKategori +
          ")</span><p style='margin-top:6px;font-size:0.9rem;color:#475569;'>" +
          safePesan +
          "</p>";
        logList.prepend(entry);
      }

      abdulContactForm.reset();
    });
  }
});

$(document).ready(() => {
  // Mobile menu toggle
  $(".menu-toggle").click(function () {
    $(this).toggleClass("active");
    $(".menu").toggleClass("active");

    if ($(this).hasClass("active")) {
      $(this).find("span:nth-child(1)").css({
        transform: "rotate(45deg) translate(5px, 5px)",
      });
      $(this).find("span:nth-child(2)").css({
        opacity: "0",
      });
      $(this).find("span:nth-child(3)").css({
        transform: "rotate(-45deg) translate(7px, -7px)",
      });
    } else {
      $(this).find("span").css({
        transform: "none",
        opacity: "1",
      });
    }
  });

  // Smooth scrolling for anchor links
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $("html, body").animate(
      {
        scrollTop: $target.offset().top - 70,
      },
      800,
      "swing"
    );
  });

  // Header scroll effect
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $("header").css({
        padding: "5px 0",
        "box-shadow": "0 2px 10px rgba(0, 0, 0, 0.1)",
      });
    } else {
      $("header").css({
        padding: "15px 0",
        "box-shadow": "0 2px 10px rgba(0, 0, 0, 0.05)",
      });
    }
  });

  // Mobile menu toggle
  $(".mobile-menu-toggle").click(() => {
    $(".mobile-menu").slideToggle(300);
  });

  // Close mobile menu when clicking outside
  $(document).click((event) => {
    if (!$(event.target).closest(".mobile-menu, .mobile-menu-toggle").length) {
      $(".mobile-menu").slideUp(300);
    }
  });

  // Fetch daily fact using AJAX
  $.ajax({
    url: "http://numbersapi.com/1/30/date?json",
    type: "GET",
    dataType: "json",
    success: (data) => {
      $("#fact-text").html(data.text);

      // Also add to another area in the page
      $("#fact-footer").html(
        "<h4>Today's Fitness Fact:</h4><p>" + data.text + "</p>"
      );
    },
    error: () => {
      $("#fact-text").html(
        "Could not load today's fact. Please try again later."
      );
      $("#fact-footer").html("<p>Could not load today's fact.</p>");
    },
  });

  // File upload functionality
  const uploadArea = document.getElementById("uploadArea");
  const fileInput = document.getElementById("fileInput");
  const previewContainer = document.getElementById("previewContainer");
  const uploadPreview = document.getElementById("uploadPreview");
  const uploadProgress = document.getElementById("uploadProgress");
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");
  const uploadAllBtn = document.getElementById("uploadAllBtn");
  const clearBtn = document.getElementById("clearBtn");
  const galleryContainer = document.getElementById("galleryContainer");

  let filesToUpload = [];

  // Open file dialog when clicking on upload area
  uploadArea.addEventListener("click", () => {
    fileInput.click();
  });

  // Handle drag and drop events
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    uploadArea.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  ["dragenter", "dragover"].forEach((eventName) => {
    uploadArea.addEventListener(eventName, highlight, false);
  });
  ["dragleave", "drop"].forEach((eventName) => {
    uploadArea.addEventListener(eventName, unhighlight, false);
  });

  function highlight() {
    uploadArea.classList.add("highlight");
  }

  function unhighlight() {
    uploadArea.classList.remove("highlight");
  }

  // Handle dropped files
  uploadArea.addEventListener("drop", handleDrop, false);

  function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  }

  // Handle selected files from input
  fileInput.addEventListener("change", function () {
    handleFiles(this.files);
  });

  function handleFiles(files) {
    files = [...files];

    if (files.length > 0) {
      uploadPreview.style.display = "block";
    }

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        if (file.size <= 5 * 1024 * 1024) {
          // 5MB limit
          addFileToPreview(file);
          filesToUpload.push(file);
        } else {
          alert("File too large: " + file.name + " (Max size: 5MB)");
        }
      } else {
        alert("Not an image file: " + file.name);
      }
    });
  }

  function addFileToPreview(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const previewItem = document.createElement("div");
      previewItem.className = "preview-item";

      const img = document.createElement("img");
      img.src = e.target.result;

      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-btn";
      removeBtn.innerHTML = "×";

      // Store file reference for removal
      previewItem.dataset.fileName = file.name;

      removeBtn.addEventListener("click", () => {
        // Remove from preview
        previewItem.remove();

        // Remove from files to upload
        filesToUpload = filesToUpload.filter((f) => f.name !== file.name);

        // Hide preview container if empty
        if (previewContainer.children.length === 0) {
          uploadPreview.style.display = "none";
        }
      });

      previewItem.appendChild(img);
      previewItem.appendChild(removeBtn);
      previewContainer.appendChild(previewItem);
    };

    reader.readAsDataURL(file);
  }

  // Upload all files button
  uploadAllBtn.addEventListener("click", () => {
    if (filesToUpload.length === 0) {
      alert("Please select files to upload first.");
      return;
    }

    uploadProgress.style.display = "block";

    // Simulate upload progress
    let progress = 0;
    const totalFiles = filesToUpload.length;
    let uploadedFiles = 0;

    const progressInterval = setInterval(() => {
      progress += 5;
      progressFill.style.width = progress + "%";
      progressText.textContent = progress + "%";

      if (progress >= 100) {
        clearInterval(progressInterval);
        uploadedFiles++;

        // Add to gallery
        addToGallery(filesToUpload[uploadedFiles - 1]);

        if (uploadedFiles < totalFiles) {
          // Reset progress for next file
          progress = 0;
        } else {
          // All files uploaded
          setTimeout(() => {
            uploadProgress.style.display = "none";
            uploadPreview.style.display = "none";
            previewContainer.innerHTML = "";
            filesToUpload = [];
            alert("All files uploaded successfully!");
          }, 500);
        }
      }
    }, 100);

    // In a real application, you would use AJAX to send the files to the server
    // Example of how the AJAX call would look:
    /*
    const formData = new FormData();
    filesToUpload.forEach(file => {
        formData.append('images', file);
    });

    $.ajax({
        url: '/upload-multiple',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        xhr: function() {
            const xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener('progress', function(e) {
                if (e.lengthComputable) {
                    const percent = Math.round((e.loaded / e.total) * 100);
                    progressFill.style.width = percent + '%';
                    progressText.textContent = percent + '%';
                }
            });
            return xhr;
        },
        success: function(response) {
            // Handle success
            response.files.forEach(file => {
                addToGallery(file);
            });

            uploadProgress.style.display = 'none';
            uploadPreview.style.display = 'none';
            previewContainer.innerHTML = '';
            filesToUpload = [];
            alert('All files uploaded successfully!');
        },
        error: function() {
            alert('Failed to upload files. Please try again.');
        }
    });
    */
  });

  // Clear all files button
  clearBtn.addEventListener("click", () => {
    previewContainer.innerHTML = "";
    uploadPreview.style.display = "none";
    filesToUpload = [];
  });

  function addToGallery(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const galleryItem = document.createElement("div");
      galleryItem.className = "gallery-item";

      const img = document.createElement("img");
      img.src = e.target.result;

      galleryItem.appendChild(img);
      galleryContainer.appendChild(galleryItem);
    };

    reader.readAsDataURL(file);
  }

  // Add animations on scroll
  $(window).scroll(() => {
    $(".destination-card, .side-story, .main-story").each(function () {
      const elementTop = $(this).offset().top;
      const elementVisible = 150;
      const windowHeight = $(window).height();
      const scrollTop = $(window).scrollTop();

      if (scrollTop > elementTop - windowHeight + elementVisible) {
        $(this).css({
          opacity: "1",
          transform: "translateY(0)",
        });
      } else {
        $(this).css({
          opacity: "0",
          transform: "translateY(20px)",
        });
      }
    });
  });

  // Initialize animations
  $(".destination-card, .side-story, .main-story").css({
    opacity: "0",
    transform: "translateY(20px)",
    transition: "all 0.5s ease",
  });

  // Trigger scroll once to initialize animations
  $(window).trigger("scroll");
});

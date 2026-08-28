const contentInject = (name) => {
  fetch(`./projects/${name}/index.html`)
    .then((r) => r.text())
    .then((html) => {
      document.querySelector("#content").innerHTML = html;
    });
};


/* Hover preview. Any sidebar button carrying data-preview shows that image
   beside the cursor — adding a project means adding the attribute, nothing
   here changes. */
const preview = document.createElement("img");
preview.className = "preview";
document.body.appendChild(preview);

const movePreview = (e) => {
  /* Clamp so a preview summoned near the bottom of the list doesn't hang off
     the edge of the window. offsetHeight is 0 until the image decodes, which
     just means the first frame sits at the cursor. */
  const top = Math.min(
    e.clientY + 16,
    window.innerHeight - preview.offsetHeight - 10,
  );
  preview.style.left = `${e.clientX + 16}px`;
  preview.style.top = `${Math.max(10, top)}px`;
};

const showPreview = (e) => {
  preview.src = e.currentTarget.dataset.preview;
  preview.classList.add("show");
  movePreview(e);
};

const hidePreview = () => preview.classList.remove("show");

/* Touch screens report a hover on tap and then leave it stuck, so the preview
   is for pointer devices only. */
if (window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll("[data-preview]").forEach((button) => {
    button.addEventListener("mouseenter", showPreview);
    button.addEventListener("mousemove", movePreview);
    button.addEventListener("mouseleave", hidePreview);
  });
}

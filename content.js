const contentInject = (name) => {
  fetch(`./projects/${name}/index.html`)
    .then((r) => r.text())
    .then((html) => {
      document.querySelector("#content").innerHTML = html;
    });
};
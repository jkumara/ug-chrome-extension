(() => {
  const toggleElement = e => {
    e.style.display = e.style.display === "none" ? "initial" : "none";
  };

  const setup = () => {
    const css = `
      html {
        background: #fff;
      }

      .js-reader {
        position: absolute;
        left: 0;
        top: 0;

        padding: 0.5rem;

        width: 100%;
        height: 100%;

        background: #fff;
        color: #000;

        column-width: 20vw;
        column-fill: auto;

      }

      .js-reader pre {
        white-space: pre-wrap;
      }

      .js-reader pre > span {
        break-inside: avoid;
      }

      .js-reader p {
        margin: 0 0 1em;
        font-family: "Roboto Mono", monospace;
        column-span: all;
        column-gap: 1em;
      }
    `;

    const style = document.createElement("style");
    style.innerText = css;
    document.head.appendChild(style);

    const readerContentWrapper = document.createElement("div");
    readerContentWrapper.classList.add("js-reader");

    const title = document.createElement("p");
    title.innerText = document.querySelector(
      "article section header"
    ).innerText;

    readerContentWrapper.appendChild(title);
    readerContentWrapper.appendChild(
      document.querySelector("code").cloneNode(true)
    );

    const originalContentWrapper = document.createElement("div");
    originalContentWrapper.classList.add("js-original");
    originalContentWrapper.style.display = "none";

    originalContentWrapper.appendChild(
      document.querySelector(".js-page.js-global-wrapper")
    );

    document.body.appendChild(readerContentWrapper);
    document.body.appendChild(originalContentWrapper);
    document.body.classList.add("js-reader-visible");
  };

  const readerContent = document.querySelector(".js-reader");

  if (readerContent) {
    const originalContent = document.querySelector(".js-original");
    toggleElement(readerContent);
    toggleElement(originalContent);
  } else {
    setup();
  }
})();

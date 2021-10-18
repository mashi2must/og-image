import marked from "marked";
import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";
const twemoji = require("twemoji");
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

function getCss(theme: string, fontSize: string) {
  let background = "white";
  let background_img_url = "https://site-groupie.vercel.app/ogp/ogp.png";

  if (theme === "dark") {
    background = "black";
  }
  return `
    /* The New resetCSS */
    *:where(:not(iframe, canvas, img, svg, video):not(svg *)) {
      all: unset;
      display: revert;
    }

    /* Preferred box-sizing value */
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    /* Remove list styles (bullets/numbers) */
    ol, ul {
        list-style: none;
    }

    /* For images to not be able to exceed their container */
    img {
        max-width: 100%;
    }

    /* removes spacing between cells in tables */
    table {
        border-collapse: collapse;
    }

    /* revert the 'white-space' property for textarea elements on Safari */
    textarea {
        white-space: revert;
    }

    @import url('https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap');


      body {
        background: ${background};
        background-image: url(${background_img_url});
        background-size: cover;
        background-repeat:no-repeat;
        background-position:top;
        height: 630px;
        width: 1200px
        display: flex;
        justify-content: center;
        align-items: center;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }


    .plus {
        color: #BBB;
        font-family: Times New Roman, Verdana;
        font-size: 100px;
    }

    .spacer {
        margin: 0px;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }
    
    .heading {
        font-family: 'Kosugi Maru', sans-serif;
        font-size: ${sanitizeHtml(fontSize)};
        line-height: 1.8;
        width:630px;
        padding:220px 40px;
        margin:0 auto;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text, theme, md, fontSize } = parsedReq;
  return `<!DOCTYPE html>
<html lang="ja
">
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontSize)}
    </style>
    <body>       
            <div class="heading">${emojify(
              md ? marked(text) : sanitizeHtml(text)
            )}
            </div>
    </body>
</html>`;
}

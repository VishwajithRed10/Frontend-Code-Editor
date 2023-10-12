
function run(){

    let HTMLCode = document.getElementById("html-code").value;
    let CSSCode = document.getElementById("css-code").value;
    let JsCode = document.getElementById("js-code").value;
    let Output = document.getElementById("output");

    Output.contentDocument.body.innerHTML = HTMLCode + "<style>" + CSSCode + "</style>";
    Output.contentWindow.eval(JsCode);

}

function update(text) {
    let htmlCodeTextarea = document.getElementById("html-code");
    let cssCodeTextarea = document.getElementById("css-code");
    let jsCodeTextarea = document.getElementById("js-code");

    let htmlCode = htmlCodeTextarea.value;
    let cssCode = cssCodeTextarea.value;
    let jsCode = jsCodeTextarea.value;

    let htmlCodeElement = document.getElementById("highlighting-content");
    let cssCodeElement = document.querySelector("#highlighting-content.language-css");
    let jsCodeElement = document.querySelector("#highlighting-content.language-javascript");

    // Handle final newlines (see article)
    if (htmlCodeTextarea.value[htmlCodeTextarea.value.length - 1] === "\n") {
        htmlCode += " "; // Add a placeholder space character to the final line
    }
    if (cssCodeTextarea.value[cssCodeTextarea.value.length - 1] === "\n") {
        cssCode += " ";
    }
    if (jsCodeTextarea.value[jsCodeTextarea.value.length - 1] === "\n") {
        jsCode += " ";
    }

    // Update code
    htmlCodeElement.textContent = htmlCode.replace(new RegExp("&", "g"), "&").replace(new RegExp("<", "g"), "<");
    cssCodeElement.textContent = cssCode.replace(new RegExp("&", "g"), "&").replace(new RegExp("<", "g"), "<");
    jsCodeElement.textContent = jsCode.replace(new RegExp("&", "g"), "&").replace(new RegExp("<", "g"), "<");

    // Syntax Highlight
    Prism.highlightElement(htmlCodeElement);
    Prism.highlightElement(cssCodeElement);
    Prism.highlightElement(jsCodeElement);
    
}


function sync_scroll(element) {
    /* Scroll result to scroll coords of event - sync with textarea */
    let result_element;
    switch (element.id) {
        case 'html-code':
            result_element = document.querySelector("#highlighting.language-html");
            break;
        case 'css-code':
            result_element = document.querySelector("#highlighting.language-css");
            break;
        case 'js-code':
            result_element = document.querySelector("#highlighting.language-javascript");
            break;
    }

    // Get and set x and y
    result_element.scrollTop = element.scrollTop;
    result_element.scrollLeft = element.scrollLeft;
}

function check_tab(element, event) {
    let code = element.value;
    if(event.key == "Tab") {
      /* Tab key pressed */
      event.preventDefault(); // stop normal
      let before_tab = code.slice(0, element.selectionStart); // text before tab
      let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
      let cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
      element.value = before_tab + "\t" + after_tab; // add tab char
      // move cursor
      element.selectionStart = cursor_pos;
      element.selectionEnd = cursor_pos;
      update(element.value); // Update text to include indent
    }
  }

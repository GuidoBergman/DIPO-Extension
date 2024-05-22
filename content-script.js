
function copySelection() {
    let selectedText = window.getSelection().toString().trim();

    if (selectedText) {
        console.log(selectedText);
        document.getElementById('input-text').textContent = selectedText;
    }
}


document.addEventListener("mouseup", copySelection);
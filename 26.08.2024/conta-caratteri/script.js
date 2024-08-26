document.getElementById("inputText").addEventListener("input", function () {
  let text = this.value;
  let charCount = text.length;
  document.getElementById("charCount").innerText = "Caratteri: " + charCount;
});

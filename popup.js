var dropdown = document.getElementById("fromCurrency");
var backgroundPage = chrome.extension.getBackgroundPage()

dropdown.addEventListener("change", function(e) {
    backgroundPage.toCurrency = dropdown.value;
});

document.getElementById("fromCurrency").value = backgroundPage.toCurrency;
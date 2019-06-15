var dropdown = document.getElementById("targetCurrency");

chrome.storage.local.get(['currency'], function(currency) {
    dropdown.value = currency.currency;
});

dropdown.addEventListener("change", function(e) {
    chrome.storage.local.set({'currency':dropdown.value});
});

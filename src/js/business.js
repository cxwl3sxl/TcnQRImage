$(function () {
    chrome.tabs.getSelected(function (tab) {
        $.get("https://api.weibo.com/2/short_url/shorten.json", {
            source: "5786724301",
            url_long: tab.url
        }, function (r) {
            if (r.urls.length == 0) {
                showMessage("服务器无返回");
                return;
            }
            if (r.urls[0].type != 0) {
                showMessage("错误:" + r.urls[0].type);
                return;
            }
            var url = r.urls[0].url_short;
            showMessage(url);
            $("#qrCodeImage").attr("src", "http://qr.liantu.com/api.php?text=" + url);
        }).fail(function () {
            showMessage("请求失败，请重试！");
        });
    });
});

function showMessage(msg) {
    $(".loading").html(msg);
}
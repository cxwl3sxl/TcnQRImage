$(function () {
    chrome.tabs.getSelected(function (tab) {
        try {
            var url = tab.url;
            if (url == "" || url.indexOf("chrome:") == 0) {
                showMessage("地址错误");
                console.warn("地址错误");
                return;
            }
            $.get("https://api.weibo.com/2/short_url/shorten.json", {
                source: "5786724301",
                url_long: url
            }, function (r) {
                try {
                    if (r.urls.length == 0) {
                        showMessage("服务器无返回");
                        console.warn("服务器无返回");
                        return;
                    }
                    if (r.urls[0].type != 0) {
                        showMessage("错误:" + r.urls[0].type);
                        console.warn("错误:" + r.urls[0].type);
                        return;
                    }
                    var url = r.urls[0].url_short;
                    showMessage(url);
                    $("#qrCodeImage").attr("src", "http://qr.liantu.com/api.php?text=" + url);
                } catch (e) {
                    showMessage(e);
                }
            }).fail(function () {
                showMessage("请求失败，请重试！");
                console.warn("请求失败，请重试！");
            });
        } catch (e) {
            showMessage(e);
            console.warn(e);
        }
    });
});

function showMessage(msg) {
    $(".loading").html(msg);
}
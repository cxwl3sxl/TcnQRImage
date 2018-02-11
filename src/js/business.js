$(function () {
    chrome.tabs.getSelected(function (tab) {
        try {
            var url = tab.url;
            if (url == "" || url.indexOf("chrome:") == 0) {
                showMessage("地址错误");
                console.warn("地址错误");
                return;
            }
            $.post("http://dwz.cn/create.php", {
                url: url
            }, function (r) {
                try {
                    if (r == null) {
                        showMessage("服务器无返回");
                        console.warn("服务器无返回");
                        return;
                    }
                    var jr = JSON.parse(r);
                    showMessage(jr.tinyurl);
                    $("#qrCodeImage").attr("src", "http://qr.liantu.com/api.php?text=" + jr.tinyurl);
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
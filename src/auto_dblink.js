var bookUrlPattern = /http:\/\/book.douban.com\/subject\/\d+\//;
var referrer = document.referrer;

if (bookUrlPattern.test(referrer)) {
    var input = document.querySelector("#id_doubanurl");
    input.value = referrer;
}

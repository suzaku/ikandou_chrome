(function (context) {
    var SEARCH_API = "http://ikandou.com/api/related";
    var MULTI_SEARCH_API = "http://ikandou.com/api/getbooks";

    context.ikd = {
        searchMultiBooks: function (bookIds, onSuccess) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET",
                     MULTI_SEARCH_API + "?ids=" + bookIds.join(","),
                     true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                   var result = JSON.parse(xhr.response);
                   onSuccess(result);
                }
            }
            xhr.send();
        },
        searchBook: function (bookId, tags, onSuccess) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", SEARCH_API + "?version=1.1&bookid=" + bookId + "&tags=" + tags, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                   onSuccess(JSON.parse(xhr.response));
                }
            }
            xhr.send();
        }
    };
})(window);

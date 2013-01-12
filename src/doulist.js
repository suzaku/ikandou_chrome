(function () {
    var API = "http://ikandou.com/api/getbooks";
    var subjectEls = $(".article .item");
    var bookId2Els = {};
    var bookIds = [];
    var isListMode = window.location.search.match(/mode=list/);
    var getBookId, updatePage;

    if (!isListMode) {
        getBookId = function (item) {
            var bookURL = item.find(".title a").attr('href');
            return bookURL.match(/\d+/)[0];
        }

        updatePage = function (bid, res) {
            var el = bookId2Els[bid];
            var target = el.find("li.intro + li");
            target.append('<a class="ikd-lnk" target="_blank" href="' +
                            res.url + '">爱看豆</a>');
        }
    } else {
        getBookId = function (item) {
            return item.attr('id').match(/\d+/)[0];
        }

        updatePage = function (bid, res) {
            var el = bookId2Els[bid];
            var target = el.find(".title");
            target.append('<a class="ikd-lnk" target="_blank" href="' +
                            res.url + '">爱看豆</a>');
        }
    }

    subjectEls.each(function () {
        var el = $(this);
        var bookId = getBookId(el);
        bookId2Els[bookId] = el;
        bookIds.push(bookId);
    })

    var xhr = new XMLHttpRequest();
    xhr.open("GET",
             API + "?ids=" + bookIds.join(","),
             true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
           var result = JSON.parse(xhr.response);
           $.each(result, function (bid, ob) {
               if (ob) {
                   updatePage(bid, ob);
               }
           });

           delete bookId2Els;
           delete bookIds;
           delete subjectEls;
        }
    }
    xhr.send();
})();

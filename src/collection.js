(function () {
    var isListMode = window.location.search.match(/mode=list/);
    var bookId2Els = {};
    var bookIds = [];
    var subjectEls, getBookId, updatePage;

    if (!isListMode) {
        subjectEls = $(".interest-list .subject-item");
        getBookId = function (item) {
            var bookURL = item.find(".info h2 a").attr('href');
            return bookURL.match(/\d+/)[0];
        }

        updatePage = function (bid, res) {
            var el = bookId2Els[bid];
            var target = el.find(".info h2");
            target.append('<a class="ikd-lnk" target="_blank" href="' +
                            res.url + '">爱看豆</a>');
        }
    } else {
        subjectEls = $(".article .item");
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

    ikd.searchMultiBooks(bookIds, function (result) {
       $.each(result, function (bid, ob) {
           if (ob) {
               updatePage(bid, ob);
           }
       });
    });
})();

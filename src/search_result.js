(function () {
    var subjectEls = $(".subject-list .subject-item");
    var bookId2Els = {};
    var bookIds = [];
    var getBookId, updatePage;

    getBookId = function (item) {
        var bookURL = item.find(".pic a").attr('href');
        return bookURL.match(/\d+/)[0];
    };

    updatePage = function (bid, res) {
        var el = bookId2Els[bid];
        var target = el.find(".star");
        target.append('<a class="ikd-lnk" target="_blank" href="' +
                        res.url + '">爱看豆</a>');
    };

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

(function () {
    var ITEM_TMPL_RELATED = '<li><a target="_blank" href="{{=url }}" title="{{=author }}">{{=title }}</a><b class="pl">{{=rating }}星</b><span>{{=related }}</span></li>';

    var processRelatedResult = function (results) {
        var element = $("<div class='gray_ad ikd_box'></div>");
        var tmpl_url = chrome.extension.getURL("templates/book_page_widget.html");

        element.prependTo($(".aside")).load(tmpl_url, function () {
            $.each(results, function (idx, value) {
                var item = $(ITEM_TMPL_RELATED.replace("{{=url }}",value.url)
                           .replace("{{=title }}",value.title)
                           .replace("{{=rating }}",value.rating)
                           .replace("{{=author }}",value.author)
                           .replace("{{=related }}", value.related));
                if (!value.related){
                    item.css('font-weight','bold');
                }
                element.find("ul").append(item);
            });
        });

        if (!results.length) {
            element.find(".msg").show();
        }
    }

    var ptags="";
    var tags = $('div#db-tags-section a');
    $.each(tags, function(idx, tag) {
        ptags = ptags + $(this).text()+",";
    });
    var subjectId = document.location.href.match(/(\d+)/)[1];
    var matchUrl = "http://ikandou.com/api/related?version=1.1&bookid=" + subjectId + "&tags=" + ptags;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", matchUrl, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
           processRelatedResult(JSON.parse(xhr.response));
        }
    }
    xhr.send();
})();

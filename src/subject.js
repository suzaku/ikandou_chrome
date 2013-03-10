(function () {
    var ITEM_TMPL_RELATED = '<li><a target="_blank" href="{{=url }}" title="{{=author }}">{{=title }}</a><b class="pl">{{=rating }}星</b><span>{{=related }}</span></li>';

    var processRelatedResult = function (results) {
        var element = $("<div class='gray_ad ikd_box'></div>");
        var tmpl_url = chrome.extension.getURL("templates/book_page_widget.html");

        function show_no_match_tip () {
            element.find(".msg").show();
        }

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

            var exact_match = false;
            for (var i in results) {
                if (!results[i].related) {
                    exact_match = true;
                    break;
                }
            }

            if (!exact_match || !results.length) {
                show_no_match_tip();
            }
        });
    }

    var ptags="";
    var tags = $('div#db-tags-section a');
    $.each(tags, function(idx, tag) {
        ptags = ptags + $(this).text()+",";
    });
    var subjectId = document.location.href.match(/(\d+)/)[1];
    ikd.searchBook(subjectId, ptags, processRelatedResult);
})();

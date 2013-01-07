(function () {
    var WRAPPER_TMPL =  '<div class="gray_ad">'+
        '<h2><a style="color: #072" href="http://ikandou.com/" target="_blank">爱看豆电子书下载››</a></h2>' +
        '<ul class="bs"><li class="msg" style="display:none;color:#333;">' +
        '万卷书上还没有这本书,你可以考虑<a target="_blank" href="http://ikandou.com/book/upload">上传一本</a>,'+
        '<br>或者<a href="http://ikandou.com">去看看</a>其它有趣的电子书</li></ul>'+
        '</div>';
    var ITEM_TMPL_RELATED = '<li><a target="_blank" href="{{=url }}" title="{{=author }}">{{=title }}</a><b class="pl" style="padding-left:5px;">{{=rating }}星</b><span style="padding-left:5px;color:green;">{{=related }}</span></li>';

    var processRelatedResult = function (results) {
        var element = $(WRAPPER_TMPL);
        var cnt=0;
        list = element.find("ul");
        $.each(results, function (idx, value) {
            var item=$(ITEM_TMPL_RELATED.replace("{{=url }}",value.url)
                   .replace("{{=title }}",value.title)
                   .replace("{{=rating }}",value.rating)
                   .replace("{{=author }}",value.author)
                   .replace("{{=related }}", value.related));
            if (!value.related){
                item.css('font-weight','bold');
            }
            element.find("ul").append(item);
            cnt=cnt+1;
            });
        $(".aside").prepend(element);
        if (!cnt)
            element.find(".msg").show();
        }

        var ptags="";
        var tags = $('div#db-tags-section a');
        $.each(tags, function(idx,tag){
            ptags = ptags+$(this).text()+",";
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

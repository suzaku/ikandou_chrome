chrome.contextMenus.create({
    "title": "用爱看豆搜索\"%s\"相关的电子书",
    "contexts": ["selection"],
    "onclick": function (info, tab) {
        window.open("http://ikandou.com/search/?q=" +
                    escape(info.selectionText));
    }
});

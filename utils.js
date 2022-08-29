function dumpAllBookmarks() {
    chrome.bookmarks.getTree(
       function(tree) {
            console.log(tree)
        }
    )
}

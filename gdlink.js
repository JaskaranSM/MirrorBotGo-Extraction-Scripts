//https:\/\/gdlink\.dev\/file\/.+
function extract(url) {
    if (url.match("https:\/\/gdlink\.dev\/file\/.+") != null) {
        url = findNodes(request({
            url: url,
            method: "GET"
        }).bodyText, "META").find(node => node.attributes.content.includes("url=")).attributes.content.replace("0; url=", "")
    }
    return findNodes(request({
        url: url.replace("/file/", "/xfile/"),
        method: "GET"
    }).bodyText, "a").find(node => node.attributes["data-mdb-ripple-color"] == "dark").attributes.href
}
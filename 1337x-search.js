//1337x-search:\s(.+)
function extract(url) {
    return findNodes(request({
        url: "https://1337x.anshuman.workers.dev" + request({
            url: "https://1337x.anshuman.workers.dev/srch?search=" + URLEncoder.encode(url.match(/1337x-search:\s(.+)/)[1]),
            method: "GET"
        }).bodyText.match(/\"(\/torrent\/.+)\/"/)[1] + "/",
        method: "GET"
    }).bodyText, "a").find(node => node.attributes.href.includes("magnet:?")).attributes.href
}
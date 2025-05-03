//https:\/\/hubcloud\.(.+)\/drive\/.+
function extract(url) {
    return findNodes(request({
        url: findNodes(request({
            url: url,
            method: "GET"
        }).bodyText, "a").find(node => node.attributes.id == "download").attributes.href,
        method: "GET"
    }).bodyText, "a").find(node => node.attributes.href.includes("r2.dev")).attributes.href
}
//https:\/\/(?:hubcloud\.(.+)\/drive\/.+|vifix\.site\/hubcloud\/([a-z0-9]+))
function extract(url) {
    return findNodes(
        request({
            url: findNodes(
                request({
                    url: /^https:\/\/vifix\.site\/hubcloud\/([a-z0-9]+)$/i.test(url)
                        ? `https://hubcloud.one/drive/${url.split("/").pop()}`
                        : url,
                    method: "GET"
                }).bodyText,
                "a"
            ).find(node => node.attributes.id == "download").attributes.href,
            method: "GET"
        }).bodyText,
        "a"
    ).map(n => {
        let href = n.attributes.href;
        if (!href) return null;

        if (href.includes("r2.dev")) {
            return href;
        }
        if (href.includes("pixeldrain")) {
            if (href.includes("/u/")) {
                return "https://pixeldrain.net/api/file/" + href.split("/u/").pop();
            }
            if (href.includes("/api/file/")) {
                return href;
            }
        }
        return null;
    }).find(Boolean);
}

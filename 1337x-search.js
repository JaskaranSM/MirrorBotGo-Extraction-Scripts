//1337x-search:\s(.+)
function extract(url) {
    return findNodes(request({
        url: "https://1337x.anshuman.workers.dev" + request({
            url: "https://1337x.anshuman.workers.dev/srch?search=" + URLEncoder.encode(url.match(/1337x-search:\s(.+)/)[1]),
            method: "GET"
        }).bodyText.match(/\"(\/torrent\/.+)\/"/)[1] + "/",
        method: "GET"
    }).bodyText, "body > main > div > div > div > div.l28e63151cc932a46c63e499b1b4cc2615eeeeedb.no-top-radius > div.l7a57e7d5f9f7a6fa3e0858430ac9737e49c7f1fc.clearfix > ul.l4237d9261cc211382bdbb8b83a75cd7f67bd69d8.lc0dc7de5a48742ef620a702d055e21a9a1fd88a1 > li:nth-child(1) > a")[0].attributes.href
}
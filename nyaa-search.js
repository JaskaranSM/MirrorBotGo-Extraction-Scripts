function extract(url) {
	return "https://nyaa.si" + request({
		url: "https://nyaa.si/?f=0&c=0_0&q="+URLEncoder.encode(url.match(/nyaa-search:\s(.+)/)[1]),
		method: "GET"
	}).bodyText.match(/"(\/download\/.+\.torrent)"/)[1]
}
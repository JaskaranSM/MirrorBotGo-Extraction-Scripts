function extract(url) {
	var response = request({
		url: url,
		method: "GET"
	})
	return "https://nyaa.si" + response.bodyText.match(/"(\/download\/.+\.torrent)"/)[1]
}

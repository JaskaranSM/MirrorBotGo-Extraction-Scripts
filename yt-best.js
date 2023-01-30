function extract(url) {
	const response = request({
		url: "https://yaas.natan.la/details?url="+URLEncoder.encode(url.match(/yt-best:\s(.+)/)[1])
	})
	return findNodes(response.bodyText, "body > main > section > p:nth-child(3) > a")[0].attributes.href.replace("/videoplayback", "/videoplayback/"+URLEncoder.encode(findNodes(response.bodyText, "body > main > section > h2 > a")[0].text) + ".mp4")
}
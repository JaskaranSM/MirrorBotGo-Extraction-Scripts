//https:\/\/.+gdtot.+\/file\/.+
function extract(url) {
	return request({
		url: url.replace("file","ddl"),
		method: "GET",
		cookies: {
			crypt: gdtot_crypt
		}
	}).bodyText.match(/.+myDl\('(.+)'\)/)[1]
}
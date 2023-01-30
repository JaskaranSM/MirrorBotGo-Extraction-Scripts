//https:\/\/sharer\.pw\/file\/.+
function extract(url) {
	return JSON.parse(request({
		url: url + "/dl",
		method: "POST",
		headers: {
		    "accept": "application/json, text/javascript, */*; q=0.01",
		    "accept-language": "en-US,en;q=0.9",
		    "cache-control": "no-cache",
		    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
		    "pragma": "no-cache",
		    "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
		    "sec-ch-ua-mobile": "?0",
		    "sec-ch-ua-platform": "\"Windows\"",
		    "sec-fetch-dest": "empty",
		    "sec-fetch-mode": "cors",
		    "sec-fetch-site": "same-origin",
		    "x-requested-with": "XMLHttpRequest",
		    "Referer": url,
		    "Referrer-Policy": "strict-origin-when-cross-origin"
		  },
		body: "_token="+request({
			url: url,
			method: "GET",
			cookies: {
				"XSRF-TOKEN": sharer_xsrf_token,
				"laravel_session": sharer_laravel_session
			}
		}).bodyText.match(/_token\s=\s'(.+)'/)[1]
	}).bodyText).url
}
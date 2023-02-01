//https:\/\/.+gdtot.+\/file\/.+
function extract(url) {
    return request({
        url: request({
            url: request({
                url: url,
                method: "GET",
                cookies: {
                    crypt: gdtot_crypt
                }
            }).bodyText.match(/.+myDl\('(.+)'\)/)[1],
            method: 'GET',
            cookies: {
                crypt: gdtot_crypt
            }
        }).bodyText.match(/URL=(.+)\"/)[1],
        method: 'GET',
        cookies: {
            crypt: gdtot_crypt
        }
    }).bodyText.match(/(https:\/\/drive\.google\.com.+)"\s/)[1]
}
//https:\/\/appdrive\..+\/file\/.+
function extract(url) {
    const response = request({
        url: url
    })
    var cookie = (response.headers["Set-Cookie"] != null) ? response.headers["Set-Cookie"].split(";")[0] + '; g_state={"i_p":ip,"i_l":1}' : null
    var headers = {
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryC6QXMX0A9SdXPjvB',
        'referer': url,
        'x-token': 'appdrive.pro'
    }
    if (cookie != null) headers["cookie"] = cookie
    return URLEncoder.decode(JSON.parse(request({
        url: url,
        method: "POST",
        headers: headers,
        body: '------WebKitFormBoundaryC6QXMX0A9SdXPjvB\r\nContent-Disposition: form-data; name="action"\r\n\r\ndirect\r\n------WebKitFormBoundaryC6QXMX0A9SdXPjvB\r\nContent-Disposition: form-data; name="key"\r\n\r\n' + response.bodyText.match(/formData\.append\(\"key\"\, "(.+)\"\)\;/)[1] + '\r\n------WebKitFormBoundaryC6QXMX0A9SdXPjvB\r\nContent-Disposition: form-data; name="action_token"\r\n\r\n\r\n------WebKitFormBoundaryC6QXMX0A9SdXPjvB--\r\n'
    }).bodyText).url)
}
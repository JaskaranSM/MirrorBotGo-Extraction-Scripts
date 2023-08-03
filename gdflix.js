//regex: https:\/\/gdflix.+\/file\/.+
const headers ={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/116.0',
    'Accept': '*/*',
    'Accept-Language': 'en-CA,en-US;q=0.7,en;q=0.3',
    'x-token': 'gdflix.co',
    'Content-Type': 'multipart/form-data; boundary=---------------------------88255548030051882852566255074',
    'Origin': 'https://gdflix.co',
    'Alt-Used': 'gdflix.co',
    'Connection': 'keep-alive',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'Cookie': 'yourCOokie',
}

function getDownloadKey(url) {
    const response = request({
        url: url,
        method: 'GET',
        headers: headers
    })
    const key = response.bodyText.split('formData.append("key", "')[1].split('"')[0]
    return key
}

function generateDriveLink(url, key) {
    var data = '-----------------------------88255548030051882852566255074\r\nContent-Disposition: form-data; name="action"\r\n\r\noriginal\r\n-----------------------------88255548030051882852566255074\r\nContent-Disposition: form-data; name="key"\r\n\r\n'+key+'\r\n-----------------------------88255548030051882852566255074\r\nContent-Disposition: form-data; name="action_token"\r\n\r\n\r\n-----------------------------88255548030051882852566255074--\r\n'
    const response = request({
        url: url,
        method: 'POST',
        headers:headers,
        body:data
    })
    const jsonData = JSON.parse(response.bodyText)
    return jsonData.url
}

function extractDriveLink(url) {
    const response = request({
        url: url,
        method: 'GET',
        headers: headers
    })
    return "https://drive.google.com" + response.bodyText.split("https://drive.google.com")[1].split('"')[0]
}


function extract(url) {
    const key = getDownloadKey(url)
    const generatedLink = generateDriveLink(url, key)
    return extractDriveLink(generatedLink)
}


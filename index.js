String.prototype.rsplit = function(sep, maxsplit) {
    var split = this.split(sep);
    return maxsplit ? [ split.slice(0, -maxsplit).join(sep) ].concat(split.slice(-maxsplit)) : split;
}

function read(str) {
    var gdijsorg_0x1207 = ['join', '645298GrGsiK', '8269zzjDhb', '28wpErfD', '11eoSBcm', '3578714TboDnQ', 'slice', '52214BJnTpj', '14039GFHzjM', '187451gnBzKk', 'substr', 'reverse', '1262156NwMIzh', '2nDedhJ', 'split'];
    var gdijsorg_0x570bf1 = gdijsorg_0x158f;

    function gdijsorg_0x158f(_0x32bcea, _0x29ebfd) {
        _0x32bcea = _0x32bcea - 0x150;
        var _0x1207c1 = gdijsorg_0x1207[_0x32bcea];
        return _0x1207c1;
    }(function(_0xbbe83c, _0xbbffd8) {
        var _0x2feec5 = gdijsorg_0x158f;
        while (!![]) {
            try {
                var _0x5d3639 = parseInt(_0x2feec5(0x15c)) * -parseInt(_0x2feec5(0x150)) + -parseInt(_0x2feec5(0x15b)) + -parseInt(_0x2feec5(0x157)) + parseInt(_0x2feec5(0x151)) * parseInt(_0x2feec5(0x152)) + parseInt(_0x2feec5(0x153)) * -parseInt(_0x2feec5(0x156)) + parseInt(_0x2feec5(0x158)) + parseInt(_0x2feec5(0x154));
                if (_0x5d3639 === _0xbbffd8) break;
                else _0xbbe83c['push'](_0xbbe83c['shift']());
            } catch (_0x2894d2) {
                _0xbbe83c['push'](_0xbbe83c['shift']());
            }
        }
    }(gdijsorg_0x1207, 0xd11e8));
    var sa = str[gdijsorg_0x570bf1(0x15d)](''),
        ra = sa[gdijsorg_0x570bf1(0x15a)](),
        ja = ra[gdijsorg_0x570bf1(0x15e)](''),
        aj = ja[gdijsorg_0x570bf1(0x159)](0x18)[gdijsorg_0x570bf1(0x155)](0x0, -0x14);
    return aj;
}

function gdidecode(str) {
    var functions = ['join', 'toString', '114773LJlqPi', 'charCodeAt', '1evaKJu', '128429mQiVMM', '179727icrnig', '1276161MsgKkV', 'map', '111987FmCZVm', '6IEPbgT', '1924817UdCjIN', '328673bHHLnC', '14sGLkvR'];
    var gdijsorg_0x22bf03 = gdijsorg_0x47d3;
    (function(_0x2015a9, _0x2d2e6f) {
        var _0x194131 = gdijsorg_0x47d3;
        while (!![]) {
            try {
                var _0x50490c = parseInt(_0x194131(0x167)) * -parseInt(_0x194131(0x165)) + parseInt(_0x194131(0x160)) + parseInt(_0x194131(0x15e)) + -parseInt(_0x194131(0x161)) * -parseInt(_0x194131(0x15f)) + parseInt(_0x194131(0x162)) * -parseInt(_0x194131(0x168)) + -parseInt(_0x194131(0x16a)) + parseInt(_0x194131(0x169));
                if (_0x50490c === _0x2d2e6f) break;
                else _0x2015a9['push'](_0x2015a9['shift']());
            } catch (_0x157d6c) {
                _0x2015a9['push'](_0x2015a9['shift']());
            }
        }
    }(functions, 0xf40cd));

    function gdijsorg_0x47d3(_0x4aefd5, _0x2d1551) {
        _0x4aefd5 = _0x4aefd5 - 0x15e;
        var _0x557938 = functions[_0x4aefd5];
        return _0x557938;
    }
    return URLEncoder.decode(Base64.decode(str)['split']('')[gdijsorg_0x22bf03(0x16b)](function(_0x1cdc7a) {
        var _0x416153 = gdijsorg_0x22bf03;
        return '%' + ('00' + _0x1cdc7a[_0x416153(0x166)](0x0)[_0x416153(0x164)](0x10))['slice'](-0x2);
    })[gdijsorg_0x22bf03(0x163)](''));
}

function listFiles(url, pageOptions) {
    const response = request({
        url: url,
        method: "POST",
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'referer': url,
        },
        body: "password=;page_token="+pageOptions.pageToken+"page_index="+pageOptions.pageIndex
    })
    if (response.bodyText.startsWith("Y29")) { //bhadoo encoded JSON
        response.bodyText = gdidecode(read(response.bodyText))
    }
    return JSON.parse(response.bodyText)
}

function listFilesAll(url, callback) {
    const pageOptions = {
        pageToken: '',
        pageIndex: 0
    }
    while (true) {
        const response = listFiles(url, pageOptions)
        if (response.files != null) { //og maple compatibility
            response.data = {
                files: response.files
            }
        }
        response.data.files.forEach(file => {
            if (file.mimeType === "application/vnd.google-apps.folder") {
                listFilesAll(url + URLEncoder.encode(file.name) + "/", callback)
            } else {
                callback(url, file)
            }
        })
        if (response.nextPageToken == null) {
            break 
        } else {
            pageOptions.pageIndex++
            pageOptions.pageToken = response.nextPageToken
        }
    }
}

//index:\s(.+)
function extract(url) {
    url = url.match(/index:\s(.+)/)[1]
    const root = url.rsplit("/").at(-2)
    const files = []
    listFilesAll(url, (root_url, file) => {
        const folder = root_url.split(root).at(-1).slice(1)
        files.push({
            url: root_url + file.name,
            zipPath: URLEncoder.decode(folder) + cleanFilename(file.name)
        })
    })
    const response = request({
        url: "http://"+zipstreamerIP+":4008/create_download_link",
        method: "POST",
        body: JSON.stringify({
            suggestedFilename: URLEncoder.decode(root) + ".zip",
            files: files
        })
    });
    return "http://"+zipstreamerIP+":4008/download_link/" + JSON.parse(response.bodyText).link_id
}
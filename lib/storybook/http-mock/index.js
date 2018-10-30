
const HARReader = require('./har-reader')
const httpsHarJson = require('./https.json')

module.exports.adapterFeth = function() {
  let native = window.fetch

  window.fetch = function (url, options) {
    return new Promise((resolve, reject) => {
      const har = new HARReader({ 'har': httpsHarJson, 'filters': [] })
      const http = har.get(url)

      if (http) {
        let { status, content, headers } = http.response
        let { mimeType, text } = content

        let resHeaders = {}
        headers.forEach(head => resHeaders[head.name] = head.value)
        let response = new Response(text, {
          'headers': resHeaders
        })

        return resolve(response)
      }

      return native.apply(this, [].slice.call(arguments))
    })
  }
}

module.exports.adapterXHR = function() {
  // let native = window.XMLHttpRequest.prototype.open
  // window.XMLHttpRequest.prototype.open = function () {
  //   const har = new HARReader({ 'har': httpsHarJson, 'filters': [] })
  //   const http = har.get(url)
  //   if (http) {
  //   }
  //   return native.apply(this, [].slice.call(arguments))
  // }
}

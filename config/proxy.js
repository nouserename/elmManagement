const context = [ //代理路径
  '/shopping',
  '/ugc',
  '/v1',
  '/v2',
  '/v3',
  '/v4',
  '/bos',
  '/member',
  '/promotion',
  '/eus',
  '/payapi',
  '/img',
  '/admin'
  
]
const proxyList = {}
module.exports = function () {
  context.map((item) => {
    proxyList[item] = {
      target: 'http://39.106.104.0:8888', // 设置你调用的接口域名和端口号
      changeOrigin: true, // 跨域
      pathRewrite: {
        [`^${item}`]: item
      }
    }
  })
  return proxyList

}

const express = require('express');
const app = express();
const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('../serverdist/vue-ssr-server-bundle.json');
const fs = require('fs');
const path = require('path');
const template = fs.readFileSync(path.resolve(__dirname, 'index.template.html'), 'utf-8');
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  // template, // （可选）页面模板
  template,
  clientManifest: require(path.resolve(__dirname, '..', 'clientdist/vue-ssr-client-manifest.json')) // （可选）客户端构建 manifest
});
app.get('*', function(req, res){
    const context = { url: req.url, title: 'template.head' }
    if(/\.js$/.test(req.url)) {
      res.end(fs.readFileSync(path.resolve(__dirname, req.url.substring(1))))
      return
    }
    // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
    // 现在我们的服务器与应用程序已经解耦！
    renderer.renderToString(context, (err, html) => {
      // 处理异常……
      console.log(err,html)
      res.end(html)
    })
});


app.listen(6001);
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/event',
    createProxyMiddleware({
      target: 'http://localhost:9090', // Cambia esto a la URL de tu servidor de API
      changeOrigin: true,
    })
  );
};

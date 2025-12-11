{
  "version": 2,
  "builds": [
    {
      "src": "*.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/style.css",
      "dest": "/style.css"
    },
    {
      "src": "/script.js",
      "dest": "/script.js"
    },
    {
      "src": "/app.js",
      "dest": "/app.js"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}

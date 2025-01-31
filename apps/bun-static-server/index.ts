import app from './app/index.html'

const server = Bun.serve({
  static: { '/': app },
  fetch(request) {
    return new Response("Not Found", { status: 404 })
  }
})

console.log(`Listening on ${server.url}`);

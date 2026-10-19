// Custom server: Next.js API routes can't host a long-lived Socket.io server,
// so we run Next behind a plain HTTP server and attach Socket.io to it.
import { createServer } from "node:http"
import next from "next"
import nextEnv from "@next/env"
import { initSocket } from "./lib/socket.mjs"

if (process.argv.includes("--prod")) process.env.NODE_ENV = "production"
const dev = process.env.NODE_ENV !== "production"

// Socket.io runs outside Next's request handling, so load .env files ourselves
nextEnv.loadEnvConfig(process.cwd(), dev)
const port = parseInt(process.env.PORT || "3000", 10)
const hostname = process.env.HOSTNAME || "localhost"

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

await app.prepare()

const server = createServer((req, res) => handle(req, res))
initSocket(server)

server.listen(port, () => {
  console.log(`> Ready on http://${hostname}:${port}`)
})

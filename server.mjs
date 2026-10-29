import { createServer } from "node:http";
import { readFile, realpath } from "node:fs/promises";
import { extname, resolve, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const defaultRoot = fileURLToPath(new URL(".", import.meta.url));
const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".webp": "image/webp"
};

export function createPreviewServer(root = defaultRoot) {
  return createServer(async (req, res) => {
    if (!["GET", "HEAD"].includes(req.method)) {
      res.writeHead(405, { Allow: "GET, HEAD" }); res.end(); return;
    }
    try {
      const url = new URL(req.url || "/", "http://localhost");
      const pathname = decodeURIComponent(url.pathname);
      // Only serve public site files; never expose repository metadata or tooling.
      const publicPath = pathname === "/" || pathname === "/index.html" ||
        pathname === "/Website Portfolio/" || pathname === "/Website Portfolio/index.html" ||
        pathname.startsWith("/assets/");
      const parts = pathname.split("/");
      if (!publicPath || parts.some(part => part.startsWith(".") || part.includes("\\"))) {
        res.writeHead(404); res.end("Not found"); return;
      }
      const target = pathname.endsWith("/") ? `${pathname}index.html` : pathname;
      const filePath = await realpath(resolve(root, `.${target}`));
      const rel = relative(await realpath(root), filePath);
      if (rel === ".." || rel.startsWith(`..${sep}`)) {
        res.writeHead(403); res.end("Forbidden"); return;
      }
      const body = await readFile(filePath);
      res.writeHead(200, { "Content-Type": types[extname(filePath)] || "application/octet-stream" });
      res.end(req.method === "HEAD" ? undefined : body);
    } catch (error) {
      res.writeHead(error instanceof URIError ? 400 : 404); res.end("Not found");
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const host = process.env.HOST || "127.0.0.1";
  const port = Number(process.env.PORT || 5173);
  createPreviewServer().listen(port, host, () => console.log(`Portfolio preview: http://${host}:${port}`));
}

# Local server that mimics GitHub Pages: unknown paths get 404.html,
# so refreshing /extraorganum works the same as on xingkuangyi.com.
import http.server, os

class Handler(http.server.SimpleHTTPRequestHandler):
    def send_error(self, code, message=None, explain=None):
        if code == 404 and os.path.exists("404.html"):
            with open("404.html", "rb") as f:
                body = f.read()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        else:
            super().send_error(code, message, explain)

http.server.ThreadingHTTPServer(("", 8765), Handler).serve_forever()

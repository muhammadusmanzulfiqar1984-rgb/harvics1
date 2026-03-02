import json
import os
import urllib.parse
from http.server import HTTPServer, BaseHTTPRequestHandler

class Handler(BaseHTTPRequestHandler):
    def _send_json(self, data, code=200):
        body = json.dumps(data).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self._send_json({}, 204)

    def do_GET(self):
        if self.path.startswith("/api/ask-ai"):
            self._send_json({"ok": True, "answer": "Ask a question with POST JSON {question: '...'}"})
            return
        if self.path.startswith("/api/images"):
            qs = urllib.parse.urlsplit(self.path).query
            params = urllib.parse.parse_qs(qs)
            dir_arg = (params.get("dir") or params.get("folder") or [""])[0]
            # Allow only within project root
            project_root = os.path.abspath("/Users/shahtabraiz/Desktop/HARVICS SUPREME ")
            base_dir = os.path.abspath(os.path.join(project_root, dir_arg or "FMCG IMAGES"))
            if not base_dir.startswith(project_root):
                self._send_json({"ok": False, "error": "Invalid directory"}, 400)
                return
            if not os.path.isdir(base_dir):
                self._send_json({"ok": True, "files": []})
                return
            exts = (".png", ".jpg", ".jpeg", ".webp")
            files = []
            try:
                for name in sorted(os.listdir(base_dir)):
                    if name.lower().endswith(exts):
                        rel = "/" + os.path.relpath(os.path.join(base_dir, name), project_root)
                        # Normalize to URL form
                        rel_url = "/"+"/".join(rel.strip("/").split(os.sep))
                        files.append(urllib.parse.quote(rel_url, safe="/:%"))
            except Exception as e:
                self._send_json({"ok": False, "error": str(e)}, 500)
                return
            self._send_json({"ok": True, "files": files})
            return
        self._send_json({"ok": False, "error": "Not found"}, 404)

    def do_POST(self):
        if self.path.startswith("/api/ask-ai"):
            length = int(self.headers.get("Content-Length") or 0)
            raw = self.rfile.read(length) if length > 0 else b"{}"
            try:
                payload = json.loads(raw.decode("utf-8") or "{}")
            except Exception:
                payload = {}
            q = payload.get("question") or payload.get("q") or ""
            if q:
                self._send_json({"ok": True, "answer": f"Received your question: {q}"})
            else:
                self._send_json({"ok": True, "answer": "Please provide a question in JSON: {question: '...'}"})
            return
        self._send_json({"ok": False, "error": "Not found"}, 404)

def main():
    srv = HTTPServer(("127.0.0.1", 8004), Handler)
    srv.serve_forever()

if __name__ == "__main__":
    main()

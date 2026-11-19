# -*- coding: utf-8 -*-
"""
NEXUSBI STUDIO — AI AGENT LÀM SẠCH, KIỂM DUYỆT & PHÂN TÍCH DỮ LIỆU BI
Tương thích 100% với Vercel Serverless (class handler(BaseHTTPRequestHandler)) & Localhost
Không cần cài đặt thư viện ngoài (Zero-Dependency Standard Library)
"""

import os
import json
import urllib.request
import urllib.parse
from datetime import datetime
from pathlib import Path
from http.server import BaseHTTPRequestHandler, HTTPServer

ROOT_DIR = Path(__file__).resolve().parent
STATIC_DIR = ROOT_DIR / "static"
DATA_DIR = ROOT_DIR / "data"
STATE_FILE = Path("/tmp/pipeline_state.json")

SAMPLES = {
    "retail": {
        "id": "retail",
        "name": "Bán lẻ & TMĐT (Retail Sales)",
        "domain": "E-Commerce / Retail BI",
        "filename": "sample_retail_dirty.csv",
        "path": DATA_DIR / "sample_retail_dirty.csv",
    },
    "hr": {
        "id": "hr",
        "name": "Nhân sự & Lương thưởng (HR & Payroll)",
        "domain": "HR Analytics / People BI",
        "filename": "sample_hr_dirty.csv",
        "path": DATA_DIR / "sample_hr_dirty.csv",
    },
    "marketing": {
        "id": "marketing",
        "name": "Chiến dịch Marketing Đa kênh (Marketing ROI)",
        "domain": "Marketing Performance BI",
        "filename": "sample_marketing_dirty.csv",
        "path": DATA_DIR / "sample_marketing_dirty.csv",
    },
}


def read_asset_bytes(rel_path: str) -> bytes:
    clean_name = rel_path.lstrip("/") or "index.html"
    for folder in (ROOT_DIR, STATIC_DIR):
        candidate = folder / clean_name
        if candidate.exists() and candidate.is_file():
            return candidate.read_bytes()
    # Fallback to index.html for SPA routes
    for folder in (ROOT_DIR, STATIC_DIR):
        idx = folder / "index.html"
        if idx.exists():
            return idx.read_bytes()
    return b"NexusBI Studio Ready"


class handler(BaseHTTPRequestHandler):
    def _send_json(self, data: dict, status: int = 200):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _send_asset(self, filename: str, content_type: str):
        body = read_asset_bytes(filename)
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Cache-Control", "no-cache")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        if path == "/api/health":
            return self._send_json({
                "status": "ok",
                "engine": "NexusBI Studio v3.0 (Vercel & Localhost Ready)",
                "timestamp": datetime.now().isoformat(),
            })

        if path == "/api/samples":
            sample_id = query.get("id", [None])[0]
            if sample_id and sample_id in SAMPLES:
                s = SAMPLES[sample_id]
                p = s["path"]
                csv_text = p.read_text(encoding="utf-8") if p.exists() else ""
                return self._send_json({
                    "id": s["id"],
                    "name": s["name"],
                    "domain": s["domain"],
                    "filename": s["filename"],
                    "csv": csv_text,
                })
            out = []
            for s in SAMPLES.values():
                p = s["path"]
                out.append({
                    "id": s["id"],
                    "name": s["name"],
                    "domain": s["domain"],
                    "filename": s["filename"],
                    "csv": p.read_text(encoding="utf-8") if p.exists() else "",
                })
            return self._send_json({"samples": out})

        if path == "/api/audit":
            try:
                if STATE_FILE.exists():
                    return self._send_json(json.loads(STATE_FILE.read_text(encoding="utf-8")))
            except Exception:
                pass
            return self._send_json({"logs": []})

        if path.endswith(".css"):
            return self._send_asset("styles.css", "text/css; charset=utf-8")
        if path.endswith(".js"):
            return self._send_asset("app.js", "application/javascript; charset=utf-8")

        return self._send_asset("index.html", "text/html; charset=utf-8")

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        length = int(self.headers.get("Content-Length", "0") or "0")
        raw_body = self.rfile.read(length).decode("utf-8") if length > 0 else "{}"

        try:
            body = json.loads(raw_body)
        except Exception:
            body = {}

        if path == "/api/audit":
            try:
                existing = json.loads(STATE_FILE.read_text(encoding="utf-8")) if STATE_FILE.exists() else {"logs": []}
                logs = existing.get("logs", [])
                body["server_time"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                logs.insert(0, body)
                existing["logs"] = logs[:100]
                STATE_FILE.write_text(json.dumps(existing, ensure_ascii=False), encoding="utf-8")
                return self._send_json({"ok": True, "logs": existing["logs"]})
            except Exception:
                return self._send_json({"ok": True, "logs": []})

        if path == "/api/ai":
            provider = body.get("provider", "local")
            api_key = (body.get("apiKey") or os.getenv("GEMINI_API_KEY") or os.getenv("OPENAI_API_KEY") or "").strip()
            prompt = body.get("prompt", "")
            sys_inst = body.get("systemInstruction", "Bạn là Chuyên viên BI cao cấp.")

            if not api_key or provider == "local":
                return self._send_json({"ok": False, "fallback": True})

            try:
                if provider == "gemini":
                    model = body.get("model", "gemini-2.0-flash")
                    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
                    req_data = json.dumps({
                        "system_instruction": {"parts": [{"text": sys_inst}]},
                        "contents": [{"parts": [{"text": prompt}]}],
                        "generationConfig": {"temperature": 0.3},
                    }).encode("utf-8")
                    req = urllib.request.Request(url, data=req_data, headers={"Content-Type": "application/json"}, method="POST")
                    with urllib.request.urlopen(req, timeout=25) as resp:
                        res_json = json.loads(resp.read().decode("utf-8"))
                        text = res_json["candidates"][0]["content"]["parts"][0]["text"]
                        return self._send_json({"ok": True, "provider": "gemini", "text": text})
                elif provider == "openai":
                    model = body.get("model", "gpt-4o-mini")
                    url = "https://api.openai.com/v1/chat/completions"
                    req_data = json.dumps({
                        "model": model,
                        "messages": [{"role": "system", "content": sys_inst}, {"role": "user", "content": prompt}],
                        "temperature": 0.3,
                    }).encode("utf-8")
                    req = urllib.request.Request(
                        url,
                        data=req_data,
                        headers={"Content-Type": "application/json", "Authorization": f"Bearer {api_key}"},
                        method="POST",
                    )
                    with urllib.request.urlopen(req, timeout=25) as resp:
                        res_json = json.loads(resp.read().decode("utf-8"))
                        text = res_json["choices"][0]["message"]["content"]
                        return self._send_json({"ok": True, "provider": "openai", "text": text})
            except Exception as e:
                return self._send_json({"ok": False, "fallback": True, "error": str(e)})

        return self._send_json({"ok": False, "error": "Not found"}, 404)


if __name__ == "__main__":
    port = int(os.getenv("PORT", "8080"))
    print(f"🚀 NexusBI Studio running at http://localhost:{port}")
    HTTPServer(("127.0.0.1", port), handler).serve_forever()

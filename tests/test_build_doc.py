import importlib.util
import pathlib
import shutil
import subprocess
import sys
import tempfile
import unittest

ROOT = pathlib.Path(__file__).resolve().parent.parent
SCRIPT = ROOT / "plugins/tech-docs/skills/doc-builder/scripts/build_doc.py"
SAMPLE = ROOT / "examples/sample.md"

spec = importlib.util.spec_from_file_location("build_doc", SCRIPT)
build_doc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(build_doc)


def find(name):
    return next((getattr(build_doc, n) for n in dir(build_doc) if n == name), None)


class SanitizerTest(unittest.TestCase):
    def setUp(self):
        self.fn = find("sanitize_markdown")
        self.assertIsNotNone(self.fn, "sanitize() not found in build_doc.py")

    def test_dashes(self):
        self.assertEqual(self.fn("a — b – c"), "a - b - c")

    def test_arrows_quotes_ellipsis(self):
        out = self.fn("x → y “q” ‘s’…")
        self.assertEqual(out, "x -> y \"q\" 's'...")

    def test_emoji_removed(self):
        self.assertNotIn("\U0001f680", self.fn("ship \U0001f680 now"))

    def test_plain_text_unchanged(self):
        self.assertEqual(self.fn("Plain text, 3 nodes."), "Plain text, 3 nodes.")


@unittest.skipUnless(shutil.which("pandoc"), "pandoc not installed")
class RenderTest(unittest.TestCase):
    def test_html_output(self):
        with tempfile.TemporaryDirectory() as tmp:
            md = pathlib.Path(tmp) / "sample.md"
            shutil.copy(SAMPLE, md)
            subprocess.run([sys.executable, str(SCRIPT), str(md)], check=True, capture_output=True)
            html = (pathlib.Path(tmp) / "sample.html").read_text(encoding="utf-8")
            self.assertIn("<table", html)
            self.assertIn("Acme Logistics", html)
            self.assertNotIn("—", html)


if __name__ == "__main__":
    unittest.main()

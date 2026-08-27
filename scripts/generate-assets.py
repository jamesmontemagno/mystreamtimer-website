"""Generate optimized website assets from the source art in ./art.

Outputs:
  public/screenshots/*.webp + *.png (1600px wide) and *-thumb.webp (800px wide)
  public/favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png,
  public/android-chrome-192x192.png, android-chrome-512x512.png, favicon.ico, icon-256.png
  public/og-image.png (1200x630)

Run from the repo root:  python scripts/generate-assets.py
Requires Pillow (pip install pillow).
"""

from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
ART = ROOT / "art"
PUBLIC = ROOT / "public"
SHOTS = PUBLIC / "screenshots"

FONT_DIR = Path("C:/Windows/Fonts")
FONT_BOLD = FONT_DIR / "segoeuib.ttf"
FONT_SEMI = FONT_DIR / "seguisb.ttf"
FONT_REG = FONT_DIR / "segoeui.ttf"
FONT_MONO = FONT_DIR / "CascadiaMono.ttf"


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    try:
        return ImageFont.truetype(str(path), size)
    except OSError:
        return ImageFont.load_default(size)  # type: ignore[return-value]


def generate_screenshots() -> None:
    SHOTS.mkdir(parents=True, exist_ok=True)
    for src in sorted(ART.glob("*.png")):
        if not (src.stem.startswith("mac-") or src.stem.startswith("windows-")):
            continue
        img = Image.open(src).convert("RGB")
        for width, suffix, formats in ((1600, "", ("webp", "png")), (800, "-thumb", ("webp",))):
            ratio = width / img.width
            resized = img.resize((width, round(img.height * ratio)), Image.LANCZOS)
            for fmt in formats:
                out = SHOTS / f"{src.stem}{suffix}.{fmt}"
                if fmt == "webp":
                    resized.save(out, "WEBP", quality=82, method=6)
                else:
                    resized.save(out, "PNG", optimize=True)
                print(f"wrote {out.relative_to(ROOT)} ({out.stat().st_size // 1024} KB)")


def generate_icons() -> None:
    icon = Image.open(ART / "NewArt1024.png").convert("RGBA")
    sizes = {
        "favicon-16x16.png": 16,
        "favicon-32x32.png": 32,
        "apple-touch-icon.png": 180,
        "android-chrome-192x192.png": 192,
        "android-chrome-512x512.png": 512,
        "icon-256.png": 256,
    }
    for name, size in sizes.items():
        icon.resize((size, size), Image.LANCZOS).save(PUBLIC / name, "PNG", optimize=True)
        print(f"wrote public/{name}")
    shutil.copyfile(ART / "icon.ico", PUBLIC / "favicon.ico")
    print("wrote public/favicon.ico")


def rounded_mask(size: tuple[int, int], radius: int) -> Image.Image:
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0] - 1, size[1] - 1), radius, fill=255)
    return mask


def glow(canvas: Image.Image, center: tuple[int, int], radius: int, color: tuple[int, int, int, int]) -> None:
    layer = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.ellipse((center[0] - radius, center[1] - radius, center[0] + radius, center[1] + radius), fill=color)
    layer = layer.filter(ImageFilter.GaussianBlur(radius * 0.55))
    canvas.alpha_composite(layer)


def gradient_text(
    draw_size: tuple[int, int],
    text: str,
    fnt: ImageFont.FreeTypeFont,
    stops: list[tuple[int, int, int]],
) -> Image.Image:
    mask = Image.new("L", draw_size, 0)
    ImageDraw.Draw(mask).text((0, 0), text, font=fnt, fill=255)
    strip = Image.new("RGBA", (draw_size[0], 1))
    n = len(stops) - 1
    for x in range(draw_size[0]):
        t = x / max(draw_size[0] - 1, 1) * n
        i = min(int(t), n - 1)
        f = t - i
        c = tuple(round(stops[i][k] * (1 - f) + stops[i + 1][k] * f) for k in range(3))
        strip.putpixel((x, 0), (*c, 255))
    grad = strip.resize(draw_size)
    out = Image.new("RGBA", draw_size, (0, 0, 0, 0))
    out.paste(grad, (0, 0), mask)
    return out


def framed_shot(path: Path, width: int, radius: int = 22) -> Image.Image:
    img = Image.open(path).convert("RGBA")
    ratio = width / img.width
    img = img.resize((width, round(img.height * ratio)), Image.LANCZOS)
    frame = Image.new("RGBA", (img.width + 4, img.height + 4), (255, 255, 255, 70))
    frame.paste(img, (2, 2))
    frame.putalpha(rounded_mask(frame.size, radius))
    return frame


def with_shadow(img: Image.Image, blur: int = 40, offset: tuple[int, int] = (0, 28), alpha: int = 170) -> Image.Image:
    pad = blur * 3
    out = Image.new("RGBA", (img.width + pad * 2, img.height + pad * 2), (0, 0, 0, 0))
    shadow = Image.new("RGBA", out.size, (0, 0, 0, 0))
    sd = Image.new("RGBA", img.size, (10, 4, 24, alpha))
    sd.putalpha(Image.eval(img.getchannel("A"), lambda a: min(a, alpha)))
    shadow.paste(sd, (pad + offset[0], pad + offset[1]))
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))
    out.alpha_composite(shadow)
    out.alpha_composite(img, (pad, pad))
    return out


def generate_og() -> None:
    W, H = 1200, 630
    canvas = Image.new("RGBA", (W, H), (11, 7, 20, 255))
    base = Image.new("RGBA", (1, H))
    for y in range(H):
        t = y / (H - 1)
        base.putpixel((0, y), (round(11 + 23 * t), round(7 + 7 * t), round(20 + 36 * t), 255))
    canvas.alpha_composite(base.resize((W, H)))

    glow(canvas, (180, 120), 320, (139, 61, 255, 150))
    glow(canvas, (1080, 560), 340, (236, 72, 153, 95))
    glow(canvas, (900, 80), 220, (125, 211, 252, 60))

    grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    for x in range(0, W, 40):
        gd.line((x, 0, x, H), fill=(255, 255, 255, 9))
    for y in range(0, H, 40):
        gd.line((0, y, W, y), fill=(255, 255, 255, 9))
    canvas.alpha_composite(grid)

    # Screenshot composite (right side) goes first so text can overlap its edge cleanly.
    mac = framed_shot(ART / "mac-1.png", 540)
    win = framed_shot(ART / "windows-1.png", 500)
    blur = 34
    pad = blur * 3
    canvas.alpha_composite(with_shadow(mac, blur=blur, offset=(0, 26)), (740 - pad, 70 - pad))
    canvas.alpha_composite(with_shadow(win, blur=blur, offset=(0, 26)), (650 - pad, 310 - pad))

    # Left column text panel: slight dark scrim so copy stays legible over glows.
    scrim = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(scrim)
    sd.rectangle((0, 0, 660, H), fill=(11, 7, 20, 150))
    scrim = scrim.filter(ImageFilter.GaussianBlur(60))
    canvas.alpha_composite(scrim)

    icon = Image.open(ART / "NewArt1024.png").convert("RGBA").resize((124, 124), Image.LANCZOS)
    ipad = 28 * 3
    canvas.alpha_composite(with_shadow(icon, blur=28, offset=(0, 16), alpha=140), (64 - ipad, 64 - ipad))

    d = ImageDraw.Draw(canvas)
    d.text((64, 214), "My Stream Timer", font=font(FONT_BOLD, 70), fill=(248, 244, 255, 255))

    sub_font = font(FONT_SEMI, 29)
    canvas.alpha_composite(
        gradient_text(
            (640, 46),
            "Countdowns, count-ups & clocks for OBS",
            sub_font,
            [(196, 140, 255), (244, 114, 182), (125, 211, 252)],
        ),
        (64, 304),
    )

    d = ImageDraw.Draw(canvas)
    d.text(
        (64, 360),
        "Live timer text files your overlays read.\nControl it from Stream Deck or a URL.",
        font=font(FONT_REG, 23),
        fill=(190, 180, 216, 255),
        spacing=8,
    )

    chip_font = font(FONT_SEMI, 20)
    chips = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    cd = ImageDraw.Draw(chips)
    x = 64
    for label in ("macOS", "Windows", "Stream Deck"):
        tw = cd.textlength(label, font=chip_font)
        cd.rounded_rectangle((x, 470, x + tw + 36, 510), 20, fill=(255, 255, 255, 24), outline=(255, 255, 255, 70))
        cd.text((x + 18, 477), label, font=chip_font, fill=(244, 239, 255, 255))
        x += tw + 52
    canvas.alpha_composite(chips)
    d = ImageDraw.Draw(canvas)

    d.text((64, 552), "mystreamtimer.com", font=font(FONT_SEMI, 22), fill=(196, 140, 255, 255))

    # Chroma-green "live overlay" chip floating over the composite.
    mono = font(FONT_MONO, 26)
    label = "Starting in 00:02:32"
    tw = d.textlength(label, font=mono)
    cx, cy = W - round(tw) - 110, 26
    chip = Image.new("RGBA", (round(tw) + 62, 52), (0, 0, 0, 0))
    ImageDraw.Draw(chip).rounded_rectangle((0, 0, chip.width - 1, 51), 14, fill=(0, 255, 0, 255))
    canvas.alpha_composite(with_shadow(chip, blur=24, offset=(0, 14), alpha=150), (cx - 72, cy - 72))
    d = ImageDraw.Draw(canvas)
    d.ellipse((cx + 16, cy + 19, cx + 30, cy + 33), fill=(4, 30, 8, 255))
    d.text((cx + 42, cy + 10), label, font=mono, fill=(4, 30, 8, 255))

    out = PUBLIC / "og-image.png"
    canvas.convert("RGB").save(out, "PNG", optimize=True)
    print(f"wrote {out.relative_to(ROOT)} ({out.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    import sys

    only = sys.argv[1] if len(sys.argv) > 1 else None
    if only in (None, "screenshots"):
        generate_screenshots()
    if only in (None, "icons"):
        generate_icons()
    if only in (None, "og"):
        generate_og()

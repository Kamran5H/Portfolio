import os
import struct
import zlib

import numpy as np


def write_png_rgb(path: str, rgb: np.ndarray) -> None:
    # rgb: HxWx3 uint8
    h, w, _ = rgb.shape

    raw = bytearray()
    for y in range(h):
        raw += b"\x00"  # no filter
        raw += rgb[y].tobytes()

    compressed = zlib.compress(raw, level=9)

    def chunk(chunk_type: bytes, data: bytes) -> bytes:
        crc = zlib.crc32(chunk_type)
        crc = zlib.crc32(data, crc)
        return (
            struct.pack("!I", len(data))
            + chunk_type
            + data
            + struct.pack("!I", crc & 0xFFFFFFFF)
        )

    header = b"\x89PNG\r\n\x1a\n"
    ihdr = struct.pack("!IIBBBBB", w, h, 8, 2, 0, 0, 0)  # bit depth 8, color type 2 RGB

    with open(path, "wb") as f:
        f.write(header)
        f.write(chunk(b"IHDR", ihdr))
        f.write(chunk(b"IDAT", compressed))
        f.write(chunk(b"IEND", b""))


def png_bytes(rgb: np.ndarray) -> bytes:
    h, w, _ = rgb.shape
    raw = bytearray()
    for y in range(h):
        raw += b"\x00"
        raw += rgb[y].tobytes()
    compressed = zlib.compress(raw, level=9)

    def chunk(chunk_type: bytes, data: bytes) -> bytes:
        crc = zlib.crc32(chunk_type)
        crc = zlib.crc32(data, crc)
        return (
            struct.pack("!I", len(data))
            + chunk_type
            + data
            + struct.pack("!I", crc & 0xFFFFFFFF)
        )

    header = b"\x89PNG\r\n\x1a\n"
    ihdr = struct.pack("!IIBBBBB", w, h, 8, 2, 0, 0, 0)
    return b"".join([header, chunk(b"IHDR", ihdr), chunk(b"IDAT", compressed), chunk(b"IEND", b"")])


def make_og_image(w: int = 1200, h: int = 630) -> np.ndarray:
    base = np.array([2, 4, 9], dtype=np.float32)
    y = np.linspace(0, 1, h, dtype=np.float32)[:, None]
    x = np.linspace(0, 1, w, dtype=np.float32)[None, :]

    cx, cy = 0.52, 0.18
    dx = x - cx
    dy = y - cy
    dist2 = dx * dx + dy * dy
    glow = np.exp(-dist2 * 18.0)

    cx2, cy2 = 0.18, 0.72
    dist2b = (x - cx2) ** 2 + (y - cy2) ** 2
    glow2 = np.exp(-dist2b * 14.0)

    scan = 0.5 + 0.5 * np.sin(y * 18.0)
    scan = (scan * 0.06).astype(np.float32)

    cyan = np.array([0, 212, 255], dtype=np.float32)
    green = np.array([10, 255, 155], dtype=np.float32)

    color = base + glow[..., None] * cyan * 0.55 + glow2[..., None] * green * 0.35
    color += scan[..., None] * cyan

    return np.clip(color, 0, 255).astype(np.uint8)


def make_favicon_png(size: int = 32) -> np.ndarray:
    base = np.array([2, 4, 9], dtype=np.float32)
    y = np.linspace(0, 1, size, dtype=np.float32)[:, None]
    x = np.linspace(0, 1, size, dtype=np.float32)[None, :]

    cx, cy = 0.5, 0.45
    dist2 = (x - cx) ** 2 + (y - cy) ** 2
    glow = np.exp(-dist2 * 24.0)

    cyan = np.array([0, 212, 255], dtype=np.float32)
    green = np.array([10, 255, 155], dtype=np.float32)

    grid = ((np.floor(x * 8) + np.floor(y * 8)) % 2).astype(np.float32) * 0.03

    color = base + glow[..., None] * cyan * 0.85 + glow[..., None] * green * 0.18
    color += grid[..., None] * cyan

    return np.clip(color, 0, 255).astype(np.uint8)


def write_ico_from_png(png_data: bytes, path: str, size: int = 32) -> None:
    # Single-image ICO containing the PNG bytes.
    reserved = 0
    ico_type = 1
    count = 1
    header = struct.pack("<HHH", reserved, ico_type, count)

    width = size if size < 256 else 0
    height = size if size < 256 else 0
    color_count = 0
    reserved2 = 0
    planes = 1
    bit_count = 32
    bytes_in_res = len(png_data)
    image_offset = 6 + 16

    entry = struct.pack(
        "<BBBBHHII",
        width,
        height,
        color_count,
        reserved2,
        planes,
        bit_count,
        bytes_in_res,
        image_offset,
    )

    with open(path, "wb") as f:
        f.write(header)
        f.write(entry)
        f.write(png_data)


def main() -> None:
    out_dir = r"C:\Users\chkam\OneDrive\Desktop\BrandFinder\kamranashraf"
    public_dir = os.path.join(out_dir, "public")
    app_dir = os.path.join(out_dir, "app")
    os.makedirs(public_dir, exist_ok=True)
    os.makedirs(app_dir, exist_ok=True)

    og_path = os.path.join(public_dir, "og-image.png")
    favicon_path = os.path.join(public_dir, "favicon.ico")
    app_favicon_path = os.path.join(app_dir, "favicon.ico")

    og_rgb = make_og_image(1200, 630)
    write_png_rgb(og_path, og_rgb)

    fav_rgb = make_favicon_png(32)
    fav_png = png_bytes(fav_rgb)
    write_ico_from_png(fav_png, favicon_path, 32)
    write_ico_from_png(fav_png, app_favicon_path, 32)

    print("Wrote:", og_path)
    print("Wrote:", favicon_path)
    print("Wrote:", app_favicon_path)


if __name__ == "__main__":
    main()


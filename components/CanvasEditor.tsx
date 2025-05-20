import { useRef, useEffect } from "react";

interface Props {
  image: File | null;
  exportFormat: "png" | "jpg";
  canvasWidth: number;
  canvasHeight: number;
  fillMode: "blur" | "generative";
}

export default function CanvasEditor({
  image,
  exportFormat,
  canvasWidth,
  canvasHeight,
  fillMode,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvasRef.current!.width = canvasWidth;
      canvasRef.current!.height = canvasHeight;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      if (fillMode === "blur") {
        //1. draw background using cover-style fill (no-stretch, clipped)
        const imgAspect = img.width / img.height;
        const canvasAspect = canvasWidth / canvasHeight;

        let bgWidth, bgHeight;
        let bgX = 0, bgY = 0;

        if (imgAspect > canvasAspect) {
          // Image is wider
          bgHeight = canvasHeight;
          bgWidth = img.width * (canvasHeight / img.height);
          bgX = (canvasWidth - bgWidth) / 2;
        } else {
          // Image is taller
          bgWidth = canvasWidth;
          bgHeight = img.height * (canvasWidth / img.width);
          bgY = (canvasHeight - bgHeight) / 2;
        }

        const blurAmount = Math.max(canvasWidth, canvasHeight) / 100;

        ctx.save();
        ctx.filter = `blur(${blurAmount}px)`;
        ctx.drawImage(img, bgX, bgY, bgWidth, bgHeight);
        ctx.restore();
      }

      // 2. Center the original image
      const scale = Math.min(
        canvasWidth / img.width,
        canvasHeight / img.height
      );
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      const x = (canvasWidth - drawWidth) / 2;
      const y = (canvasHeight - drawHeight) / 2;

      ctx.drawImage(img, x, y, drawWidth, drawHeight);
    };

    img.src = URL.createObjectURL(image);
  }, [image, canvasWidth, canvasHeight, fillMode]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mimeType = exportFormat === "jpg" ? "image/jpeg" : "image/png";
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `backdrop.${exportFormat}`;
      a.click();
      URL.revokeObjectURL(url);
    }, mimeType);
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-xl font-semibold mb-2">Preview Output</h2>
      <div
        className="w-full max-w-[500px] border border-zinc-700 rounded shadow overflow-hidden bg-zinc-800"
        style={{ aspectRatio: `${canvasWidth} / ${canvasHeight}` }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%" }}
          className="block"
        />
      </div>
      <button
        onClick={handleDownload}
        disabled={!image}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Download Image
      </button>
    </div>
  );
}

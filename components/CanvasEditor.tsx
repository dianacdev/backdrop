import React, { useRef, useEffect } from "react";

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
  canvasHeight,
  canvasWidth,
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
        //Draw stretched image background and blur it
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
        //Apply blur effect
        ctx.filter = "blur(40px)";
        ctx.drawImage(canvasRef.current!, 0, 0); //blur the full canvas
        ctx.filter = "none"; //reset filter
      }

      // Center the actual image
      const x = (canvasWidth - img.width) / 2;
      const y = (canvasHeight - img.height) / 2;

      ctx.drawImage(img, x, y);
    };
    img.src = URL.createObjectURL(image);
  }, [image, canvasHeight, canvasWidth]);

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
    <div>
      <canvas ref={canvasRef} className="border w-full h-auto max-w-full" />
      <button
        onClick={handleDownload}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Download Image
      </button>
    </div>
  );
}

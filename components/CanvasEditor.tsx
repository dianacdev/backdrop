import { useEffect } from "react";

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  image: File | null;
  exportFormat: "png" | "jpg";
  canvasWidth: number;
  canvasHeight: number;
  fillMode: "blur" | "generative";
  zoom: number;
  sampleMode: "full" | "edge";
}

export default function CanvasEditor({
  canvasRef,
  image,
  canvasWidth,
  canvasHeight,
  fillMode,
  zoom,
  sampleMode,
}: Props) {
  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      //Set canvas dimensions and clear previous render
      canvasRef.current!.width = canvasWidth;
      canvasRef.current!.height = canvasHeight;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      // BLUR BACKGROUND
      if (fillMode === "blur") {
        const imgAspect = img.width / img.height;
        const canvasAspect = canvasWidth / canvasHeight;

        let bgWidth, bgHeight;
        let bgX = 0,
          bgY = 0;

        // Calculate background size while preserving aspect ratio
        if (imgAspect > canvasAspect) {
          bgHeight = canvasHeight;
          bgWidth = img.width * (canvasHeight / img.height);
          bgX = (canvasWidth - bgWidth) / 2;
        } else {
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

      // GENERATIVE FILL BACKGROUND
      if (fillMode === "generative") {
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;
        const tempCtx = tempCanvas.getContext("2d");

        if (tempCtx) {
          tempCtx.drawImage(img, 0, 0);
          const imgData = tempCtx.getImageData(
            0,
            0,
            img.width,
            img.height
          ).data;

          let r = 0,
            g = 0,
            b = 0,
            count = 0;

          //Average of all pixels
          if (sampleMode === "full") {
            for (let i = 0; i < imgData.length; i += 4) {
              r += imgData[i];
              g += imgData[i + 1];
              b += imgData[i + 2];
              count++;
            }
          }
          // Average of edge pixels only
          else {
            const edgeThickness = 10;
            // Top edge
            for (let y = 0; y < edgeThickness; y++) {
              for (let x = 0; x < img.width; x++) {
                const i = (y * img.width + x) * 4;
                r += imgData[i];
                g += imgData[i + 1];
                b += imgData[i + 2];
                count++;
              }
            }

            // Bottom edge
            for (let y = img.height - edgeThickness; y < img.height; y++) {
              for (let x = 0; x < img.width; x++) {
                const i = (y * img.width + x) * 4;
                r += imgData[i];
                g += imgData[i + 1];
                b += imgData[i + 2];
                count++;
              }
            }

            // Left and right edges (Limited to first and last 5 columns)
            for (let y = edgeThickness; y < img.height - edgeThickness; y++) {
              for (let x of [
                0,
                1,
                2,
                3,
                4,
                img.width - 5,
                img.width - 4,
                img.width - 3,
                img.width - 2,
                img.width - 1,
              ]) {
                const i = (y * img.width + x) * 4;
                r += imgData[i];
                g += imgData[i + 1];
                b += imgData[i + 2];
                count++;
              }
            }
          }

          // Apply background fill color if count was valid
          if (count > 0) {
            r = Math.floor(r / count);
            g = Math.floor(g / count);
            b = Math.floor(b / count);
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
          }
        }
      }

      // CENTERED FOREGROUND IMAGE
      const baseScale = Math.min(
        canvasWidth / img.width,
        canvasHeight / img.height
      );
      const scale = baseScale * zoom;
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      const x = (canvasWidth - drawWidth) / 2;
      const y = (canvasHeight - drawHeight) / 2;
      // Draw original image on top of background
      ctx.drawImage(img, x, y, drawWidth, drawHeight);
    };

    // Trigger image load
    img.src = URL.createObjectURL(image);
  }, [image, canvasRef, canvasWidth, canvasHeight, fillMode, zoom, sampleMode]);

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-xl font-semibold mb-2">Preview Output</h2>
      <div
        className="w-full max-w-[500px] max-h-screen border border-zinc-700 rounded shadow overflow-hidden bg-zinc-800"
        style={{ aspectRatio: `${canvasWidth} / ${canvasHeight}` }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%" }}
          className="block"
        />
      </div>
    </div>
  );
}

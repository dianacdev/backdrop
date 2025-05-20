import { useState, useRef } from "react";
import ImageUploader from "../components/ImageUploader";
import CanvasEditor from "../components/CanvasEditor";
import SettingsPanel from "../components/SettingsPanel";

export default function App() {
  const [image, setImage] = useState<File | null>(null);
  const [exportFormat, setExportFormat] = useState<"png" | "jpg">("png");
  const [canvasWidth, setCanvasWidth] = useState(1920);
  const [canvasHeight, setCanvasHeight] = useState(1080);
  const [fillMode, setFillMode] = useState<"blur" | "generative">("blur");
  const [zoom, setZoom] = useState(1);

  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    <main className="min-h-screen bg-[#0D0024] text-white px-4 py-12 font-sans flex flex-col items-center">
      <header className="flex justify-center text-center">
        <h1 className="text-5xl font-extrabold tracking-tight uppercase">
          Backdrop
        </h1>
        <p className="text-sm text-zinc-400 mt-2">
          Framing your image. Clean. Cinematic. Controlled.
        </p>
      </header>

      <section className="w-full flex justify-center">
        <SettingsPanel
          setExportFormat={setExportFormat}
          canvasWidth={canvasWidth}
          setCanvasWidth={setCanvasWidth}
          canvasHeight={canvasHeight}
          setCanvasHeight={setCanvasHeight}
          fillMode={fillMode}
          setFillMode={setFillMode}
          image={image}
          onDownload={handleDownload}
          setZoom={setZoom}
          exportFormat={exportFormat}
          zoom={zoom}
        />
      </section>

      <section className="w-full max-w-6xl flex flex-col items-center gap-10">
        <ImageUploader onUpload={setImage} />

        <div className="flex flex-col lg:flex-row justify-center items-start gap-10 w-full">
          <div className="flex flex-col items-center w-full max-w-md">
            <h2 className="text-lg font-semibold mb-2">Original</h2>
            {image ? (
              <div className="w-full border border-zinc-700 rounded shadow overflow-hidden bg-zinc-800">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Original"
                  className="w-full h-auto object-contain"
                />
              </div>
            ) : (
              <div className="w-full h-[300px] flex items-center justify-center text-gray-500 border border-dashed rounded">
                No image uploaded.
              </div>
            )}
          </div>

          <CanvasEditor
            canvasRef={canvasRef}
            image={image}
            exportFormat={exportFormat}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            fillMode={fillMode}
            zoom={zoom}
            setZoom={setZoom}
          />
        </div>
      </section>
    </main>
  );
}

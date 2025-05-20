import { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import CanvasEditor from "../components/CanvasEditor";
import SettingsPanel from "../components/SettingsPanel";

export default function App() {
  const [image, setImage] = useState<File | null>(null);
  const [exportFormat, setExportFormat] = useState<"png" | "jpg">("png");
  const [canvasWidth, setCanvasWidth] = useState(1920);
  const [canvasHeight, setCanvasHeight] = useState(1080);
  const [fillMode, setFillMode] = useState<"blur" | "generative">("blur");

  return (
    <div className="min-h-screen bg-zinc-900 text-white py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center">🖼️ Backdrop</h1>

        <SettingsPanel
          setExportFormat={setExportFormat}
          canvasWidth={canvasWidth}
          setCanvasWidth={setCanvasWidth}
          canvasHeight={canvasHeight}
          setCanvasHeight={setCanvasHeight}
          fillMode={fillMode}
          setFillMode={setFillMode}
        />

        <ImageUploader onUpload={setImage} />

        <div className="flex flex-col lg:flex-row justify-center gap-8">
          {/* Original Image Preview */}
          <div className="flex flex-col items-center w-full max-w-[400px] mx-auto">
            <h2 className="text-lg font-semibold mb-2">Original Image</h2>
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

          {/* Canvas Preview */}
          <CanvasEditor
            image={image}
            exportFormat={exportFormat}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            fillMode={fillMode}
          />
        </div>
      </div>
    </div>
  );
}

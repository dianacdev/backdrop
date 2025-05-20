import { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import CanvasEditor from "../components/CanvasEditor";
import SettingsPanel from "../components/SettingsPanel";

export default function App() {
  const [image, setImage] = useState<File | null>(null);
  const [exportFormat, setExportFormat] = useState<"png" | "jpg">("png");
  const [fillMode, setFillMode] = useState<"blur" | "generative">("blur");
  const [canvasWidth, setCanvasWidth] = useState(1920);
  const [canvasHeight, setCanvasHeight] = useState(1080);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Backdrop</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <ImageUploader onUpload={setImage} />
          <SettingsPanel
            setExportFormat={setExportFormat}
            canvasWidth={canvasWidth}
            setCanvasWidth={setCanvasWidth}
            canvasHeight={canvasHeight}
            setCanvasHeight={setCanvasHeight}
            fillMode = {fillMode}
            setFillMode = {setFillMode}
          />
        </div>
        <div className="md:w-2/3">
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

import React from "react";

interface Props {
  setExportFormat: (format: "png" | "jpg") => void;
  canvasWidth: number;
  setCanvasWidth: (w: number) => void;
  canvasHeight: number;
  setCanvasHeight: (h: number) => void;
  fillMode: "blur" | "generative";
  setFillMode: (mode: "blur" | "generative") => void;
}

export default function SettingsPanel({
  setExportFormat,
  canvasWidth,
  setCanvasWidth,
  canvasHeight,
  setCanvasHeight,
  fillMode,
  setFillMode
}: Props) {
  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExportFormat(e.target.value as "png" | "jpg");
  };
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Canvas Settings</h2>
      <div className="space-y-2">
        <label className="block">
          Width:
          <input
            type="number"
            value={canvasWidth}
            onChange={(e) => setCanvasWidth(Number(e.target.value))}
            className="ml-2 border p-1 w-24"
          />
        </label>
        <label className="block">
          Height:
          <input
            type="number"
            value={canvasHeight}
            onChange={(e) => setCanvasHeight(Number(e.target.value))}
            className="ml-2 border p-1 w-24"
          />
        </label>
        <label className="block">
          Fill Mode:
          <select
            className="ml-2 border p-1"
            value={fillMode}
            onChange={(e) =>
              setFillMode(e.target.value as "blur" | "generative")
            }
          >
            <option value="blur">Blur</option>
            <option value="generative">Generative Fill</option>
          </select>
        </label>

        <label className="block">
          Image Fit:
          <select className="ml-2 border p-1">
            <option>Fit</option>
            <option>Crop</option>
          </select>
        </label>
        <label className="block">
          Download As:
          <select className="ml-2 border p-1">
            <option>PNG</option>
            <option>JPG</option>
          </select>
        </label>
        <label className="block">
          Download As:
          <select
            className="ml-2 border p-1"
            onChange={handleFormatChange}
            defaultValue="png"
          >
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
          </select>
        </label>
      </div>
    </div>
  );
}

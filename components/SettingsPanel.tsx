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
  setFillMode,
}: Props) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Canvas Settings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <label className="flex flex-col text-sm">
          Width
          <input
            type="number"
            value={canvasWidth}
            onChange={(e) => setCanvasWidth(Number(e.target.value))}
            className="mt-1 p-2 rounded bg-zinc-800 text-white border border-zinc-600"
          />
        </label>

        <label className="flex flex-col text-sm">
          Height
          <input
            type="number"
            value={canvasHeight}
            onChange={(e) => setCanvasHeight(Number(e.target.value))}
            className="mt-1 p-2 rounded bg-zinc-800 text-white border border-zinc-600"
          />
        </label>

        <label className="flex flex-col text-sm">
          Fill Mode
          <select
            value={fillMode}
            onChange={(e) =>
              setFillMode(e.target.value as "blur" | "generative")
            }
            className="mt-1 p-2 rounded bg-zinc-800 text-white border border-zinc-600"
          >
            <option value="blur">Blur</option>
            <option value="generative">Generative Fill</option>
          </select>
        </label>

        <label className="flex flex-col text-sm">
          Download Format
          <select
            onChange={(e) => setExportFormat(e.target.value as "png" | "jpg")}
            defaultValue="png"
            className="mt-1 p-2 rounded bg-zinc-800 text-white border border-zinc-600"
          >
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
          </select>
        </label>
      </div>
    </div>
  );
}

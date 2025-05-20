interface Props {
  exportFormat: "png" | "jpg";
  setExportFormat: (format: "png" | "jpg") => void;
  canvasWidth: number;
  setCanvasWidth: (w: number) => void;
  canvasHeight: number;
  setCanvasHeight: (h: number) => void;
  fillMode: "blur" | "generative";
  setFillMode: (mode: "blur" | "generative") => void;
  image: File | null;
  onDownload: () => void;
  zoom: number;
  setZoom: (z: number) => void;
  sampleMode: "full" | "edge";
  setSampleMode: (mode: "full" | "edge") => void;
}

const presets = [
  { label: "1080x1920 (Full HD Portrait)", width: 1080, height: 1920 },
  { label: "1440x3440 (Ultrawide Mobile)", width: 1440, height: 3440 },
];

export default function SettingsPanel({
  exportFormat,
  setExportFormat,
  canvasWidth,
  setCanvasWidth,
  canvasHeight,
  setCanvasHeight,
  fillMode,
  setFillMode,
  image,
  onDownload,
  zoom,
  setZoom,
  sampleMode,
  setSampleMode
}: Props) {
  const swapDimensions = () => {
    const temp = canvasWidth;
    setCanvasWidth(canvasHeight);
    setCanvasHeight(temp);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-zinc-950 border border-amber-500 rounded-2xl p-6 shadow-lg">
      <div className="flex flex-col space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-widest uppercase text-yellow-400">
            ⚡ Settings
          </h2>
        </div>

        {/* Presets */}
        <div className="w-full">
          <h3 className="text-md font-semibold mb-2 text-zinc-300">
            Canvas Presets
          </h3>
          <div className="flex flex-wrap justify-start gap-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setCanvasWidth(preset.width);
                  setCanvasHeight(preset.height);
                }}
                className="bg-zinc-800 border border-zinc-600 px-3 py-1 rounded-md text-xs font-medium tracking-wide text-white hover:bg-zinc-700 transition"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <label className="flex flex-col text-sm text-zinc-300">
            Width
            <input
              type="number"
              value={canvasWidth}
              onChange={(e) => setCanvasWidth(Number(e.target.value))}
              className="mt-1 p-2 rounded bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </label>

          <label className="flex flex-col text-sm text-zinc-300">
            Height
            <input
              type="number"
              value={canvasHeight}
              onChange={(e) => setCanvasHeight(Number(e.target.value))}
              className="mt-1 p-2 rounded bg-zinc-900 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </label>

          <div className="flex flex-col justify-end">
            <button
              onClick={swapDimensions}
              className="mt-auto bg-zinc-800 text-yellow-400 px-4 py-2 rounded-md hover:bg-zinc-700 transition font-semibold"
            >
              🔄 Swap Dimensions
            </button>
          </div>

          <label className="flex flex-col text-sm text-zinc-300">
            Fill Mode
            <select
              value={fillMode}
              onChange={(e) =>
                setFillMode(e.target.value as "blur" | "generative")
              }
              className="mt-1 p-2 rounded bg-zinc-900 text-white border border-zinc-700"
            >
              <option value="blur">Blur</option>
              <option value="generative">Generative Fill</option>
            </select>
          </label>

          <label className="flex flex-col text-sm text-zinc-300">
            Export Format
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as "png" | "jpg")}
              className="mt-1 p-2 rounded bg-zinc-900 text-white border border-zinc-700"
            >
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
            </select>
          </label>

          <label className="flex flex-col text-sm text-zinc-300 col-span-1 md:col-span-2 lg:col-span-3">
            Zoom (Preserves Aspect Ratio)
            <input
              type="range"
              min={0.5}
              max={2.5}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="mt-1 accent-yellow-500"
            />
            <span className="text-xs text-zinc-500 mt-1">
              Current: {(zoom ?? 1).toFixed(2)}x
            </span>
          </label>
        </div>
        <label className="flex flex-col text-sm text-zinc-300">
          Sampling Area
          <select
            value={sampleMode}
            onChange={(e) => setSampleMode(e.target.value as "full" | "edge")}
            className="mt-1 p-2 rounded bg-zinc-900 text-white border border-zinc-700"
          >
            <option value="full">Full Image</option>
            <option value="edge">Edge Pixels Only</option>
          </select>
        </label>

        {/* Download Button */}
        <div className="w-full flex justify-end">
          <button
            onClick={onDownload}
            disabled={!image}
            className="bg-yellow-500 text-black px-6 py-2 rounded-md hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition font-bold tracking-wide"
          >
            ⬇ Download Image
          </button>
        </div>
      </div>
    </div>
  );
}

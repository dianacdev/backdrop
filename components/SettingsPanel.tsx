import React from 'react';

export default function SettingsPanel() {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Canvas Settings</h2>
      <div className="space-y-2">
        <label className="block">
          Width: <input type="number" defaultValue={1920} className="ml-2 border p-1 w-24" />
        </label>
        <label className="block">
          Height: <input type="number" defaultValue={1080} className="ml-2 border p-1 w-24" />
        </label>
        <label className="block">
          Fill Mode:
          <select className="ml-2 border p-1">
            <option>Blur</option>
            <option>Generative Fill</option>
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
      </div>
    </div>
  );
}

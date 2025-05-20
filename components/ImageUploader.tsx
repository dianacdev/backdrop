import React from 'react';

interface Props {
  onUpload: (file: File) => void;
}

export default function ImageUploader({ onUpload }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div>
      <label className="block mb-2 font-medium">Upload Image</label>
      <input type="file" accept="image/*" onChange={handleChange} />
    </div>
  );
}

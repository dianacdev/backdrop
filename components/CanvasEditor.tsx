import React, { useRef, useEffect } from 'react';

interface Props {
  image: File | null;
}

export default function CanvasEditor({ image }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvasRef.current!.width = 1920;
      canvasRef.current!.height = 1080;

      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

      // Center the image
      const x = (1920 - img.width) / 2;
      const y = (1080 - img.height) / 2;
      ctx.drawImage(img, x, y);
    };
    img.src = URL.createObjectURL(image);
  }, [image]);

  return <canvas ref={canvasRef} className="border w-full h-auto" />;
}

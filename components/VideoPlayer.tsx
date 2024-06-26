import { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  onEnded: () => void;
}

export default function VideoPlayer({ onEnded }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute top-0 left-0 w-full h-full object-cover"
      onEnded={onEnded}
      muted
      playsInline
    >
      <source src="/cowka.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
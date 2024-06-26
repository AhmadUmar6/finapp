'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import VideoPlayer from '@/components/VideoPlayer';
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);

  const handleVideoEnd = () => {
    router.push('/notes');
  };

  const handleButtonClick = () => {
    setShowVideo(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Fixed background image */}
      <div className="fixed inset-0">
        <Image
          src="/os.jpeg"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {/* Video player */}
      {showVideo && (
        <div className="fixed inset-0 z-20 flex justify-center items-center">
          <VideoPlayer onEnded={handleVideoEnd} />
        </div>
      )}

      {/* Fixed button in the bottom-right quadrant */}
      <div className="fixed bottom-80 right-80 z-30">
        {!showVideo && (
          <Button
            onClick={handleButtonClick}
            variant="default"
            className="bg-white/30 backdrop-blur-md p-6 rounded-lg"
          >
            Hell Yeah
          </Button>
        )}
      </div>
    </div>
  );
}
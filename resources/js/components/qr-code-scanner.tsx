import { useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

const QrCodeScanner = ({ qrbox = 250, fps = 10, onResult }: { qrbox?: number, fps?: number, onResult: (decodedText: string, decodedResult: any) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const reader = new BrowserMultiFormatReader();
    readerRef.current = reader;

    reader
      .decodeFromVideoDevice(
        undefined, // Use default camera
        videoRef.current,
        (result, error) => {
          if (result) {
            onResult(result.getText(), result);
          }
          if (error && error.name !== 'NotFoundException') {
            console.error('QR code scanning error:', error);
          }
        }
      )
      .catch((error) => {
        console.error('Failed to start video stream:', error);
      });

    return () => {
      if (readerRef.current) {
        // Cleanup will happen automatically when component unmounts
        readerRef.current = null;
      }
    };
  }, [onResult]);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className="w-full max-w-md mx-auto"
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: `${qrbox}px`,
          maxHeight: `${qrbox}px`
        }}
      />
      <div
        className="absolute inset-0 border-2 border-blue-500 pointer-events-none"
        style={{
          width: `${qrbox}px`,
          height: `${qrbox}px`,
          maxWidth: '100%',
          maxHeight: '100%',
          margin: '0 auto',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        {/* Corner indicators */}
        <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-blue-500"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-blue-500"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-blue-500"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-blue-500"></div>
      </div>
    </div>
  );
};

export default QrCodeScanner;

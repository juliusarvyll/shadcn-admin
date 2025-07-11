import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QrCodeScanner = ({ qrbox = 250, fps = 10, onResult }: { qrbox?: number, fps?: number, onResult: (decodedText: string, decodedResult: any) => void }) => {
  const scannerRef = useRef(null);

  useEffect(() => {
    const config = { fps, qrbox };

    const html5QrcodeScanner = new Html5QrcodeScanner(
      'qr-code-full-region',
      config,
      /* verbose= */ false
    );

    html5QrcodeScanner.render(
      (decodedText, decodedResult) => {
        if (onResult) onResult(decodedText, decodedResult);
      },
      (error) => {
        console.error('QR code scanning error:', error);
      }
    );

    return () => {
      html5QrcodeScanner.clear().catch(error => {
        console.error('Failed to clear QR scanner', error);
      });
    };
  }, [fps, qrbox, onResult]);

  return <div id="qr-code-full-region" ref={scannerRef}></div>;
};

export default QrCodeScanner;

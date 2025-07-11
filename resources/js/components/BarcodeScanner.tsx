import React, { useCallback, useRef, useEffect } from 'react';
import { Camera, CameraOff, Scan, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCamera } from '@/hooks/use-camera';

interface BarcodeScannerProps {
    onScan: (barcode: string) => void;
    onError?: (error: string) => void;
    placeholder?: string;
    className?: string;
    showCameraSelector?: boolean;
    showBarcodeDisplay?: boolean;
    scannedBarcode?: string;
}

export function BarcodeScanner({
    onScan,
    onError,
    placeholder = "Scan or enter barcode",
    className = "",
    showCameraSelector = true,
    showBarcodeDisplay = true,
    scannedBarcode = "",
}: BarcodeScannerProps) {
    const {
        scanning,
        cameraError,
        scanSuccess,
        availableCameras,
        selectedCamera,
        cameraPermission,
        toggleScanning,
        setSelectedCamera,
        setScanSuccess,
        startScanner,
        stopScanner,
    } = useCamera();

    const scannerElementRef = useRef<HTMLDivElement>(null);

    // Handle scan success
    const handleScanSuccess = useCallback((decodedText: string) => {
        onScan(decodedText);
        setScanSuccess(true);
        setTimeout(() => setScanSuccess(false), 2000);
    }, [onScan, setScanSuccess]);

    // Handle scan error
    const handleScanError = useCallback((error: any) => {
        console.error('Scan error:', error);
        if (onError) {
            onError('Failed to scan barcode');
        }
    }, [onError]);

    // Start scanner when scanning state changes
    useEffect(() => {
        if (scanning && scannerElementRef.current) {
            const elementId = `scanner-${Date.now()}`;
            scannerElementRef.current.id = elementId;
            startScanner(elementId, handleScanSuccess).catch(handleScanError);
        } else if (!scanning) {
            stopScanner();
        }
    }, [scanning, startScanner, stopScanner, handleScanSuccess, handleScanError]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopScanner();
        };
    }, [stopScanner]);

    return (
        <div className={`space-y-3 ${className}`}>
            {/* Camera Selection */}
            {showCameraSelector && availableCameras.length > 1 && !scanning && (
                <div>
                    <label className="block text-sm font-medium mb-1">Select Camera</label>
                    <select
                        className="w-full border rounded px-2 py-1 text-sm"
                        value={selectedCamera}
                        onChange={(e) => setSelectedCamera(e.target.value)}
                    >
                        {availableCameras.map((camera) => (
                            <option key={camera.deviceId} value={camera.deviceId}>
                                {camera.label || `Camera ${camera.deviceId.slice(0, 8)}...`}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Camera Error */}
            {cameraError && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <span className="text-sm text-destructive">{cameraError}</span>
                </div>
            )}

            {/* Scan Success */}
            {scanSuccess && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700">Barcode scanned successfully!</span>
                </div>
            )}

            {/* Barcode Scanner */}
            {scanning && (
                <div className="space-y-3">
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                        <div
                            ref={scannerElementRef}
                            className="w-full h-64 flex items-center justify-center bg-gray-100"
                        >
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
                                <p className="text-sm text-gray-600">Initializing camera...</p>
                            </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-black/50 text-white px-3 py-1 rounded text-sm">
                                <Scan className="h-4 w-4 inline mr-1" />
                                Point camera at barcode
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                        Position the barcode within the camera view to scan
                    </p>
                </div>
            )}

            {/* Barcode Display */}
            {showBarcodeDisplay && scannedBarcode && !scanning && (
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Scanned Barcode:</label>
                    <div className="p-3 bg-gray-50 rounded-md">
                        <div className="text-sm font-mono">{scannedBarcode}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

interface BarcodeScannerWithInputProps extends Omit<BarcodeScannerProps, 'onScan'> {
    value: string;
    onChange: (value: string) => void;
    inputClassName?: string;
    buttonClassName?: string;
}

export function BarcodeScannerWithInput({
    value,
    onChange,
    placeholder = "Scan or enter barcode",
    className = "",
    inputClassName = "",
    buttonClassName = "",
    ...scannerProps
}: BarcodeScannerWithInputProps) {
    const {
        scanning,
        cameraPermission,
        toggleScanning,
    } = useCamera();

    return (
        <div className={`space-y-3 ${className}`}>
            <div className="flex gap-2 items-center">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`flex-1 border rounded px-3 py-2 ${inputClassName}`}
                />
                <Button
                    type="button"
                    variant="outline"
                    onClick={toggleScanning}
                    disabled={cameraPermission === 'denied'}
                    className={`flex items-center gap-2 ${buttonClassName}`}
                >
                    {scanning ? (
                        <>
                            <CameraOff className="h-4 w-4" />
                            Stop Scanning
                        </>
                    ) : (
                        <>
                            <Camera className="h-4 w-4" />
                            Scan Barcode
                        </>
                    )}
                </Button>
            </div>

            <BarcodeScanner
                onScan={onChange}
                scannedBarcode={value}
                {...scannerProps}
            />
        </div>
    );
}

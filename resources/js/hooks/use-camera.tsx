import { useState, useEffect, useCallback, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeScanType } from 'html5-qrcode';

interface CameraState {
    scanning: boolean;
    cameraError: string | null;
    scanSuccess: boolean;
    availableCameras: MediaDeviceInfo[];
    selectedCamera: string;
    cameraPermission: 'granted' | 'denied' | 'prompt' | null;
}

interface UseCameraReturn extends CameraState {
    checkCameraPermissions: () => Promise<boolean>;
    requestCameraAccess: () => Promise<boolean>;
    toggleScanning: () => Promise<void>;
    setSelectedCamera: (deviceId: string) => void;
    resetCameraError: () => void;
    setScanSuccess: (success: boolean) => void;
    startScanner: (elementId: string, onScan: (decodedText: string) => void) => Promise<void>;
    stopScanner: () => Promise<void>;
}

export function useCamera(): UseCameraReturn {
    const [scanning, setScanning] = useState(false);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [scanSuccess, setScanSuccess] = useState(false);
    const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
    const [selectedCamera, setSelectedCamera] = useState<string>('');
    const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt' | null>(null);

    const scannerRef = useRef<Html5Qrcode | null>(null);

    // Stop scanner
    const stopScanner = useCallback(async () => {
        if (scannerRef.current && scanning) {
            try {
                await scannerRef.current.stop();
                scannerRef.current = null;
            } catch (error) {
                console.error('Error stopping scanner:', error);
            }
        }
    }, [scanning]);

    // Check camera permissions and available devices
    const checkCameraPermissions = useCallback(async () => {
        try {
            // Check if camera permissions are supported
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                setCameraError('Camera access is not supported in this browser');
                return false;
            }

            // Check current permission status
            const permission = await navigator.permissions.query({ name: 'camera' as PermissionName });
            setCameraPermission(permission.state);

            if (permission.state === 'denied') {
                setCameraError('Camera access has been denied. Please enable camera permissions in your browser settings.');
                return false;
            }

            // Get available cameras
            const devices = await navigator.mediaDevices.enumerateDevices();
            const cameras = devices.filter(device => device.kind === 'videoinput');
            setAvailableCameras(cameras);

            if (cameras.length === 0) {
                setCameraError('No cameras found on this device');
                return false;
            }

            // Set default camera
            if (cameras.length > 0 && !selectedCamera) {
                setSelectedCamera(cameras[0].deviceId);
            }

            return true;
        } catch (error) {
            console.error('Error checking camera permissions:', error);
            setCameraError('Failed to check camera permissions');
            return false;
        }
    }, [selectedCamera]);

    // Request camera access
    const requestCameraAccess = useCallback(async () => {
        try {
            setCameraError(null);

            // Test camera access with a simple getUserMedia call
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    deviceId: selectedCamera ? { exact: selectedCamera } : undefined,
                    facingMode: 'environment' // Prefer back camera on mobile
                }
            });

            // Stop the test stream immediately
            stream.getTracks().forEach(track => track.stop());

            setCameraPermission('granted');
            return true;
        } catch (error: any) {
            console.error('Camera access error:', error);

            if (error.name === 'NotAllowedError') {
                setCameraError('Camera access was denied. Please allow camera permissions and try again.');
                setCameraPermission('denied');
            } else if (error.name === 'NotFoundError') {
                setCameraError('No camera found on this device');
            } else if (error.name === 'NotReadableError') {
                setCameraError('Camera is already in use by another application. Please close other camera applications and try again.');
            } else if (error.name === 'OverconstrainedError') {
                setCameraError('Camera does not meet the required constraints. Trying different camera...');
                // Try without device constraints
                try {
                    const fallbackStream = await navigator.mediaDevices.getUserMedia({
                        video: { facingMode: 'environment' }
                    });
                    fallbackStream.getTracks().forEach(track => track.stop());
                    setCameraPermission('granted');
                    return true;
                } catch (fallbackError) {
                    setCameraError('Failed to access any camera. Please check your camera settings.');
                }
            } else {
                setCameraError('Failed to access camera: ' + error.message);
            }

            return false;
        }
    }, [selectedCamera]);

    // Start scanner with html5-qrcode
    const startScanner = useCallback(async (elementId: string, onScan: (decodedText: string) => void) => {
        try {
            // Stop any existing scanner
            await stopScanner();

            // Create new scanner instance
            const html5QrCode = new Html5Qrcode(elementId);
            scannerRef.current = html5QrCode;

            // Configure scanner
            const config = {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0,
                supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
            };

            // Start scanning
            await html5QrCode.start(
                { deviceId: selectedCamera ? { exact: selectedCamera } : undefined },
                config,
                (decodedText) => {
                    onScan(decodedText);
                    setScanSuccess(true);
                    setTimeout(() => setScanSuccess(false), 2000);
                },
                (errorMessage) => {
                    // Ignore normal scanning errors
                    console.debug('Scan error:', errorMessage);
                }
            );

            setScanning(true);
            setCameraError(null);
        } catch (error: any) {
            console.error('Scanner start error:', error);
            setCameraError('Failed to start camera scanner: ' + error.message);
            setScanning(false);
        }
    }, [selectedCamera, stopScanner]);

    // Toggle scanning
    const toggleScanning = useCallback(async () => {
        if (scanning) {
            await stopScanner();
            setScanning(false);
            setCameraError(null);
            return;
        }

        const hasPermission = await checkCameraPermissions();
        if (!hasPermission) {
            return;
        }

        const hasAccess = await requestCameraAccess();
        if (hasAccess) {
            // Note: startScanner will be called by the component with the element ID
            setScanning(true);
            setCameraError(null);
        }
    }, [scanning, checkCameraPermissions, requestCameraAccess, stopScanner]);

    // Reset camera error
    const resetCameraError = useCallback(() => {
        setCameraError(null);
    }, []);

    // Initialize camera check on component mount
    useEffect(() => {
        checkCameraPermissions();

        // Cleanup on unmount
        return () => {
            stopScanner();
        };
    }, [checkCameraPermissions, stopScanner]);

    return {
        scanning,
        cameraError,
        scanSuccess,
        availableCameras,
        selectedCamera,
        cameraPermission,
        checkCameraPermissions,
        requestCameraAccess,
        toggleScanning,
        setSelectedCamera,
        resetCameraError,
        setScanSuccess,
        startScanner,
        stopScanner,
    };
}

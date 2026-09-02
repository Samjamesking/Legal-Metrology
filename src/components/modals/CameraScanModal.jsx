import React, { useState, useEffect, useRef } from 'react';
import { Camera, X, RefreshCw, CheckCircle, VideoOff, Layers } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../../data/sampleProducts';

export default function CameraScanModal({ isOpen, onClose, onCaptureProduct }) {
  const [streamActive, setStreamActive] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDemoCommodity, setSelectedDemoCommodity] = useState(SAMPLE_PRODUCTS[1]);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    // Try starting webcam via navigator.mediaDevices.getUserMedia
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setStreamActive(true);
          }
        })
        .catch((err) => {
          console.log('Webcam access not granted or unavailable, activating simulated live sensor feed:', err);
          setError('Camera stream unavailable. Running high-precision simulated commodity video feed.');
          setStreamActive(false);
        });
    } else {
      setError('WebRTC Camera API not supported in this browser. Running simulated feed.');
      setStreamActive(false);
    }

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setStreamActive(false);
  };

  const handleCapture = () => {
    onCaptureProduct(selectedDemoCommodity);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-gov-xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-gov-blue dark:text-blue-400" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Real-Time Commodity Camera Scanner
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder Container */}
        <div className="relative aspect-4/3 bg-slate-950 flex items-center justify-center overflow-hidden">
          {streamActive ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
            />
          ) : (
            <div className="p-6 text-center text-slate-400 space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center">
                <Camera className="w-8 h-8 text-emerald-400 animate-pulse" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">Live Commodity Sensor Target</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Position packaged commodity within reticle box.
                </p>
              </div>
            </div>
          )}

          {/* Scanner Reticle Overlay */}
          <div className="absolute inset-8 border-2 border-dashed border-emerald-400/80 rounded-xl pointer-events-none flex flex-col justify-between p-3">
            <div className="flex justify-between">
              <span className="w-4 h-4 border-t-2 border-l-2 border-emerald-400"></span>
              <span className="w-4 h-4 border-t-2 border-r-2 border-emerald-400"></span>
            </div>
            {/* Animated Laser line */}
            <div className="w-full h-0.5 scanner-beam animate-laser"></div>
            <div className="flex justify-between">
              <span className="w-4 h-4 border-b-2 border-l-2 border-emerald-400"></span>
              <span className="w-4 h-4 border-b-2 border-r-2 border-emerald-400"></span>
            </div>
          </div>
        </div>

        {/* Feed Switcher / Demo Commodity Selector */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-400">Simulate Test Feed Target:</span>
            <select
              value={selectedDemoCommodity.id}
              onChange={(e) => {
                const found = SAMPLE_PRODUCTS.find(p => p.id === e.target.value);
                if (found) setSelectedDemoCommodity(found);
              }}
              className="p-1.5 rounded-gov bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold"
            >
              {SAMPLE_PRODUCTS.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCapture}
            className="w-full py-2.5 rounded-gov text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
          >
            <Camera className="w-4 h-4" />
            Capture & Analyze Label
          </button>
        </div>
      </div>
    </div>
  );
}

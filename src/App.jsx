import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { UploadCloud, CheckCircle, Loader2, Image as ImageIcon, Sparkles, FolderArchive, Moon, Sun } from 'lucide-react';

export default function App() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Theme State Initialization: Checks localStorage first, then system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply the theme to the HTML root element whenever it changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    }
  });

  const processImageToWebP = (file, index) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = 512;
          canvas.height = 512;
          const ctx = canvas.getContext('2d');

          ctx.clearRect(0, 0, 512, 512);

          const scale = Math.min(512 / img.width, 512 / img.height);
          const newWidth = img.width * scale;
          const newHeight = img.height * scale;
          const offsetX = (512 - newWidth) / 2;
          const offsetY = (512 - newHeight) / 2;

          ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);

          canvas.toBlob((blob) => {
            if (blob) resolve({ blob, originalName: file.name, index });
            else reject(new Error("Conversion failed"));
          }, 'image/webp', 0.8);
        };
        img.src = event.target.result;
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleConvert = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setProgress(0);

    const zip = new JSZip();
    const folder = zip.folder("whatsapp_stickers");
    let processedCount = 0;

    try {
      const promises = files.map(async (file, index) => {
        const result = await processImageToWebP(file, index);
        // const safeName = result.originalName.split('.')[0].replace(/[^a-z0-9]/gi, '_').toLowerCase();
        // const fileName = `${safeName}_sticker_${result.index + 1}.webp`;
        const hash = crypto.randomUUID().replace(/-/g, '');
        const fileName = `sticker_${hash}.webp`;
        
        folder.file(fileName, result.blob);
        
        processedCount++;
        setProgress(Math.round((processedCount / files.length) * 100));
      });

      await Promise.all(promises);

      const zipContent = await zip.generateAsync({ type: "blob" });
      saveAs(zipContent, "whatsapp_stickers_batch.zip");
      
    } catch (error) {
      console.error("Error processing files:", error);
      alert("Something went wrong. Check the console.");
    } finally {
      setIsProcessing(false);
      setFiles([]); 
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col items-center justify-center p-4 sm:p-8 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900 transition-colors duration-500">
      
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="absolute top-4 right-4 sm:top-8 sm:right-8 p-3 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 shadow-sm transition-all duration-300"
        aria-label="Toggle Dark Mode"
      >
        {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      {/* Main Glassmorphism Card */}
      <div className="w-full max-w-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white/50 dark:border-slate-700/50 p-8 sm:p-12 transition-all duration-500 relative">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl mb-5 shadow-inner dark:shadow-none border border-transparent dark:border-indigo-500/20">
            <Sparkles className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3 transition-colors">
            Sticker Studio
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md mx-auto transition-colors">
            Drop your raw images. We'll perfectly size, pad, and convert them to WhatsApp WebP format instantly.
          </p>
        </div>

        {/* Dropzone Area */}
        <div 
          {...getRootProps()} 
          className={`relative group overflow-hidden border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ease-out ${
            isDragActive 
              ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10 scale-[1.02] shadow-lg' 
              : 'border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:shadow-md'
          }`}
        >
          <input {...getInputProps()} />
          
          <div className="relative z-10 flex flex-col items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
            <div className={`p-4 rounded-full mb-4 transition-colors duration-300 ${isDragActive ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 group-hover:text-indigo-500 dark:group-hover:text-indigo-400'}`}>
              <UploadCloud className="h-10 w-10" />
            </div>
            <p className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-1 transition-colors">
              {isDragActive ? "Drop files to begin..." : "Click or drag files here"}
            </p>
            <p className="text-sm text-slate-400 dark:text-slate-500 font-medium transition-colors">
              Supports individual files & complete folders (JPG, PNG)
            </p>
          </div>
        </div>

        {/* Dynamic Action Area */}
        {files.length > 0 && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
            
            {/* File Counter Row */}
            <div className="flex items-center justify-between mb-6 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 transition-colors">
              <div className="flex items-center text-slate-700 dark:text-slate-300 font-medium">
                <FolderArchive className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-3" />
                <span>
                  <strong className="text-slate-900 dark:text-white">{files.length}</strong> {files.length === 1 ? 'file' : 'files'} queued
                </span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setFiles([]); }}
                className="text-sm font-semibold text-rose-500 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-500/10 px-3 py-1.5 rounded-lg transition-colors"
              >
                Clear Queue
              </button>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleConvert}
              disabled={isProcessing}
              className="group relative w-full bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white font-semibold py-4 rounded-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100 shadow-xl shadow-slate-900/20 dark:shadow-indigo-900/20 overflow-hidden flex items-center justify-center text-lg"
            >
              {isProcessing && (
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-indigo-600 dark:bg-indigo-400 transition-all duration-300 ease-out z-0"
                  style={{ width: `${progress}%` }}
                />
              )}
              
              <span className="relative z-10 flex items-center">
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-3" />
                    Packaging... {progress}%
                  </>
                ) : (
                  <>
                    Convert & Download Zip
                    <CheckCircle className="ml-2 h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </>
                )}
              </span>
            </button>
          </div>
        )}

      </div>
      
      {/* Footer */}
      <div className="mt-8 text-center text-sm font-medium text-slate-400 dark:text-slate-500 transition-colors">
        Zero server uploads. 100% local processing.
      </div>

    </div>
  );
}

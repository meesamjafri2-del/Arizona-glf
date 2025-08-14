import { useState, useRef } from 'react';

interface FileUploadProps {
  onUploadComplete: () => void;
}

interface UploadFile {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

export default function FileUpload({ onUploadComplete }: FileUploadProps) {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip',
    'text/plain'
  ];

  const maxFileSize = 50 * 1024 * 1024; // 50MB

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (!allowedTypes.includes(file.type)) {
        alert(`File type ${file.type} is not allowed`);
        continue;
      }
      
      if (file.size > maxFileSize) {
        alert(`File ${file.name} is too large. Maximum size is 50MB`);
        continue;
      }
      
      newFiles.push({
        file,
        progress: 0,
        status: 'pending'
      });
    }
    
    setUploadFiles(prev => [...prev, ...newFiles]);
  };

  const uploadFile = async (uploadFile: UploadFile, index: number) => {
    const formData = new FormData();
    formData.append('file', uploadFile.file);

    try {
      setUploadFiles(prev => prev.map((f, i) => 
        i === index ? { ...f, status: 'uploading' as const, progress: 0 } : f
      ));

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          setUploadFiles(prev => prev.map((f, i) => 
            i === index ? { ...f, progress } : f
          ));
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          setUploadFiles(prev => prev.map((f, i) => 
            i === index ? { ...f, status: 'completed' as const, progress: 100 } : f
          ));
          onUploadComplete();
        } else {
          const errorText = xhr.responseText || 'Upload failed';
          setUploadFiles(prev => prev.map((f, i) => 
            i === index ? { ...f, status: 'error' as const, error: errorText } : f
          ));
        }
      });

      xhr.addEventListener('error', () => {
        setUploadFiles(prev => prev.map((f, i) => 
          i === index ? { ...f, status: 'error' as const, error: 'Network error' } : f
        ));
      });

      xhr.open('POST', '/api/files/upload');
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.withCredentials = true;
      xhr.send(formData);

    } catch (error) {
      setUploadFiles(prev => prev.map((f, i) => 
        i === index ? { ...f, status: 'error' as const, error: 'Upload failed' } : f
      ));
    }
  };

  const startUploads = () => {
    uploadFiles.forEach((uploadFile, index) => {
      if (uploadFile.status === 'pending') {
        uploadFile(uploadFile, index);
      }
    });
  };

  const removeFile = (index: number) => {
    setUploadFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearCompleted = () => {
    setUploadFiles(prev => prev.filter(f => f.status !== 'completed'));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? 'border-brandBlue bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="mt-4">
          <p className="text-lg font-medium text-gray-900">
            Drop files here or click to browse
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Supports: Images, PDFs, Documents, Spreadsheets, Archives (Max 50MB each)
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
          accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.zip,.txt"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="mt-4 bg-brandBlue text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Select Files
        </button>
      </div>

      {/* Upload Queue */}
      {uploadFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Upload Queue ({uploadFiles.length} files)
            </h3>
            <div className="space-x-2">
              <button
                onClick={startUploads}
                disabled={uploadFiles.every(f => f.status !== 'pending')}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload All
              </button>
              <button
                onClick={clearCompleted}
                disabled={!uploadFiles.some(f => f.status === 'completed')}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear Completed
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {uploadFiles.map((uploadFile, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {uploadFile.file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(uploadFile.file.size)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {uploadFile.status === 'pending' && (
                      <button
                        onClick={() => uploadFile(uploadFile, index)}
                        className="text-brandBlue hover:text-blue-700"
                      >
                        Upload
                      </button>
                    )}
                    
                    {uploadFile.status === 'completed' && (
                      <span className="text-green-600 text-sm">✓ Complete</span>
                    )}
                    
                    {uploadFile.status === 'error' && (
                      <span className="text-red-600 text-sm">✗ Failed</span>
                    )}
                    
                    <button
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {uploadFile.status === 'uploading' && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-brandBlue h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadFile.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{uploadFile.progress}%</p>
                  </div>
                )}
                
                {uploadFile.error && (
                  <p className="text-sm text-red-600 mt-1">{uploadFile.error}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

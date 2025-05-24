// DocumentForm.tsx

"use client";

import React, { useRef, useState, useCallback } from "react";
import { BsInfoCircleFill } from "react-icons/bs";
import { Button } from "../ui/button";
import { X, Upload, FileText, File } from "lucide-react";
import { toast } from "sonner";

interface DocumentFormProps {
  onData: (data: File[]) => void;
}

interface UploadedFile {
  file: File;
  id: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

export default function DocumentForm({ onData }: DocumentFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const validateFile = (file: File): boolean => {
    const allowedTypes = [
      'text/plain',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      toast.error(`Unsupported file type: ${file.name}`);
      return false;
    }

    if (file.size > maxSize) {
      toast.error(`File too large: ${file.name}. Maximum size is 10MB.`);
      return false;
    }

    return true;
  };

  const simulateUpload = (fileId: string): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === fileId 
                ? { ...f, progress: 100, status: 'completed' }
                : f
            )
          );
          resolve();
        } else {
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === fileId 
                ? { ...f, progress: Math.floor(progress) }
                : f
            )
          );
        }
      }, 100);
    });
  };

  const handleFiles = useCallback(async (files: FileList) => {
    const validFiles: File[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (validateFile(file)) {
        validFiles.push(file);
      }
    }

    if (validFiles.length === 0) return;

    const newUploadedFiles: UploadedFile[] = validFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      progress: 0,
      status: 'uploading'
    }));

    setUploadedFiles(prev => [...prev, ...newUploadedFiles]);

    // Simulate upload progress for each file
    for (const uploadedFile of newUploadedFiles) {
      await simulateUpload(uploadedFile.id);
    }

    // Update parent component with all files
    const allFiles = [...uploadedFiles, ...newUploadedFiles].map(f => f.file);
    onData(allFiles);
  }, [uploadedFiles, onData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
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
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => {
      const updated = prev.filter(f => f.id !== fileId);
      onData(updated.map(f => f.file));
      return updated;
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return <File className="w-4 h-4 text-red-500" />;
    if (fileType.includes('text')) return <FileText className="w-4 h-4 text-blue-500" />;
    if (fileType.includes('document')) return <FileText className="w-4 h-4 text-blue-600" />;
    if (fileType.includes('presentation')) return <FileText className="w-4 h-4 text-orange-500" />;
    if (fileType.includes('csv') || fileType.includes('excel') || fileType.includes('spreadsheet')) {
      return <FileText className="w-4 h-4 text-green-500" />;
    }
    return <FileText className="w-4 h-4 text-gray-500" />;
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-medium mb-1">Train using documents</p>
        <div className="flex flex-row gap-1 items-center">
          <BsInfoCircleFill className="text-gray-300 text-xs" />
          <p className="text-xs text-muted-foreground">
            Supported file formats: PDF, TXT, DOCX, PPTX, CSV (Max 10MB each)
          </p>
        </div>
      </div>

      <input
        type="file"
        accept=".txt,.pdf,.docx,.pptx,.csv,.xlsx,.xls"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        style={{ display: "none" }}
      />

      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragOver 
            ? "border-brand-primary bg-brand-primary/5" 
            : "border-gray-300 bg-gray-50 hover:bg-gray-100"
        }`}
      >
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-600 mb-1">
          {isDragOver ? "Drop files here" : "Click to upload or drag and drop"}
        </p>
        <p className="text-xs text-gray-400">
          PDF, TXT, DOCX, PPTX, CSV files
        </p>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Uploaded Files ({uploadedFiles.length})</p>
          {uploadedFiles.map((uploadedFile) => (
            <div
              key={uploadedFile.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
            >
              <div className="flex items-center gap-3 flex-1">
                {getFileIcon(uploadedFile.file.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {uploadedFile.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(uploadedFile.file.size)}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              {uploadedFile.status === 'uploading' && (
                <div className="flex items-center gap-2 mr-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-brand-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadedFile.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-8">{uploadedFile.progress}%</span>
                </div>
              )}

              {/* Status Indicators */}
              {uploadedFile.status === 'completed' && (
                <div className="flex items-center gap-2 mr-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-xs text-green-600">Complete</span>
                </div>
              )}

              {uploadedFile.status === 'error' && (
                <div className="flex items-center gap-2 mr-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-xs text-red-600">Error</span>
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(uploadedFile.id)}
                className="h-8 w-8 p-0 hover:bg-gray-200"
              >
                <X className="w-4 h-4 text-gray-500" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
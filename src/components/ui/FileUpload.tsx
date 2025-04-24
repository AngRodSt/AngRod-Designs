import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { IconTrash, IconUpload } from '@tabler/icons-react';
import { useDropzone } from 'react-dropzone';
import { toast, Toaster } from 'react-hot-toast';

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 0,
    y: -30,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

type FileUploadProps = {
  onChange?: (files: File[]) => void;
  resetTrigger?: boolean;
  maxSizeMB?: number;
  allowedExtensions?: string[];
};

export const FileUpload = ({
  onChange,
  resetTrigger,
  maxSizeMB = 5,
  allowedExtensions = ['.png', '.jpg', '.jpeg', '.pdf', 'webp'],
}: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset file input and internal file list when `resetTrigger` changes
  useEffect(() => {
    if (resetTrigger) {
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [resetTrigger]);
  // Update internal state and notify parent when files change
  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
    if (onChange) {
      onChange(newFiles);
    }
  };
  // Remove a selected file and notify parent
  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
  };
  // Trigger native file input when user clicks on upload area
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  // Setup react-dropzone for drag-and-drop file input
  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error: unknown) => {
      console.log(error);
    },
  });

  const getExtension = (filename: string) =>
    filename.slice((filename.lastIndexOf('.') >>> 0) + 1).toLowerCase();
  // Validates file extension and size, then handles file change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const selectedFiles = Array.from(input.files || []);
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    const validFiles: File[] = [];

    for (const file of selectedFiles) {
      const ext = `.${getExtension(file.name)}`;
      if (!allowedExtensions.includes(ext)) {
        toast.error(
          `"${file.name}" has an unsupported extension. Allowed: ${allowedExtensions.join(', ')}`
        );
        input.value = '';
        return;
      }

      if (file.size > maxSizeBytes) {
        toast.error(
          `"${file.name}" is too large. Max allowed is ${maxSizeMB}MB.`
        );
        input.value = '';
        return;
      }

      validFiles.push(file);
    }

    handleFileChange(validFiles);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full" {...getRootProps()}>
        <motion.div className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden">
          <input
            ref={fileInputRef}
            max={1}
            id="file-upload-handle"
            type="file"
            accept={allowedExtensions.join(',')}
            name="file"
            onChange={handleChange}
            className="hidden"
          />
          <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
            <GridPattern />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="relative z-20 font-sans font-bold text-neutral-100 text-base">
              Upload a file {maxSizeMB}mb max
            </p>
            <p className="relative z-20 font-sans font-normal text-[#f1cca3]  text-base mt-2">
              Drag or drop your files here or click to upload
            </p>
            <p className="relative z-20 font-sans font-normal text-[#f1cca3]  text-base mt-2">
              Allowed:({allowedExtensions.join(', ')})
            </p>
            <div className="relative w-full mt-10 max-w-xl mx-auto">
              {files.length > 0 &&
                files.map((file, idx) => (
                  <motion.div
                    key={'file' + idx}
                    layoutId={idx === 0 ? 'file-upload' : 'file-upload-' + idx}
                    className={cn(
                      'relative overflow-hidden z-40 bg-white  flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md',
                      'shadow-sm'
                    )}
                  >
                    <div className="flex justify-between w-full items-center gap-4">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="text-base text-neutral-700  truncate max-w-xs"
                      >
                        {file.name}
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-neutral-600  e shadow-input"
                      >
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </motion.p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemoveFile(idx);
                        }}
                        className="text-red-500 hover:text-red-700"
                        title="Remove file"
                      >
                        <IconTrash size={18} />
                      </button>
                    </div>

                    <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 0">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                        className="px-1 py-0.5 rounded-md bg-gray-100  "
                      >
                        {file.type}
                      </motion.p>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        layout
                      >
                        modified{' '}
                        {new Date(file.lastModified).toLocaleDateString()}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              {!files.length && (
                <motion.div
                  onClick={handleClick}
                  whileHover="animate"
                  layoutId="file-upload"
                  variants={mainVariant}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={cn(
                    'relative group-hover/file:shadow-2xl z-40 bg-[#f1cca3] flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md',
                    'shadow-[0px_10px_50px_rgba(0,0,0,0.1)]'
                  )}
                >
                  {isDragActive ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-neutral-600 flex flex-col items-center"
                    >
                      Drop it
                      <IconUpload className="h-4 w-4 text-neutral-600 " />
                    </motion.p>
                  ) : (
                    <IconUpload className="h-4 w-4 text-neutral-600 " />
                  )}
                </motion.div>
              )}

              {!files.length && (
                <motion.div
                  variants={secondaryVariant}
                  className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
                ></motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

//Grid that serve as background of the component
export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-900 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? 'bg-gray-800'
                  : 'bg-gray-800 shadow-[0px_0px_1px_3px_rgba(50, 50, 50, 0.1)_inset]'
              }`}
            />
          );
        })
      )}
    </div>
  );
}

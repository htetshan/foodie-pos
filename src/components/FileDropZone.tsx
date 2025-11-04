import { useDropzone } from "react-dropzone";

interface Props {
  onDrop: (files: File[]) => void;
}

export default function FileDropZone({ onDrop }: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{ border: "2px dashed gray", padding: 20, textAlign: "center" }}
    >
      <input {...getInputProps()} />
      {isDragActive
        ? "Drop the file here..."
        : "Drag & drop a file here, or click to select"}
    </div>
  );
}

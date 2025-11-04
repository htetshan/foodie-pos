import { useState } from "react";
import FileDropZone from "@/components/FileDropZone";

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/asset", { method: "POST", body: formData });
    const data = await res.json();
    setImageUrl(data.assetUrl);
  };

  return (
    <div style={{ padding: 20 }}>
      <h4>
        ChatGpt MinIO object storage overview:
        https://chatgpt.com/share/6909a66d-a804-8002-83c0-9ff1deca8db7
      </h4>
      <h2>Upload Image to MinIO</h2>
      <FileDropZone onDrop={(files) => handleUpload(files[0])} />
      {imageUrl && (
        <div style={{ marginTop: 20 }}>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" style={{ width: 200 }} />
        </div>
      )}
    </div>
  );
}

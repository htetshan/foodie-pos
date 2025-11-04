// /components/ImageUploadForm.js (Example)
"use client"; // Required for App Router components using hooks

import { useState } from "react";

export default function ImageUploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    // 💡 'image' must match the field name in uploadMiddleware: upload.single('image')
    formData.append("image", file);

    setMessage("Uploading...");

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        // Note: Do NOT set Content-Type header manually for FormData.
        // Fetch API will set it correctly (multipart/form-data) with the boundary.
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Success! URL: ${data.url}, Key: ${data.key}`);
      } else {
        setMessage("Upload failed.");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      setMessage("An error occurred during upload.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        required
      />
      <button type="submit" disabled={!file}>
        Upload Image
      </button>
      <p>Status: **{message}**</p>
    </form>
  );
}

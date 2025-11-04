// src/pages/orderapp/index.tsx (Full Component)

import { useState, ChangeEvent, FormEvent } from "react";

const OrderApp = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setUploadMessage("");
    } else {
      setSelectedFile(null);
    }
  };

  const handleUploadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      setUploadMessage("Please select an image file first.");
      return;
    }

    setUploadMessage("Uploading image...");

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadMessage(`✅ Success! Key: ${data.key}, URL: ${data.url}`);
        setSelectedFile(null);
      } else {
        const error = await response.json();
        setUploadMessage(`❌ Upload failed: ${error.error || "Server error"}`);
      }
    } catch (error) {
      console.error("Network or request error:", error);
      setUploadMessage("❌ An unexpected error occurred during upload.");
    }
  };

  return (
    <div>
      <h2>🖼️ MinIO Image Upload</h2>
      <form onSubmit={handleUploadSubmit}>
        <input
          type="file"
          accept="image/*" // Restrict to image files
          onChange={handleFileChange}
          required
        />
        <button
          type="submit"
          disabled={!selectedFile || uploadMessage.includes("Uploading")}
        >
          {uploadMessage.includes("Uploading")
            ? "Processing..."
            : "Upload to MinIO"}
        </button>
      </form>
      {uploadMessage && (
        <p style={{ marginTop: "10px" }}>**Status:** {uploadMessage}</p>
      )}
    </div>
  );
};

export default OrderApp;

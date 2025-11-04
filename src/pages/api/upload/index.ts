// src/pages/orderapp/index.tsx (inside OrderApp)

// Function to handle the form submission and upload process
const handleUploadSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault(); // Prevent default form submission behavior

  if (!selectedFile) {
    setUploadMessage("Please select an image file first.");
    return;
  }

  setUploadMessage("Uploading image...");

  // 1. Create FormData object
  const formData = new FormData();
  // The key 'image' MUST match the field name used in your backend Multer configuration (e.g., upload.single('image'))
  formData.append("image", selectedFile);

  try {
    // 2. Send the request to your Next.js API route
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData, // FormData handles setting the correct Content-Type: multipart/form-data
    });

    // 3. Process the response
    if (response.ok) {
      const data = await response.json();
      // data should contain the URL and Key returned by the backend
      setUploadMessage(`✅ Success! Key: ${data.key}, URL: ${data.url}`);
      // Optionally reset the file input
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

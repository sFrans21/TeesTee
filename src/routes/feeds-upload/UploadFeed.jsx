import { useState } from "react";
import { db } from "../../utils/firebase/firebase.utils";
import { Link } from "react-router-dom";
import { UploadFeedContainer } from "./UploadFeeds.style";
import { collection, addDoc } from "firebase/firestore";

function UploadFeed() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title || !description) {
      alert("Semua data harus diisi!");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    // console.log("API Key:", process.env.REACT_APP_IMGBB_API_KEY);
    try {
      // Unggah ke ImgBB
      const response = await fetch(
        // `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_API_KEY}`,
        `https://api.imgbb.com/1/upload?key=741b1e174bbd351fa5c6d6e96d52d49d`,
        { method: "POST", body: formData }
      );
      const data = await response.json();
      console.log("Respons dari imgBB:", data);

      if (!data.success) {
        console.error("imgBB Error:", data.error);
        alert(`Gagal mengunggah gambar: ${data.error.message}`);
        return;
      }

      const imageURL = data.data.url;

      // Simpan ke Firestore
      const feedsCollectionRef = collection(db, "feeds"); // Akses koleksi "feeds"
      await addDoc(feedsCollectionRef, {
        title,
        description,
        imageURL,
        createdAt: new Date(),
      });

      alert("Produk berhasil diunggah!");
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan!");
    }
  };

  return (
    <UploadFeedContainer>
      <h1>Share Your Design</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Deskripsi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">Upload</button>
      </form>
    </UploadFeedContainer>
  );
}

export default UploadFeed;

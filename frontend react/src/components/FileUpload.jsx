export default function FileUpload({ onUpload }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onUpload(file);
  };

  return (
    <input
      type="file"
      accept=".pdf"
      onChange={handleChange}
    />
  );
}

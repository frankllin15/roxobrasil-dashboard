export const uploadImage = async (file: File) => {
  const url = import.meta.env.VITE_UPLOAD_API_URL;
  console.log(file.name, file.type);
  const formData = new FormData();
  formData.append("file", file);
  const resp = await fetch(url, {
    body: formData,
    method: "POST",
    headers: {
      // "Content-Type": file.type,
    },
  });
  console.log(resp.ok);
  return { success: resp.ok, assets: await resp.json() };
};

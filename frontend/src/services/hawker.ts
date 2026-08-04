import api from "@/api/axios";

export const getProfile = async () => {
  const response = await api.get("/hawker/profile");
  return response.data;
};

export const registerHawker = async (formData: FormData) => {
  const response = await api.post("/hawker/register", formData);
  return response.data;
};

export const updateProfile = async (formData: FormData) => {
  const response = await api.put("/hawker/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
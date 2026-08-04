import api from "@/api/axios";

export const verifyById = async (id: string) => {
  const response = await api.get(`/public/search/${id}`);

  return response.data;
};
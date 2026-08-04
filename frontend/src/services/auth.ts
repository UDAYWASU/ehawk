import api from "@/api/axios";

export const sendOtp = async (phone: string) => {
    const response = await api.post("/auth/send-otp", {
        phone,
    });

    return response.data;
};

export const verifyOtp = async (
    phone: string,
    otp: string
) => {

    const response = await api.post(
        "/auth/verify-otp",
        {
            phone,
            otp,
        }
    );

    return response.data;
};
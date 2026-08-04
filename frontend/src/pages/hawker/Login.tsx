import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProfile } from "@/services/hawker";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

import {
    sendOtp,
    verifyOtp,
} from "@/services/auth";

export default function Login() {

    const navigate = useNavigate();

    const [phone, setPhone] = useState("");

    const [otp, setOtp] = useState("");

    const [step, setStep] = useState(1);

    const handleSendOtp = async () => {

        await sendOtp(phone);

        setStep(2);

    };

const handleLogin = async () => {
    try {
        const data = await verifyOtp(phone, otp);

        localStorage.setItem(
            "access_token",
            data.access_token
        );

        localStorage.setItem(
            "role",
            data.role
        );

        const profile = await getProfile();

        if (profile === null) {
            navigate("/hawker/register");
        } else {
            navigate("/hawker/profile");
        }

    } catch (error) {
        alert("Invalid OTP");
        console.error(error);
    }
};

    return (

        <div className="mx-auto max-w-md">

            <Card>

                <h1 className="mb-6 text-2xl font-bold">
                    Hawker Login
                </h1>

                <Input
                    label="Phone Number"
                    value={phone}
                    onChange={(e) =>
                        setPhone(e.target.value)
                    }
                />

                {step === 2 && (

                    <div className="mt-5">

                        <Input
                            label="OTP"
                            value={otp}
                            onChange={(e) =>
                                setOtp(e.target.value)
                            }
                        />

                    </div>

                )}

                <div className="mt-6">

                    {step === 1 ? (

                        <Button
                            onClick={handleSendOtp}
                        >
                            Send OTP
                        </Button>

                    ) : (

                        <Button
                            onClick={handleLogin}
                        >
                            Login
                        </Button>

                    )}

                </div>

            </Card>

        </div>

    );

}
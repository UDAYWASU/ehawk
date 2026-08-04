import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { registerHawker } from "@/services/hawker";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    father_name: "",
    date_of_birth: "",
    aadhaar_number: "",
    gender: "",
    address: "",
    city: "Nagpur",
    state: "Maharashtra",
    pincode: "",
    business_name: "",
    business_category: "",
    cart_name: "",
    cart_type: "",
    selling_location: "",
    latitude: "",
    longitude: "",
  });

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [aadhaarPhoto, setAadhaarPhoto] = useState<File | null>(null);
  const [cartPhoto, setCartPhoto] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setForm((prev) => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          }));
        },
        (error) => {
          console.error("Error retrieving location:", error);
        }
      );
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const data = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (profilePhoto) data.append("profile_photo", profilePhoto);
    if (aadhaarPhoto) data.append("aadhaar_photo", aadhaarPhoto);
    if (cartPhoto) data.append("cart_photo", cartPhoto);

    await registerHawker(data);

    alert("Registration submitted successfully.");

    navigate("/hawker/profile");
  };

  return (
    <div className="mx-auto max-w-4xl py-8 px-4">
      <Card className="p-8 shadow-xl border border-gray-100 rounded-2xl bg-white">
        <div className="border-b border-gray-200 pb-5 mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Hawker Registration
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Please fill out all the required details to register your vending setup.
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-10">
          {/* Section 1: Personal Details */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-1 border-b">
              1. Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Enter full legal name"
              />

              <Input
                label="Father's Name"
                name="father_name"
                value={form.father_name}
                onChange={handleChange}
                placeholder="Enter father's name"
              />

              <Input
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                value={form.date_of_birth}
                onChange={handleChange}
              />

              <Input
                label="Aadhaar Number"
                name="aadhaar_number"
                value={form.aadhaar_number}
                onChange={handleChange}
                placeholder="12-digit Aadhaar number"
                maxLength={12}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 2: Address & Location */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-1 border-b">
              2. Address & Geographic Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input
                  label="Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street address, house number, landmark"
                />
              </div>

              <Input
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
              />

              <Input
                label="State"
                name="state"
                value={form.state}
                onChange={handleChange}
              />

              <Input
                label="Pincode"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="6-digit postal code"
              />

              <Input
                label="Selling Location"
                name="selling_location"
                value={form.selling_location}
                onChange={handleChange}
                placeholder="Specific market/area name"
              />

              <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-gray-700">
                    GPS Coordinates
                  </span>
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium underline focus:outline-none"
                  >
                    Auto-detect Location
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Latitude"
                    name="latitude"
                    value={form.latitude}
                    onChange={handleChange}
                    placeholder="e.g. 21.1458"
                  />
                  <Input
                    label="Longitude"
                    name="longitude"
                    value={form.longitude}
                    onChange={handleChange}
                    placeholder="e.g. 79.0882"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Business Information */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-1 border-b">
              3. Business & Cart Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Business Name"
                name="business_name"
                value={form.business_name}
                onChange={handleChange}
                placeholder="e.g. Nagpur Fresh Fruits"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Category
                </label>
                <select
                  name="business_category"
                  value={form.business_category}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                >
                  <option value="">Select Category</option>
                  <option value="Vegetables & Fruits">Vegetables & Fruits</option>
                  <option value="Street Food / Snacks">Street Food / Snacks</option>
                  <option value="Clothes & Apparel">Clothes & Apparel</option>
                  <option value="Electronics & Accessories">Electronics & Accessories</option>
                  <option value="Services & Repairs">Services & Repairs</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <Input
                label="Cart Name"
                name="cart_name"
                value={form.cart_name}
                onChange={handleChange}
                placeholder="Cart / Stall Identifier"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cart Type
                </label>
                <select
                  name="cart_type"
                  value={form.cart_type}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
                >
                  <option value="">Select Cart Type</option>
                  <option value="Hand Cart (Manual)">Hand Cart (Manual)</option>
                  <option value="Cycle Rickshaw">Cycle Rickshaw</option>
                  <option value="E-Rickshaw / Motorized">E-Rickshaw / Motorized</option>
                  <option value="Stationary Kiosk / Table">Stationary Kiosk / Table</option>
                  <option value="Head Load / Portable Basket">Head Load / Portable Basket</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 4: Document Uploads */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-1 border-b">
              4. Document Uploads
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Photo
                </label>
                <div className="mt-1 flex justify-center px-4 pt-4 pb-4 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-400 transition-colors">
                  <div className="space-y-1 text-center">
                    <div className="flex text-xs text-gray-600 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                        <span>Upload Profile</span>
                        <input
                          type="file"
                          className="sr-only"
                          onChange={(e) =>
                            setProfilePhoto(e.target.files?.[0] || null)
                          }
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 truncate max-w-[150px]">
                      {profilePhoto ? profilePhoto.name : "PNG, JPG up to 5MB"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aadhaar Card Photo
                </label>
                <div className="mt-1 flex justify-center px-4 pt-4 pb-4 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-400 transition-colors">
                  <div className="space-y-1 text-center">
                    <div className="flex text-xs text-gray-600 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                        <span>Upload Document</span>
                        <input
                          type="file"
                          className="sr-only"
                          onChange={(e) =>
                            setAadhaarPhoto(e.target.files?.[0] || null)
                          }
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 truncate max-w-[150px]">
                      {aadhaarPhoto ? aadhaarPhoto.name : "PNG, JPG up to 5MB"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cart Photo
                </label>
                <div className="mt-1 flex justify-center px-4 pt-4 pb-4 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-400 transition-colors">
                  <div className="space-y-1 text-center">
                    <div className="flex text-xs text-gray-600 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                        <span>Upload Cart Photo</span>
                        <input
                          type="file"
                          className="sr-only"
                          onChange={(e) =>
                            setCartPhoto(e.target.files?.[0] || null)
                          }
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 truncate max-w-[150px]">
                      {cartPhoto ? cartPhoto.name : "PNG, JPG up to 5MB"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Form Actions */}
          <div className="pt-6 border-t border-gray-200">
            <Button
              loading={loading}
              onClick={handleSubmit}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-all text-base"
            >
              Submit Registration
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
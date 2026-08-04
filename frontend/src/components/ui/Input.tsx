import type { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({
  label,
  ...props
}: Props) {
  return (
    <div className="space-y-2">

      <label className="block text-sm font-medium">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-xl border border-gray-300 bg-white p-3 outline-none focus:border-blue-500"
      />

    </div>
  );
}
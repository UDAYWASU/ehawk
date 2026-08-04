import { STATUS_COLORS } from "@/utils/theme";

interface Props {
  status: "approved" | "pending" | "rejected";
}

export default function Badge({
  status,
}: Props) {
  return (
    <span
      className={`
      rounded-full
      px-3
      py-1
      text-sm
      font-semibold
      ${STATUS_COLORS[status]}
      `}
    >
      {status}
    </span>
  );
}
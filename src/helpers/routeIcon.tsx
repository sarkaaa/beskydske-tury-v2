import { FaBus, FaCar, FaTrain } from "react-icons/fa";

function RouteIcon({ type, className }: { type: "car" | "bus" | "train"; className: string }) {
  if (type === "train") return <FaTrain className={className} />;
  if (type === "bus") return <FaBus className={className} />;
  return <FaCar className={className} />;
}

export default RouteIcon;

import { FaBus, FaCar, FaTrain } from "react-icons/fa";

function RouteIcon({ type, className }: { type: "car" | "bus" | "train"; className: string }) {
  if (type === "train") return <FaTrain className={className} data-testid="transport-icon-train" />;
  if (type === "bus") return <FaBus className={className} data-testid="transport-icon-bus" />;
  return <FaCar className={className} data-testid="transport-icon-car" />;
}

export default RouteIcon;

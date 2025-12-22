import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";

export default function NavBtn({path, title, icon}) {
  return (
    <NavLink to={path}
      className="relative flex items-center gap-4 p-4 rounded-xl
  bg-linear-to-b from-[#1b2b55] to-[#0b1635]
  border-2 border-white/70 shadow-[0_0_40px_rgba(120,170,255,0.35)]
  backdrop-blur-lg
  overflow-hidden
  duration-150
"
    >
      <span className="pointer-events-none absolute inset-0 bg-[url('/btn-bg.png')]"></span>
      <span className="pointer-events-none absolute inset-0 rounded-xl ring-2 bg-radial from-white/0 from-20% to-white/50 to-120% "></span>

      <Icon icon={icon} width={32} height={32}/>

      <span className="relative z-10 text-white text-md font-semibold tracking-wide">
        {title}
      </span>
    </NavLink>
  );
}

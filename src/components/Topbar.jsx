import { NavLink, useLocation, useNavigate } from "react-router-dom";
import formatTitle from "../libs/formateTitle";
import { Icon } from "@iconify/react";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthContext";

/* 🔧 BACKEND BASE URL */
const BACKEND_URL = "http://172.252.13.97:8020";

export default function Topbar({ isMobile = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const Title = formatTitle(location.pathname);

  /* ================= PROFILE IMAGE HANDLER ================= */
  const getProfileImage = () => {
    if (!user?.profile_image) {
      return "https://api.dicebear.com/7.x/avataaars/svg";
    }

    // absolute URL
    if (user.profile_image.startsWith("http")) {
      return `${user.profile_image}?t=${Date.now()}`;
    }

    // relative path (/media/...)
    return `${BACKEND_URL}${user.profile_image}?t=${Date.now()}`;
  };

  return (
    <div className="flex justify-between items-center w-full">
      {!isMobile && (
        <h4 className="text-3xl font-semibold">{Title}</h4>
      )}

      <div className="flex items-center gap-4 md:gap-6">
        {/* Notification */}
        <NavLink to="/notifications">
          <Icon
            icon={
              location.pathname === "/notifications"
                ? "si:notifications-fill"
                : "si:notifications-line"
            }
            width={isMobile ? 24 : 32}
            height={isMobile ? 24 : 32}
          />
        </NavLink>

        {/* Profile Image */}
        <button
          onClick={() => navigate("/setting")}
          className={`rounded-full overflow-hidden border-2 border-[#2B7FFF33] ${
            isMobile ? "w-10 h-10" : "w-16 h-16"
          }`}
        >
          <img
            src={getProfileImage()}
            alt="Profile"
            className="w-full h-full object-cover cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
}

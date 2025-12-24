import React from "react";
import cn from "../libs/cn";

export default function NotificatonCard({ style, title, time }) {
  return (
    <div className="bg-[#1D293D80] rounded-[10px] p-3 flex items-start gap-4 mb-3">
      <div
        className={cn("w-3 h-3 bg-amber-400 rounded-full mt-1 ml-1", style)}
      ></div>
      <div>
        <h3 className="flex-1 text-sm">{title}</h3>
        <p className="text-[#7A8BA4] text-[12px]">{time}</p>
      </div>
    </div>
  );
}

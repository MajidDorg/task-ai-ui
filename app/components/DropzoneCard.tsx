import Image from "next/image";
import React from "react";
import file_attachment_icon from "../../public/assets/Hero_Button Icon.svg";

type DropzoneCardProps = {
  isActive?: boolean;
  onUploadClick: () => void;
  onDragEnter: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
};

export default function DropzoneCard({
  isActive,
  onUploadClick,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
}: DropzoneCardProps) {
  return (
    <div
      className={`mt-3 rounded-[24px] border ${
        isActive
          ? "border-fuchsia-300 shadow-[0_12px_48px_rgba(208,128,255,0.35)]"
          : "border-slate-200"
      } bg-white`}
    >
      <div
        className={`m-3 rounded-[20px] border-2 border-dashed ${
          isActive
            ? "border-fuchsia-300 bg-fuchsia-50/40"
            : "border-slate-300 bg-white/85"
        } px-4 py-5 md:px-6 md:py-6`}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="flex items-start justify-between gap-4">
          <p className="text-xs text-slate-600 md:text-sm">
            Suggest diversification strategies for a $1M construction investment
            portfolio.
          </p>
          <div className="flex items-center gap-4 text-slate-500">
            <Image
              src={file_attachment_icon}
              alt="Attachment"
              width={20}
              height={20}
              className="opacity-70"
            />
            <span className="text-xs md:text-sm">PDF</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={onUploadClick}
            className="text-success-60 text-sm underline decoration-success-60 underline-offset-2 hover:brightness-110"
          >
            Click here
          </button>
          <span className="text-xs text-slate-500">
            to upload your file or drag.
          </span>
        </div>
        <p className="mt-2 text-center text-[10px] text-slate-400">
          Supported Format: CSV, PNG, PDF (10mb each)
        </p>
      </div>
    </div>
  );
}

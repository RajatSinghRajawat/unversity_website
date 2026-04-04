import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const CardDetailModal = ({ isOpen, onClose, title, image, body, meta }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-blue-100"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="card-detail-modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors shadow"
          aria-label="Close"
        >
          <FaTimes className="text-lg" />
        </button>
        {image && (
          <div className="w-full overflow-hidden rounded-t-2xl bg-gray-100">
            <img
              src={image}
              alt=""
              className="w-full max-h-72 object-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop";
              }}
            />
          </div>
        )}
        <div className="p-6 sm:p-8">
          <h2
            id="card-detail-modal-title"
            className="text-2xl font-bold text-blue-950 pr-10"
          >
            {title}
          </h2>
          {meta && (
            <p className="mt-2 text-sm font-semibold text-blue-700">{meta}</p>
          )}
          {body && (
            <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line">
              {body}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardDetailModal;

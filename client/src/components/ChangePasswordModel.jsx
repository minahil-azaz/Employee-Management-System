import React, { useState } from "react";
import { X, Lock, Loader2 } from "lucide-react";

const ChangePasswordModel = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // ✅ SAFE onClose wrapper (prevents crash if parent is wrong)
  const safeClose = () => {
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      const formData = new FormData(e.target);
      const currentPassword = formData.get("currentPassword");
      const newPassword = formData.get("newPassword");

      // 🔥 Replace with real API call
      setTimeout(() => {
        setLoading(false);
        setMessage({
          type: "success",
          text: "Password updated successfully!",
        });

        setTimeout(() => {
          safeClose(); // ✅ safe now
        }, 1000);
      }, 1000);
    } catch (error) {
      setLoading(false);
      setMessage({
        type: "error",
        text: "Failed to update password",
      });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* Overlay */}
      <div
        onClick={safeClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <div
        className="relative z-50 w-full max-w-md bg-white shadow-2xl rounded-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <h2 className="flex items-center gap-2 text-lg font-medium text-slate-900">
            <Lock className="w-5 h-5 text-slate-400" />
            Change Password
          </h2>

          {/* X BUTTON */}
          <button
            type="button"
            onClick={safeClose}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FORM */}
        <form className="p-6 space-y-5" onSubmit={handleSubmit}>
          
          {/* MESSAGE */}
          {message.text && (
            <div
              className={`flex items-center gap-3 p-3 text-sm rounded-xl border ${
                message.type === "success"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-rose-50 text-rose-700 border-rose-200"
              }`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  message.type === "success"
                    ? "bg-emerald-500"
                    : "bg-rose-500"
                }`}
              />
              {message.text}
            </div>
          )}

          {/* CURRENT PASSWORD */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              required
              className="w-full px-4 py-2 border rounded-lg border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>

          {/* NEW PASSWORD */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              required
              className="w-full px-4 py-2 border rounded-lg border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-2">
            
            <button
              type="button"
              onClick={safeClose}
              className="flex-1 px-4 py-2 border rounded-lg text-slate-600 border-slate-200 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-white rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-50"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Update Password
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModel;
import React from "react";
import { Loader2, Save, User } from "lucide-react";
import { dummyEmployeeData } from "../data/dummyEmployeeData";

const ProfileForm = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [message, setMessage] = React.useState(null);

  const initialData = dummyEmployeeData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      // Simulate API request
      setTimeout(() => {
        setMessage("Profile updated successfully.");
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 mb-6 card sm:p-6">
      <h2 className="flex items-center gap-2 pb-4 mb-4 text-base font-medium border-b text-slate-900 border-slate-100">
        <User className="w-5 h-5 text-slate-400" />
        Public Profile
      </h2>

      {error && (
        <div className="flex items-start gap-3 p-4 mb-6 text-sm border rounded-xl bg-rose-50 text-rose-700 border-rose-200">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
          <span>{error}</span>
        </div>
      )}

      {message && (
        <div className="flex items-start gap-3 p-4 mb-6 text-sm border rounded-xl bg-emerald-50 text-emerald-700 border-emerald-200">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
          <span>{message}</span>
        </div>
      )}

      <div className="space-y-5">
        {/* Top Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              disabled
              value={`${initialData.firstName} ${initialData.lastName}`}
              className="w-full px-4 py-2 border rounded-lg cursor-not-allowed bg-slate-50 text-slate-400 border-slate-200"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              disabled
              value={initialData.email}
              className="w-full px-4 py-2 border rounded-lg cursor-not-allowed bg-slate-50 text-slate-400 border-slate-200"
            />
          </div>

          {/* Position */}
          <div className="sm:col-span-2">
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Position
            </label>
            <input
              type="text"
              disabled
              value={initialData.position}
              className="w-full px-4 py-2 border rounded-lg cursor-not-allowed bg-slate-50 text-slate-400 border-slate-200"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Bio
          </label>

          <textarea
            name="bio"
            disabled={initialData.isDeleted}
            defaultValue={initialData.bio || ""}
            placeholder="Write your brief bio here..."
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg resize-none border-slate-200 ${
              initialData.isDeleted
                ? "bg-slate-50 text-slate-400 cursor-not-allowed"
                : "bg-white text-slate-700"
            }`}
          />

          <p className="mt-1.5 text-sm text-slate-400">
            This will be displayed on your profile
          </p>
        </div>

        {/* If Deleted */}
        {initialData.isDeleted ? (
          <div className="pt-2">
            <div className="p-4 text-center border rounded-xl bg-rose-50 border-rose-200">
              <p className="font-medium tracking-tight text-rose-600">
                Account Deactivated
              </p>
              <p className="mt-0.5 text-sm text-rose-500">
                You can no longer update your profile
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center w-full gap-2 px-4 py-2 text-white rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-50 sm:w-auto"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4 animate-bounce" />
              )}
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
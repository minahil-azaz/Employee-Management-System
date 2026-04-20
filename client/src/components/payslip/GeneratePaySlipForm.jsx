import React, { useState } from "react";
import { X, Plus } from "lucide-react";

const GeneratePaySlipForm = ({ employee = [], onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);

    const data = {
      employeeId: form.get("employeeId"),
      month: form.get("month"),
      year: form.get("year"),
      basicSalary: form.get("basicSalary"),
      allowance: form.get("allowance"),
      deductions: form.get("deductions"),
    };

    console.log("Payslip Data:", data);

    setTimeout(() => {
      setLoading(false);
      setIsOpen(false);
      onSuccess?.();
    }, 800);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
      >
        <Plus className="w-4 h-4" />
        Generate Payslip
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">

      <div className="w-full max-w-lg p-6 bg-white shadow-2xl rounded-2xl animate-fade-in">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">
            Generate Monthly Salary Slip
          </h3>

          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* EMPLOYEE */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-600">
              Employee
            </label>

            <select
              name="employeeId"
              className="w-full p-2 border rounded-lg"
              required
            >
              {employee.length > 0 ? (
                employee.map((e) => (
                  <option key={e.id || e._id} value={e.id || e._id}>
                    {e.firstName} {e.lastName} - {e.position}
                  </option>
                ))
              ) : (
                <option>No employees found</option>
              )}
            </select>
          </div>

          {/* MONTH + YEAR */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-600">
                Month
              </label>

              <select
                name="month"
                className="w-full p-2 border rounded-lg"
                required
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-600">
                Year
              </label>

              <select
                name="year"
                className="w-full p-2 border rounded-lg"
                required
              >
                {Array.from({ length: 5 }, (_, i) => 2024 + i).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* SALARY INPUTS */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-600">
              Basic Salary
            </label>
            <input
              type="number"
              name="basicSalary"
              placeholder="Enter basic salary"
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-600">
                Allowance
              </label>
              <input
                type="number"
                name="allowance"
                placeholder="0"
                defaultValue={0}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-600">
                Deductions
              </label>
              <input
                type="number"
                name="deductions"
                placeholder="0"
                defaultValue={0}
                className="w-full p-2 border rounded-lg"
              />
            </div>

          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              {loading ? "Generating..." : "Generate"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default GeneratePaySlipForm;
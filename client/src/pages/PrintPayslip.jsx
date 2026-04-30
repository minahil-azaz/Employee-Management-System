import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import Loading from "../components/Loading";
import { dummyPayslipData } from "../data/assets";

const Printpayslip = () => {
  const { id } = useParams();

  const [paySlip, setPaySlip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const foundSlip = dummyPayslipData.find((slip) => slip._id === id);
    setPaySlip(foundSlip || null);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) return <Loading />;

  if (!paySlip)
    return (
      <p className="py-12 text-center text-slate-400">
        Payslip not found
      </p>
    );

  return (
    <div className="max-w-2xl p-8 mx-auto bg-white animate-fade-in">

      {/* HEADER */}
      <div className="pb-6 mb-8 text-center border-b border-slate-200">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Payslip
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          {format(new Date(paySlip.year, paySlip.month - 1), "MM yyyy")}
        </p>
      </div>

      {/* EMPLOYEE INFO */}
      <div className="grid grid-cols-2 gap-6 mb-8">

        <div>
          <p className="mb-1 text-xs tracking-wider uppercase text-slate-400">
            Employee Name
          </p>
          <p className="font-semibold text-slate-900">
            {paySlip.employee?.firstName} {paySlip.employee?.lastName}
          </p>
        </div>

        <div>
          <p className="mb-1 text-xs tracking-wider uppercase text-slate-400">
            Position
          </p>
          <p className="font-semibold text-slate-900">
            {paySlip.employee?.position}
          </p>
        </div>

        <div>
          <p className="mb-1 text-xs tracking-wider uppercase text-slate-400">
            Email
          </p>
          <p className="font-semibold text-slate-900">
            {paySlip.employee?.email}
          </p>
        </div>

        <div>
          <p className="mb-1 text-xs tracking-wider uppercase text-slate-400">
            Period
          </p>
          <p className="font-semibold text-slate-900">
            {format(new Date(paySlip.year, paySlip.month - 1), "MM yyyy")}
          </p>
        </div>
      </div>

      {/* SALARY TABLE */}
      <div className="mb-8 overflow-hidden border rounded-xl border-slate-200">
        <table className="w-full text-sm">

          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-xs tracking-wide text-left uppercase">
                Description
              </th>
              <th className="px-4 py-3 text-xs tracking-wide text-left uppercase">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>

            <tr className="border-t">
              <td className="px-4 py-3 text-slate-600">Basic Salary</td>
              <td className="px-4 py-3 font-medium text-slate-900">
                ${paySlip.basicSalary?.toLocaleString()}
              </td>
            </tr>

            <tr className="border-t">
              <td className="px-4 py-3 text-slate-600">Allowances</td>
              <td className="px-4 py-3 font-medium text-slate-900">
                +${paySlip.allowances?.toLocaleString()}
              </td>
            </tr>

            <tr className="border-t-2 border-slate-200">
              <td className="px-4 py-4 font-bold text-slate-900">
                Net Salary
              </td>
              <td className="px-4 py-4 font-bold text-right text-slate-900">
                ${paySlip.netSalary?.toLocaleString()}
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      {/* PRINT BUTTON */}
      <div className="text-center">
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          onClick={() => window.print()}
        >
          Print Payslip
        </button>
      </div>

    </div>
  );
};

export default Printpayslip;
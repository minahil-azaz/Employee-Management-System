import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'

import loginLanding from './pages/loginLanding';
import { Layout } from 'lucide-react';
import Dashboard from './pages/dashboard';
import Employee from './pages/Employee';
import Attandence from './pages/attandence';
import Leaves from './pages/leaves';
import Payslips from './pages/payslips';
import Printpayslip from './pages/printpayslip';
import Settings from "./pages/Settings";
import LoginForm from './components/LoginForm';
import LoginLanding from './pages/loginLanding';

export const App = () => {
  return (
    <>
      <Toaster />

      <Routes>

        <Route path="/login" element={<LoginLanding />} />

        <Route path="/login/admin" element={<LoginForm role="admin" title="Admin portal" subtitle="login to manage the organization" />} />
        <Route path="/login/employee" element={<LoginForm role="employee" title="Admin portal" subtitle="sign to access the account" />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/attandence" element={<Attandence />} />
          <Route path="/leaves" element={<Leaves />} />
          <Route path="/payslips" element={<Payslips />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="/print/payslips/:id" element={<Printpayslip />} />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />

      </Routes>
      


    </>
  )
}
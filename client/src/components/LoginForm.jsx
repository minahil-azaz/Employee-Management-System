import React, { useState } from 'react'
import LoginLeftSide from './LoginLeftSide'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react';

const LoginForm = ({ role, title, subtitle }) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* LEFT SIDE */}
      <LoginLeftSide />

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-16 bg-white">

        <div className="w-full max-w-md animate-fade-in">

          {/* Back Button */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition mb-8"
          >
            <ArrowLeftIcon size={16} />
            Back to portal
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-slate-900 mb-2">
              {title}
            </h1>
            <p className="text-slate-500">
              {subtitle}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 text-sm text-red-500 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="text-sm text-slate-600">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="abc@gmail.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-slate-600">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-500"
                >
                  {showPassword ? (
                    <EyeOffIcon size={18} />
                  ) : (
                    <EyeIcon size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-md flex items-center justify-center gap-2"
            >
              {loading && <Loader2Icon className="animate-spin" size={18} />}
              Sign in as {role}
            </button>

          </form>

        </div>

      </div>
    </div>
  )
}

export default LoginForm
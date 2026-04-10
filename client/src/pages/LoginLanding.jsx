import { ArrowRight, Shield, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoginLeftSide from '../components/LoginLeftSide';

const LoginLanding = () => {

  const portalOption = [
    {
      to: "/login/admin",
      title: "Admin portal",
      description: "login to manage the organization",
      icon: Shield
    },
    {
      to: "/login/employee",
      title: "Employee portal",
      description: "sign in to access account",
      icon: User
    }
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      <LoginLeftSide />

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto min-h-screen">

        <div className="w-full max-w-md animate-fade-in relative z-10">

          {/* header */}
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-medium text-slate-900 tracking-tight mb-3">
              Welcome Back
            </h2>
            <p className="text-slate-500">
              Select your portal to securely access your account
            </p>
          </div>

          {/* portals list */}
          <div className="space-y-4">
            {portalOption.map((portal) => {
              const Icon = portal.icon;

              return (
                <Link
                  key={portal.to}
                  to={portal.to}
                  className="group block bg-slate-50 border border-slate-200 rounded-lg p-5 sm:p-6 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50"
                >
                  <div className="flex items-center justify-between gap-4 sm:gap-5">

                    <div>
                      <h3 className="text-lg text-slate-800 group-hover:text-indigo-600 mb-1 transition-colors">
                        {portal.title}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {portal.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-slate-400 group-hover:text-indigo-500" />
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-300" />
                    </div>

                  </div>
                </Link>
              );
            })}
          </div>
          <footer className="w-full text-left py-4 text-sm text-slate-500 border-t border-slate-200 mt-10">
      © {new Date().getFullYear()} Employee Management System. All rights reserved.
    </footer>

        </div>

      </div>
    </div>
  );
};

export default LoginLanding;
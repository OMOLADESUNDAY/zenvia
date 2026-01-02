import React from "react";

export default function AccountInfo() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl rounded-lg bg-white shadow-sm">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4 border-b md:border-b-0 md:border-r p-6">
            <div className="flex flex-col items-center text-center">
              <img
                src="https://i.pravatar.cc/150?img=3"
                alt="User Avatar"
                className="h-24 w-24 rounded-full bg-gray-200"
              />
              <h2 className="mt-4 text-lg font-semibold">Mark Cole</h2>
              <p className="text-sm text-gray-500">swoo@gmail.com</p>
            </div>

            <nav className="mt-8 space-y-2">
              <button className="flex w-full items-center justify-between rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white">
                Account info
                <span>→</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                My order
                <span>→</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                My address
                <span>→</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Change password
                <span>→</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="w-full md:w-3/4 p-6 md:p-10">
            <h1 className="mb-6 text-xl font-semibold">Account Info</h1>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue="Mark"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue="Cole"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  defaultValue="swoo@gmail.com"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="tel"
                  defaultValue="+1 0231 4554 452"
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="rounded-md bg-green-500 px-6 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  Save
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

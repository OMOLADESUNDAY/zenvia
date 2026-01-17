import React from "react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 md:p-10 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold">Terms & Conditions</h1>

        <p className="mb-4 text-gray-600">
          By using Zenvia, you agree to the following terms and conditions.
        </p>

        <div className="space-y-6 text-sm text-gray-600">
          <section>
            <h2 className="font-semibold text-gray-800">
              1. Use of Our Platform
            </h2>
            <p className="mt-1">
              You agree to use our platform for lawful purposes only and not to
              misuse any services.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-800">
              2. Accounts & Security
            </h2>
            <p className="mt-1">
              You are responsible for maintaining the confidentiality of your
              account credentials.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-800">
              3. Limitation of Liability
            </h2>
            <p className="mt-1">
              Zenvia shall not be liable for any indirect or incidental damages
              resulting from the use of our platform.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;

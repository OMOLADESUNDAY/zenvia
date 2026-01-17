import React from "react";

const Policy = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 md:p-10 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold">Privacy & Policy</h1>

        <p className="mb-4 text-gray-600">
          At Zenvia, we value your privacy and are committed to protecting your
          personal information.
        </p>

        <div className="space-y-6 text-sm text-gray-600">
          <section>
            <h2 className="font-semibold text-gray-800">
              1. Information We Collect
            </h2>
            <p className="mt-1">
              We collect personal information such as name, email address, phone
              number, and payment details when you use our services.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-800">
              2. How We Use Your Information
            </h2>
            <p className="mt-1">
              Your data is used to process orders, improve our services, and
              communicate important updates.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-gray-800">
              3. Data Protection
            </h2>
            <p className="mt-1">
              We implement industry-standard security measures to keep your data
              safe.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Policy;

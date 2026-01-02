import { useState } from "react";

const steps = ["Billing", "Address", "Review"];

export default function Checkout() {
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    notes: "",
    createAccount: false,
    payment: "bank",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const isStepValid = () => {
    if (step === 0) {
      return (
        form.firstName &&
        form.lastName &&
        form.country &&
        form.city &&
        form.state &&
        form.zip &&
        form.phone &&
        form.email
      );
    }
    if (step === 1) {
      return form.street;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl bg-white rounded-lg shadow p-6 md:p-8">
        {/* STEPPER */}
        <div className="flex justify-between mb-8 text-sm font-medium">
          {steps.map((s, i) => (
            <span
              key={i}
              className={i <= step ? "text-green-600" : "text-gray-400"}
            >
              {s}
            </span>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 0 && (
          <div className="grid md:grid-cols-2 gap-4">
            <Input required label="First Name" name="firstName" onChange={handleChange} />
            <Input required label="Last Name" name="lastName" onChange={handleChange} />
            <Input label="Company Name (Optional)" name="company" onChange={handleChange} />
            <Select required label="Country / Region" name="country" onChange={handleChange} />
            <Input required label="Street Address" name="street" onChange={handleChange} />
            <Input label="Apartment, suite (Optional)" name="apartment" onChange={handleChange} />
            <Input required label="Town / City" name="city" onChange={handleChange} />
            <Input required label="State / County" name="state" onChange={handleChange} />
            <Input required label="Zip / Postal Code" name="zip" onChange={handleChange} />
            <Input required label="Phone" name="phone" />
            <Input required label="Email Address" name="email" type="email" />
          </div>
        )}

        {/* STEP 2 */}
        {step === 1 && (
          <div className="space-y-4">
            <Textarea
              label="Additional Information (Optional)"
              name="notes"
              onChange={handleChange}
            />

            <Checkbox
              label="Create an account?"
              name="createAccount"
              onChange={handleChange}
            />
          </div>
        )}

        {/* STEP 3 */}
        {step === 2 && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* ORDER SUMMARY */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-4">Your Order</h3>
              <div className="flex justify-between text-sm mb-2">
                <span>Product Name</span>
                <span>$120.00</span>
              </div>
              <div className="flex justify-between text-sm border-t pt-2 font-medium">
                <span>Total</span>
                <span>$120.00</span>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-semibold">Payment Method</h3>

              <Radio
                label="Direct Bank Transfer"
                value="bank"
                name="payment"
                checked={form.payment === "bank"}
                onChange={handleChange}
              />
              <Radio
                label="PayPal"
                value="paypal"
                name="payment"
                checked={form.payment === "paypal"}
                onChange={handleChange}
              />

              <button className="w-full bg-green-600 text-white py-2 rounded text-sm font-medium hover:bg-green-700">
                Place Order
              </button>
            </div>
          </div>
        )}

        {/* NAVIGATION */}
        <div className="flex justify-between mt-8">
          <button
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 border rounded text-sm disabled:opacity-40"
          >
            Previous
          </button>

          {step < steps.length - 1 && (
            <button
              disabled={!isStepValid()}
              onClick={() => setStep(step + 1)}
              className="px-6 py-2 bg-green-600 text-white rounded text-sm disabled:opacity-40"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- REUSABLE UI ---------- */

function Input({ label, required, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className="mt-1 w-full border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-green-500"
      />
    </div>
  );
}

function Select({ label, required, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...props}
        className="mt-1 w-full border rounded px-3 py-2 text-sm"
      >
        <option value="">Select</option>
        <option>United States</option>
        <option>United Kingdom</option>
        <option>Canada</option>
      </select>
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <textarea
        {...props}
        className="mt-1 w-full border rounded px-3 py-2 text-sm"
        rows={4}
      />
    </div>
  );
}

function Checkbox({ label, ...props }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" {...props} />
      {label}
    </label>
  );
}

function Radio({ label, ...props }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="radio" {...props} />
      {label}
    </label>
  );
}

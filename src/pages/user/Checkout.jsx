import { useState } from "react";

const steps = ["Billing", "Address", "Review"];

export default function Checkout() {
  const [step, setStep] = useState(0);
  const [touched, setTouched] = useState({});

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

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const errors = {
    firstName: !form.firstName && "First name is required",
    lastName: !form.lastName && "Last name is required",
    country: !form.country && "Country is required",
    street: !form.street && "Street address is required",
    city: !form.city && "City is required",
    state: !form.state && "State is required",
    zip: !form.zip && "Zip code is required",
    phone: !form.phone && "Phone is required",
    email:
      !form.email
        ? "Email is required"
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
          "Invalid email format",
  };

  const isStepValid = () => {
    if (step === 0) {
      return (
        !errors.firstName &&
        !errors.lastName &&
        !errors.country &&
        !errors.street &&
        !errors.city &&
        !errors.state &&
        !errors.zip &&
        !errors.phone &&
        !errors.email
      );
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
            <Input
              required
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.firstName && errors.firstName}
            />

            <Input
              required
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastName && errors.lastName}
            />

            <Input
              label="Company Name (Optional)"
              name="company"
              value={form.company}
              onChange={handleChange}
            />

            <Select
              required
              label="Country / Region"
              name="country"
              value={form.country}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.country && errors.country}
            />

            <Input
              required
              label="Street Address"
              name="street"
              value={form.street}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.street && errors.street}
            />

            <Input
              label="Apartment, suite (Optional)"
              name="apartment"
              value={form.apartment}
              onChange={handleChange}
            />

            <Input
              required
              label="Town / City"
              name="city"
              value={form.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.city && errors.city}
            />

            <Input
              required
              label="State / County"
              name="state"
              value={form.state}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.state && errors.state}
            />

            <Input
              required
              label="Zip / Postal Code"
              name="zip"
              value={form.zip}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.zip && errors.zip}
            />

            <Input
              required
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone && errors.phone}
            />

            <Input
              required
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
            />
          </div>
        )}

        {/* STEP 2 */}
        {step === 1 && (
          <div className="space-y-4">
            <Textarea
              label="Additional Information (Optional)"
              name="notes"
              value={form.notes}
              onChange={handleChange}
            />

            <Checkbox
              label="Create an account?"
              name="createAccount"
              checked={form.createAccount}
              onChange={handleChange}
            />
          </div>
        )}

        {/* STEP 3 */}
        {step === 2 && (
          <div className="grid md:grid-cols-2 gap-6">
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

function Input({ label, required, error, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className={`mt-1 w-full border rounded px-3 py-2 text-sm focus:ring-1 ${
          error ? "border-red-500" : "focus:ring-green-500"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function Select({ label, required, error, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...props}
        className={`mt-1 w-full border rounded px-3 py-2 text-sm ${
          error ? "border-red-500" : ""
        }`}
      >
        <option value="">Select</option>
        <option>United States</option>
        <option>United Kingdom</option>
        <option>Canada</option>
      </select>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
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

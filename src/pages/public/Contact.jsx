import React, { useState } from 'react';
import { Mail, Phone, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      console.log('Form submitted:', formData);
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#00c950] py-12 px-4 mt-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">
          NEED HELP?
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side - Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Contact Us
            </h2>
            <p className="text-gray-600 mb-6">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00c950] focus:border-transparent outline-none transition resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-[#00c950] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#00b347] transition duration-300 shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </div>
          </div>

          {/* Right Side - Support Information */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <p className="text-gray-700 text-center mb-4">
                If you have inquiries or need assistance, do not hesitate to chat with us.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 text-center mb-3">
                Live Chat Hours:
              </h3>
              
              <p className="text-gray-700 text-center mb-2">
                We are available Monday to Friday (8 am to 6 pm) and weekends (8 am to 5 pm).
              </p>
              
              <p className="text-gray-700 text-center mb-6">
                On Public Holidays, we are available between 9am and 5pm.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <button className="flex items-center justify-center gap-2 bg-[#00c950] text-white font-semibold py-3 px-6 rounded-full hover:bg-[#00b347] transition duration-300 shadow-md">
                  <MessageSquare size={20} />
                  CHAT WITH US
                </button>
                
                <button className="flex items-center justify-center gap-2 bg-[#00c950] text-white font-semibold py-3 px-6 rounded-full hover:bg-[#00b347] transition duration-300 shadow-md">
                  <Phone size={20} />
                  CALL US
                </button>
              </div>

              <div className="border-t pt-6">
                <p className="text-gray-700 text-center mb-2">
                  You can also reach us on <span className="font-semibold">02018881106</span> from Monday to Friday (8 am to 5 pm).
                </p>
                
                <p className="text-gray-700 text-center">
                  On public Holidays, we are available between 9 am and 5 pm.
                </p>
              </div>
            </div>

            {/* Image Section */}
            <div className="bg-gradient-to-br from-[#00c950] to-[#00a844] rounded-2xl shadow-lg overflow-hidden h-64 md:h-80 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <Mail size={64} className="mx-auto mb-4 opacity-80" />
                <p className="text-xl md:text-2xl font-semibold">
                  We're here to help!
                </p>
                <p className="text-sm md:text-base mt-2 opacity-90">
                  Get in touch with our support team
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from "react";

export default function About() {
  return (
    <div className="bg-gray-50">
      {/* HERO */}
      <section className="bg-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Best experience always wins
            </h1>
            <p className="mt-4 text-gray-600">
              Delivering seamless logistics solutions to empower businesses and
              connect communities worldwide.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-6">
              <Stat title="$12.5M" subtitle="Revenue Generated" />
              <Stat title="12K+" subtitle="Happy Customers" />
              <Stat title="725+" subtitle="Global Partners" />
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1600180758890-6b94519a8ba6"
            alt="Boxes"
            className="rounded-lg object-cover h-64 w-full"
          />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="relative rounded-lg bg-green-600 p-6 text-white">
            <img
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
              alt="Delivery"
              className="rounded-md"
            />
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">
              We connect millions of buyers and sellers
            </h2>
            <p className="mt-4 text-gray-600">
              Our platform empowers individuals and businesses to grow by
              providing reliable logistics and seamless operations.
            </p>

            <button className="mt-6 inline-flex items-center rounded-md bg-green-500 px-6 py-2 text-sm font-medium text-white hover:bg-green-600">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          <Feature title="100% Authentic Products" />
          <Feature title="Fast Delivery" />
          <Feature title="Affordable Prices" />
        </div>
      </section>

      {/* MISSION */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">
            Our Mission and Vision
          </h2>
          <p className="text-gray-600 max-w-4xl">
            Our mission is to create a trusted global marketplace that delivers
            value through innovation, reliability, and customer-centric
            services.
          </p>

          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e"
            alt="City"
            className="mt-8 rounded-lg w-full h-72 object-cover"
          />
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold mb-6">
            From a retail store to a global chain
          </h2>

          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
            <TimelineItem year="2008" text="Founded with a small retail outlet." />
            <TimelineItem year="2012" text="Expanded operations nationwide." />
            <TimelineItem year="2016" text="Launched international shipping." />
            <TimelineItem year="2020" text="Reached 10K+ business partners." />
            <TimelineItem year="2023" text="Serving customers worldwide." />
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold mb-8">Leaderships</h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            <Leader name="Henry Avery" role="CEO" />
            <Leader name="Michael Edward" role="CTO" />
            <Leader name="Ethan Howard" role="COO" />
            <Leader name="Nathan Drake" role="Head of Sales" />
          </div>
        </div>
      </section>
    </div>
  );
}

/* Components */

function Stat({ title, subtitle }) {
  return (
    <div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}

function Feature({ title }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border p-4">
      <span className="h-3 w-3 rounded-full bg-green-500"></span>
      <p className="text-sm font-medium">{title}</p>
    </div>
  );
}

function TimelineItem({ year, text }) {
  return (
    <div>
      <h4 className="font-semibold text-gray-900">{year}</h4>
      <p>{text}</p>
    </div>
  );
}

function Leader({ name, role }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <img
        src="https://i.pravatar.cc/300"
        alt={name}
        className="h-56 w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  );
}

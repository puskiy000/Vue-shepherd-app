import React from "react";

const Section = ({ title, subtitle, description }) => {
  return (
    <section className="my-4">
      <h4 className="space-x-2">
        <span className="font-bold text-2xl">{title}</span>
        {subtitle && <span className="inline-block text-sm bg-gray-100 px-2 py-1 rounded-md text-primaryGray">{subtitle}</span>}
      </h4>
      <p className="text-primaryGray">{description}</p>
    </section>
  );
};

export default Section;
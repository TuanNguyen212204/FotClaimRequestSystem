import React from "react";
import { motion } from "framer-motion";
import { GlowingEffect } from "../Components/glowing-effect";

type ExpertCardProps = {
  name: string;
  image: string; 
};

const ExpertCard: React.FC<ExpertCardProps> = ({ name }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden rounded-full bg-gray-300 p-0">
        <GlowingEffect
          spread={60}
          glow={true}
          disabled={false}
          proximity={74}
          inactiveZone={0.01}
        />
        <div className="h-20 w-20 rounded-full bg-gray-300 sm:h-24 sm:w-24"></div>
      </div>
      <p className="mt-2 text-center text-sm text-white">{name}</p>
    </div>
  );
};

export default function Experts() {
  // Create an array of 12 experts
  const experts = Array(16)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      name: `Expert ${index + 1}`, // Có thể thay bằng tên thật
      image: `/path/to/expert${index + 1}.jpg`, // Đường dẫn đến ảnh
    }));

  return (
    <section className="w-full bg-[#2d3142] py-16 text-white">
      <div className="container mx-auto px-4">
        <hr className="my-12 border-t border-gray-600" />
        <h1 className="mb-12 text-center text-5xl font-bold">Our Experts</h1>

        <div className="mt-12 rounded-lg bg-[#252937] p-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-6">
            {experts.map((expert) => (
              <ExpertCard
                key={expert.id}
                name={expert.name}
                image={expert.image}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

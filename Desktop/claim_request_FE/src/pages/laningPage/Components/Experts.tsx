import { experts } from "@/types/expertsData";
import ExpertCard from "./ExpertCard";

export default function Experts() {
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

import Herro from "./Hero";
import Content from "./Content";
import Footer from "./Footer/Footer";
export default function LandingPage() {
  return (
    <div className="bg-[#2d3142] text-white">
      <Herro />
      <Content />
      <Footer />
    </div>
  );
}

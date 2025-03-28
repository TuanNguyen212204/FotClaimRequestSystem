import TopBar from "../Topbar/index";
import "./Herro.css";

const ScrollArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-8 w-8 animate-bounce"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);

export default function Herro() {
  return (
    <div className="hero-section">
      <div className="hero-overlay"></div>

      <div className="hero-content-container">
        <TopBar />

        <div className="hero-main-content">
          <h1 className="hero-title">
            “ClaimEasy: Hassle-Free Claim Requests”
          </h1>
          <button className="hero-button">GET START NOW!</button>
        </div>

        <div className="hero-scroll-indicator">
          <ScrollArrow />
        </div>
      </div>
    </div>
  );
}

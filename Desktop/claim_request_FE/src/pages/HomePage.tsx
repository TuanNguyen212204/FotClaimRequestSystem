import GoBackButton from "@/components/common/GobackButton/GobackButton";
import Header from "../components/ui/header/Header";
import { Sidebar } from "../components/ui/sidebar/Sidebar";
import Stepper from "@/components/common/component/Stepper";

export const HomePage = () => {
  const steps = [
    { id: "pending", label: "Pending" },
    { id: "review", label: "Review" },
    { id: "approve", label: "Approve" },
    { id: "payment", label: "Payment" },
  ];
  return (
    <div>
      {/* <Header />
       <Sidebar /> */}
      <GoBackButton />
      <Stepper statuses={steps} />
    </div>
  );
};

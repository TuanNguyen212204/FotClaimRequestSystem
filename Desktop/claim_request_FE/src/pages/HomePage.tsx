import { toast } from "react-toastify";
import { Button } from "../components/common/Button";

export const HomePage = () => {
  const name = "Check toast";
  return (
    <div>
      <h1>Hello</h1>
      <Button
        border="none"
        name={name}
        backgroundColor="orange"
        color="black"
        onClick={() => {
          toast.success("Hello world");
        }}
      />
    </div>
  );
};

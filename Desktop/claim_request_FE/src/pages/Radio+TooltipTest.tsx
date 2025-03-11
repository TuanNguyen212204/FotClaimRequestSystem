import { RadioGroup, RadioGroupButton } from "@/components/ui/Radio/Radio";
import { useState } from "react";
import { Tooltip } from "@/components/ui/Tooltip/Tooltip";

function TestRadio() {
  const [selectedOption, setSelectedOption] = useState<string>("1");

  const radioOptions = [
    { id: "1", description: "Option 1", disabled: false },
    { id: "2", description: "Option 2", disabled: false },
    { id: "3", description: "Option 3", disabled: true },
  ];


  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <RadioGroup
        label="Choose an option"
        options={radioOptions}
        selectedOption={selectedOption}
        onSelect={(value) => {
          setSelectedOption(value);
          console.log("Selected: ", value);
        }}
        configDefault={{ value: "id", label: "description" }}
        name="myRadio"
        disabled={false}
      />
      <RadioGroupButton
        label="Choose an option"
        options={radioOptions}
        selectedOption={selectedOption}
        onSelect={(value) => {
          setSelectedOption(value);
          console.log("Selected: ", value);
        }}
        configDefault={{ value: "id", label: "description" }}
        name="myRadio"
        disabled={false}
      />
      <div style={{ display: "flex", marginTop: "20px" }}>
        <Tooltip text="Hover this" position="top">
          <button>Click me</button>
        </Tooltip>
      </div>
      <div style={{ display: "flex", marginTop: "20px" }}>
        <Tooltip text="Hover this" position="bottom">
          <button>Click me</button>
        </Tooltip>
      </div>
    </div>
  );
}

export default TestRadio;

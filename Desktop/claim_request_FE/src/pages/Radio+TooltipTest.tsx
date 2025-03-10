// import { Tooltip } from "@/components/ui/Tooltip/Tooltip";
import { RadioGroup, RadioGroupButton } from "@/components/ui/Radio/Radio";
import { useState } from "react";
// import { Dropdown } from "@/components/ui/Dropdown/Dropdown";
function TestRadio() {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const radioOptions = [
    { value: "1", label: "Option 1", disabled: false },
    { value: "2", label: "Option 2", disabled: false },
    { value: "3", label: "Option 3", disabled: true },
  ];

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <RadioGroup
        label="Choose an option"
        options={radioOptions}
        onSelect={(value) => {
          setSelectedValue(value);
          console.log("Selected: ", value);
        }}
        name="myRadio"
      />
      <RadioGroupButton
        label="Choose an option"
        options={radioOptions}
        onSelect={(value) => {
          setSelectedValue(value);
          console.log("Selected: ", value);
        }}
        name="myRadio"
      />
     
    </div>
  );
}

export default TestRadio;

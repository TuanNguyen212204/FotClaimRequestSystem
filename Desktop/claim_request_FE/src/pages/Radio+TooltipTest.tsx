// import { Tooltip } from "@/components/ui/Tooltip/Tooltip";
import { RadioGroup, RadioGroupButton } from "@/components/ui/Radio/Radio";
import React, { useState } from "react";
// import { Dropdown } from "@/components/ui/Dropdown/Dropdown";
function TestRadio() {
  const [selectedValue, setSelectedValue] = useState("1");
  const radioOptions = [
    { value: "1", label: "Option 1", disabled: false },
    { value: "2", label: "Option 2", disabled: false },
    { value: "3", label: "Option 3", disabled: true },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {/* <RadioGroup options={radioOptions} name="example" selectedValue={selectedValue} onChange={handleChange}  /> */}
    <RadioGroupButton options={radioOptions} name="example" selectedValue={selectedValue} onChange={handleChange} />    
    </div>
  );
}

export default TestRadio;

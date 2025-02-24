// import React, { useState } from "react";
// import RadioGroup from "../components/common/RadioGroup/RadioGroup";

// const ExamplePage: React.FC = () => {
//   const [selectedValue, setSelectedValue] = useState("option1");

//   const options = [
//     { label: "Option 1", value: "option1" },
//     { label: "Option 2", value: "option2" },
//     { label: "Option 3", value: "option3" },
//   ];

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedValue(e.target.value);
//   };

//   return (
//     <div>
//       <h1>Select an Option</h1>
//       <RadioGroup
//         options={options}
//         name="exampleRadioGroup"
//         selectedValue={selectedValue}
//         onChange={handleChange}
//         buttonProps={{ disabled: false }}
//       />
//     </div>
//   );
// };

// export default ExamplePage;

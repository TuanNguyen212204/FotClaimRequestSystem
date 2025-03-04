import { useRef, useState } from "react";
import { Option } from "@/Hooks/useAutoComplete";
import PopOver from "@/components/ui/PopOver";
import { X } from "lucide-react";
import AutoComplete from "@/components/ui/AutoComplete";

const CreateClaimPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [asyncOptions, setAsyncOptions] = useState<Option[]>([]);
  const [lastOnChange, setLastOnChange] = useState<string>("");
  const [lastOnSelect, setLastOnSelect] = useState<string>("");

  const staticOptions: Option[] = [
    { value: "Apple" },
    { value: "Banana" },
    { value: "Cherry" },
    { value: "Date" },
    { value: "Elderberry" },
  ];
  const handleSearch = (val: string) => {
    setTimeout(() => {
      const newOptions = val
        ? [
            { value: `${val}@gmail.com` },
            { value: `${val}@yahoo.com` },
            { value: `${val}@outlook.com` },
          ]
        : [];
      setAsyncOptions(newOptions);
    }, 1000);
  };
  const refer = useRef(null);
  console.log(refer);
  return (
    <div className="p-4 space-y-8 text-black">
      <h1 className="text-2xl font-bold">AutoComplete UI Test Cases</h1>
      <section>
        <h2 className="text-xl font-semibold">1. Basic Rendering and Typing</h2>

        <p>Type in the input to see the value update below.</p>
        <PopOver
          content={
            <>
              <p>hellow world</p>
              <p>hellow rold</p>
            </>
          }
          title="Testing"
          placement="bottom-right"
          z_index="111"
          trigger="click"
        >
          <AutoComplete
            options={staticOptions}
            value={inputValue}
            onChange={setInputValue}
            placeholder="Type something..."
            notFoundContent="No Options Found"
            autoFocus
            inputRef={refer}
          />
        </PopOver>
        <p className="mt-2">Current Value: {inputValue || "None"}</p>
      </section>
      Apple
      <section>
        <h2 className="text-xl font-semibold">
          2. Filtering and Selecting Options
        </h2>
        <p>Type to filter options and select one to see the selection.</p>
        <AutoComplete
          options={staticOptions}
          onSelect={(_, option) => setSelectedOption(option)}
          placeholder="Search for a fruit..."
        />
        <p className="mt-2">
          Selected Option: {selectedOption?.value || "None"}
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">3. Clearing with Default Icon</h2>
        <p>Type something, then click the clear icon to reset the input.</p>
        <AutoComplete
          options={staticOptions}
          allowClear={true}
          placeholder="Type and clear..."
        />
      </section>
      <section>
        <h2 className="text-xl font-semibold">4. Custom Clear Icon</h2>
        <p>Type something, then click the red X to clear the input.</p>
        <AutoComplete
          options={staticOptions}
          allowClear={<X size={16} color="red" />}
          placeholder="Type and clear with custom icon..."
        />
      </section>
      <section>
        <h2 className="text-xl font-semibold">5. Keyboard Navigation</h2>
        <p>
          Type to open the dropdown, use arrow keys to navigate, and press Enter
          to select.
        </p>
        <AutoComplete options={staticOptions} placeholder="Use keyboard..." />
      </section>
      <section>
        <h2 className="text-xl font-semibold">6. Variants</h2>
        <p>Visually inspect the styling for each variant.</p>
        <div className="space-y-4">
          <div>
            <p>Outline Variant</p>
            <AutoComplete
              options={staticOptions}
              varient="outline"
              placeholder="Outline"
            />
          </div>
          <div>
            <p>Filled Variant</p>
            <AutoComplete
              options={staticOptions}
              varient="filled"
              placeholder="Filled"
            />
          </div>
          <div>
            <p>Borderless Variant</p>
            <AutoComplete
              options={staticOptions}
              varient="borderless"
              placeholder="Borderless"
            />
          </div>
          <div>
            <p>Default Variant</p>
            <AutoComplete
              options={staticOptions}
              varient="default"
              placeholder="Default"
            />
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold">7. Async Options</h2>
        <p>Type to trigger an async search (options appear after 1s).</p>
        <AutoComplete
          options={asyncOptions}
          onSearch={handleSearch}
          placeholder="Search emails..."
        />
      </section>
      <section>
        <h2 className="text-xl font-semibold">8. Controlled Value</h2>
        <p>Click the button to set a predefined value.</p>
        <AutoComplete
          options={staticOptions}
          value={inputValue}
          onChange={setInputValue}
          placeholder="Controlled input"
        />
        <button
          onClick={() => setInputValue("Controlled Value")}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Set Value to "Controlled Value"
        </button>
      </section>
      <section>
        <h2 className="text-xl font-semibold">9. Callbacks</h2>
        <p>Type or select to see the callback values update.</p>
        <AutoComplete
          options={staticOptions}
          onChange={(val) => setLastOnChange(val)}
          onSelect={(val, option) => setLastOnSelect(option.value)}
          placeholder="Trigger callbacks"
        />
        <p className="mt-2">Last onChange value: {lastOnChange || "None"}</p>
        <p>Last onSelect value: {lastOnSelect || "None"}</p>
      </section>
    </div>
  );
};

export default CreateClaimPage;

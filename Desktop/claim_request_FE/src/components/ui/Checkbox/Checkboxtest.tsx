import { BasicCheckbox } from './Checkbox';
import { CustomCheckbox } from './Checkbox';
import { ToggleCheckbox } from './Checkbox';
import { CircularCheckbox } from './Checkbox';
import { AnimatedCheckbox } from './Checkbox';
import { MinimalCheckbox } from './Checkbox';
import { DisabledCheckbox } from './checkbox2';
import { CheckedDisabledCheckbox } from './checkbox2';
import { SuccessCheckbox } from './checkbox2';
import { InvalidCheckbox } from './checkbox2';
function CheckBoxTest() {
    return (
        <div style={{padding: '40px'}}>
          <h1>CheckBox Test List</h1>
          <BasicCheckbox label="Basic" />

          <CustomCheckbox label="Custom" />

          <ToggleCheckbox label="Toggle"/>

          <CircularCheckbox label="Circle" />

          <AnimatedCheckbox label="Animated" />

          <MinimalCheckbox label="Minimal" />

          <h2>CheckBox Test List 2</h2>

          <DisabledCheckbox label="Disabled" />

          <CheckedDisabledCheckbox label="Checked-Disabled" />

          <SuccessCheckbox label="Success" />

          <InvalidCheckbox label="Invalid" />
        </div>
        
      );
}
export default CheckBoxTest;
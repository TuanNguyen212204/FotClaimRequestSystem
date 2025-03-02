import { BasicCheckbox } from './Checkbox';
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
          <BasicCheckbox  />

          <ToggleCheckbox />

          <CircularCheckbox  />

          <AnimatedCheckbox  />

          <MinimalCheckbox  />

          <h2>CheckBox Test List 2</h2>

          <DisabledCheckbox  />

          <CheckedDisabledCheckbox  />

          <SuccessCheckbox  />

          <InvalidCheckbox  />
        </div>
        
      );
}
export default CheckBoxTest;
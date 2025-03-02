import { BasicCheckbox } from './Checkbox';
import { AnimatedCheckbox } from './Checkbox';
import { MinimalCheckbox } from './Checkbox';
import { DisabledCheckbox } from './checkbox2';
import { CheckedDisabledCheckbox } from './checkbox2';
import { SuccessCheckbox } from './checkbox2';
import { InvalidCheckbox } from './checkbox2';
import { SwitchTheme } from '../switchTheme/switchTheme';
function CheckBoxTest() {
    return (
        <div style={{padding: '40px'}}>
          <h1>CheckBox Test List</h1>
          <BasicCheckbox  />

          <AnimatedCheckbox  />

          <MinimalCheckbox  />

          <h2>CheckBox Test List 2</h2>

          <DisabledCheckbox  />

          <CheckedDisabledCheckbox  />

          <SuccessCheckbox  />

          <InvalidCheckbox  />

          <h3>Switch-Theme test</h3>

          <SwitchTheme />

        </div>
        
      );
}
export default CheckBoxTest;
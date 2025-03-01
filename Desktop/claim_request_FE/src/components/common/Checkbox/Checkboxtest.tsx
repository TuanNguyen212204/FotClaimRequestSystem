import { BasicCheckbox } from './Checkbox';
import { CustomCheckbox } from './Checkbox';
import { ToggleCheckbox } from './Checkbox';
import { CircularCheckbox } from './Checkbox';
import { AnimatedCheckbox } from './Checkbox';
import { MinimalCheckbox } from './Checkbox';

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
        </div>
        
      );
}
export default CheckBoxTest;
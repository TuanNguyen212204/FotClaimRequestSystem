export interface RadioGroupProps {
  options: { label: string; value: string }[];
  name: string;
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

export interface RadioGroupProps {
  options: { label: string; value: string; disabled?: boolean }[];
  name: string;
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

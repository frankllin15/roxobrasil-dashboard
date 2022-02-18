import styled from "styled-components";

const Field = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 350px;

  input {
    width: 100%;
    height: 48px;
    padding: 14px 16px 0 10px;
    outline: 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    :not(:valid) :not(:focus-within) {
      color: #dc2626;
    }
  }

  label {
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
    padding: 0 12px;
    color: #999;
    pointer-events: none;
    position: absolute;
    transform: translate(0, 16px) scale(1);
    transform-origin: top left;
    transition: all 0.2s ease-out;
  }

  &:focus-within label,
  input:not([value=""]) + label {
    transform: translate(0, 2px) scale(0.75);
  }
`;

interface IInputText {
  title: string;
  name: string;
  type?: string;
  onChange: (e: any) => void;
  onFocus?: (e: any) => void;
  value?: string;
  className?: string;
  pattern?: string;
  disabled?: boolean;
  required?: boolean;
}
const InputText: React.FC<IInputText> = ({
  title,
  name,
  type = "text",
  onChange,
  onFocus,
  value = "",
  className,
  pattern = ".*",
  disabled = false,
  required = false,
}) => (
  <Field className={className} title={title}>
    <input
      disabled={disabled}
      onChange={(e) => onChange(e)}
      onFocus={onFocus}
      value={value}
      type={type}
      name={name}
      pattern={pattern}
      required={required}
    />

    <label htmlFor={name}>{title}</label>
  </Field>
);

export default InputText;

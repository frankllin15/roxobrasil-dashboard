import styled from "styled-components";

const Field = styled.div`
  /* box-sizing: border-box; */
  position: relative;
  display: ${({ style }) => style?.display || "flex"};
  flex-direction: column;
  max-width: ${(props) => props.style?.width || "300px"};
  /* margin: 0.4rem 0.5rem 0.4rem; */
  margin: ${({ style }) => style?.margin || " .5 0 .5"};

  input {
    height: 48px;
    /* width: 100%; */
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
  value?: string | number;
  className?: string;
  pattern?: string;
  disabled?: boolean;
  min?: number;
  step?: string;
  required?: boolean;
  style?: React.CSSProperties;
}
const InputText: React.FC<IInputText> = ({
  title,
  name,
  type = "text",
  min,
  step,
  onChange,
  onFocus,
  value = "",
  className,
  pattern = ".*",
  disabled = false,
  required = false,
  style = {},
}) => (
  <Field style={style} className={className} theme={{ style }} title={title}>
    <input
      step={step}
      min={min}
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

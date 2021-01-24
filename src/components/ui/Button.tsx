import { getBulmaColorClass } from './Color';

export interface IButton {
  color: string;
  text: string;
  disabled: boolean;
  onClick: () => void;
}

const Button = ({ color, text, disabled, onClick }: IButton) => {
  const bulmaColor = getBulmaColorClass(color);
  return (
    <button
      className={'button ' + bulmaColor}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;

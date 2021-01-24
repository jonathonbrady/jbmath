import { InputUpdate } from './types';

interface Props {
  text: string;
  placeholder?: string;
  onChange: (e: InputUpdate) => void;
}

const Input = ({ text, onChange, placeholder }: Props) => {
  return (
    <input
      className="input is-primary is-rounded"
      type="text"
      spellCheck={false}
      placeholder={placeholder ? placeholder : ''}
      value={text}
      onChange={onChange}
    ></input>
  );
};

export default Input;

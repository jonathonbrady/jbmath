import { InputUpdate } from './types';

interface Props {
  text: string;
  onChange: (e: InputUpdate) => void;
}

const Input = ({ text, onChange }: Props) => {
  return (
    <input
      className="input is-primary is-rounded"
      type="text"
      spellCheck={false}
      value={text}
      onChange={onChange}
    ></input>
  );
};

export default Input;

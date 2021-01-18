import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';

interface Props {
  formula: string;
}

const Preview = ({ formula }: Props) => {
  return (
    <div className="box">
      <TeX block math={formula} />
    </div>
  );
};

export default Preview;

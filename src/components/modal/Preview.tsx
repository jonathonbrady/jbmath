import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import { motion } from 'framer-motion';

interface Props {
  formula: string;
  scale?: number;
  rotation?: number;
}

const Preview = ({ formula, scale, rotation }: Props) => {
  return (
    <div className="box">
      <motion.div style={{ scale: scale, rotate: rotation }}>
        <TeX block math={formula} />
      </motion.div>
    </div>
  );
};

export default Preview;

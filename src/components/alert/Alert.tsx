import { AnimatePresence, motion } from 'framer-motion';
import Button, { IButton } from '../ui/Button';

interface IAlert {
  error: string;
  message: string;
  buttons: Array<IButton>;
}

const Alert = ({ error, message, buttons }: IAlert) => {
  const alertButtons = buttons.map((button) => (
    <Button
      color={button.color}
      text={button.text}
      disabled={button.disabled}
      onClick={button.onClick}
    />
  ));
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 1 }}
        animate={{ y: 0, opacity: 0 }}
        transition={{
          y: { duration: 0.25 },
          opacity: { delay: 3.5, duration: 1 }
        }}
        exit={{ opacity: 0 }}
      >
        <div className="notification is-warning is-light">
          <b>{error}</b> {message}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Alert;

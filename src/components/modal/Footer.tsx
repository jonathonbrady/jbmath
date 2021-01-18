import Button, { IButton } from '../ui/Button';

export interface IFooter {
  buttons: Array<IButton>;
}

const Footer = ({ buttons }: IFooter) => {
  const footerButtons = buttons.map((e) => (
    <Button
      color={e.color}
      text={e.text}
      disabled={e.disabled}
      onClick={e.onClick}
    />
  ));

  return (
    <footer className="modal-card-foot">
      <div className="container">{footerButtons}</div>
    </footer>
  );
};

export default Footer;

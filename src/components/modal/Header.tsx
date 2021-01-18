export interface IHeader {
  title: string;
  close: () => void;
}

const Header = ({ title, close }: IHeader) => {
  return (
    <header className="modal-card-head">
      <p className="modal-card-title">{title}</p>
      <button className="delete" aria-label="close" onClick={close}></button>
    </header>
  );
};

export default Header;

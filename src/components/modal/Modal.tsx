import Footer, { IFooter } from './Footer';
import Header, { IHeader } from './Header';

export interface IModal {
  header: IHeader;
  body: Array<JSX.Element>;
  footer: IFooter;
}

const Modal = ({ header, body, footer }: IModal) => {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <Header title={header.title} close={header.close} />
        <section className="modal-card-body">{body}</section>
        <Footer buttons={footer.buttons} />
      </div>
    </div>
  );
};

export default Modal;

import "./ModalWithForm.css";

function ModalWithForm({ title, isOpen, onClose, children }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <button onClick={onClose} type="button" className="modal__close" />
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form">{children}</form>
      </div>
    </div>
  );
}

export default ModalWithForm;

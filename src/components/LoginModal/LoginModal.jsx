import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose }) {
  return (
    <ModalWithForm title="Sign in" isOpen={isOpen} onClose={onClose}>
      <label for="email" className="modal__label">
        Email
        <input type="text" id="email" className="modal__input" />
      </label>
      <label for="password" className="modal__label">
        Password
        <input type="text" id="password" className="modal__input" />
      </label>
      <button type="submit" className="modal__submit">
        Sign in
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;

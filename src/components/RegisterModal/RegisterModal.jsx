import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, handleLoginModal }) {
  return (
    <ModalWithForm title="Sign up" isOpen={isOpen} onClose={onClose}>
      <label for="email" className="modal__label">
        Email
        <input type="text" id="email" className="modal__input" />
      </label>
      <label for="password" className="modal__label">
        Password
        <input type="text" id="password" className="modal__input" />
      </label>
      <label for="username" className="modal__label">
        Username
        <input type="text" />
      </label>
      <button type="submit" className="modal__submit">
        Sign up
      </button>
      <button type="button" className="modal__alternate-text">
        or{" "}
        <span onClick={handleLoginModal} className="modal__alternate-link">
          Sign in
        </span>
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;

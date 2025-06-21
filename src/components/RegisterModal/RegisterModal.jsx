import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, handleLoginModal }) {
  const { values, errors, handleChange, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <ModalWithForm title="Sign up" isOpen={isOpen} onClose={onClose}>
      <label htmlFor="email" className="modal__label">
        Email
        <input
          name="email"
          type="text"
          id="email-register"
          className="modal__input"
          value={values.email}
          required
          placeholder="Enter email"
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          name="password"
          type="text"
          id="password-register"
          className="modal__input"
          value={values.password}
          required
          placeholder="Enter password"
        />
      </label>
      <label htmlFor="username" className="modal__label">
        Username
        <input
          name="username"
          type="text"
          id="username"
          className="modal__username"
          value={values.username}
          required
          placeholder="Enter your username"
        />
      </label>
      <button
        type="submit"
        className={`modal__submit ${!isValid ? "modal__submit-disabled" : ""}`}
        disabled={`${!isValid ? "disabled" : ""}`}
      >
        Sign up
      </button>
      <button
        type="button"
        className="modal__alternate-text"
        onClick={handleLoginModal}
      >
        or <span className="modal__alternate-link">Sign in</span>
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;

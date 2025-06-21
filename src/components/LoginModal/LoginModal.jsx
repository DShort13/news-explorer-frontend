import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, handleRegisterModal }) {
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
    <ModalWithForm
      title="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          name="email"
          type="email"
          id="email"
          className="modal__input"
          value={values.email}
          onChange={handleChange}
          required
          placeholder="Enter email"
        />
      </label>
      {errors?.email && (
        <>
          <span className="modal__error" id="email-input-error">
            {errors?.email}
          </span>
        </>
      )}
      <label htmlFor="password" className="modal__label">
        Password
        <input
          name="password"
          type="password"
          id="password"
          className="modal__input"
          value={values.password}
          onChange={handleChange}
          required
          minLength="2"
          placeholder="Enter password"
        />
      </label>
      {errors.password && (
        <span className="modal__error" id="password-input-error">
          {errors.password}
        </span>
      )}
      <button
        type="submit"
        className={`modal__submit ${!isValid ? "modal__submit-disabled" : ""}`}
        // disabled={`${!isValid ? "disabled" : ""}`}
      >
        Sign in
      </button>
      <button
        type="button"
        className="modal__alternate-text"
        onClick={handleRegisterModal}
      >
        or <span className="modal__alternate-link">Sign up</span>
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;

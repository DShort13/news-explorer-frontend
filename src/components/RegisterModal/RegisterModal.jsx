import { useEffect, useState } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, handleLoginModal, handleRegister }) {
  const { values, errors, handleChange, isValid, resetForm } =
    useFormAndValidation({ email: "", password: "", username: "" });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFilled =
    values.email.trim() !== "" ||
    values.password.trim() !== "" ||
    values.username.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    handleRegister({
      email: values.email,
      password: values.password,
      username: values.username,
    }).finally(() => setIsSubmitting(false));
  };

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFilled={isFilled}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          name="email"
          type="email"
          id="email-register"
          className="modal__input"
          value={values.email || ""}
          onChange={handleChange}
          required
          placeholder="Enter email"
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          name="password"
          type="password"
          id="password-register"
          className="modal__input"
          value={values.password || ""}
          onChange={handleChange}
          required
          placeholder="Enter password"
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
      <label htmlFor="username" className="modal__label">
        Username
        <input
          name="username"
          type="username"
          id="username"
          className="modal__input"
          value={values.username || ""}
          onChange={handleChange}
          required
          placeholder="Enter your username"
        />
        {errors.username && (
          <span className="modal__error">{errors.username}</span>
        )}
      </label>
      <button
        type="submit"
        className={`modal__submit ${
          !isValid || isSubmitting ? "modal__submit-disabled" : ""
        }`}
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "Signing up..." : "Sign up"}
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

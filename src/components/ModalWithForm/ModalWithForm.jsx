import "./ModalWithForm.css";

function ModalWithForm() {
  return (
    <div className="modal">
      <div className="modal__content">
        <button type="button" className="modal__close" />
        <h2 className="modal__title">Sign in</h2>
        <form className="modal__form">
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
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

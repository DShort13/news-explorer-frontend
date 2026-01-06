import "../ModalWithForm/ModalWithForm.css"
import "./SuccessModal.css"

function SuccessModal({ isOpen, onClose, handleLoginModal }) {
    const handleSignInClick = () => {
        onClose();
        handleLoginModal();
    };

    return (
        <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
            <div className="modal__content modal__content--success">
                <button onClick={onClose} type="button" className="modal__close" />
                <h2 className="modal__title">Registration successfully completed!</h2>
                <button type="button" className="modal__success-link" onClick={handleSignInClick}>
                    Sign in
                </button>
            </div>
        </div>
    )
}

export default SuccessModal;
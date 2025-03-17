export default function ConfirmationWindow({ movie, onConfirm, onCancel }) {

    return (
        <div className="overlay">
            <div className="overlay-content">
                <p>Are you sure you want to mark <span className="modal-title">{movie.title}</span> as watched?</p>
                <div className="modal-actions">
                    <button className="modal-btn" onClick={onConfirm}>Yes</button>
                    <button className="modal-btn" onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
}

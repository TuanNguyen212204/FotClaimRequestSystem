import Modal from "./Modal";
import styles from "./Modal.module.css";

function ConfirmModal() {
  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: "Do you want to delete these items?",
      onOk() {
        console.log("Yes");
      },
      onCancel() {
        console.log("Cancel");
      },
    }).then((result) => {
      console.log("Confirm: ", result ? "Yes" : "Cancel");
    });
  };

  return (
    <div>
      <button className={styles.btn} onClick={showConfirm}>
        Open Confirm Modal with async function
      </button>
    </div>
  );
}

export default ConfirmModal;

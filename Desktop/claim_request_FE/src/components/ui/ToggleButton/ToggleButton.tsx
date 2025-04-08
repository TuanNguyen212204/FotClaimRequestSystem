import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./ToggleButton.css";
import Modal from "@/components/ui/modal/Modal";
import { toast, ToastContainer } from "react-toastify";

const ToggleButton = ({
  userId,
  checked,
  onChange,
}: {
  userId: string;
  checked: boolean;
  onChange?: (newChecked: boolean) => void;
}) => {
  const { t } = useTranslation("toggle");
  const [enabled, setEnabled] = useState(checked);

  useEffect(() => {
    setEnabled(checked);
  }, [checked]);

  const handleClick = () => {
    const newStatus = !enabled;
    const actionKey = newStatus ? "enableUser" : "disableUser";
    const actionText = t(`${actionKey}`);
    const actionVerb = newStatus ? t("enableAction") : t("disableAction");

    Modal.confirm({
      title: actionText,
      children: t("confirmMessage", { action: actionVerb }),
      buttonCancel: t("cancelButton"),
      buttonOk: t("confirmButton"),
      onOk: () => {
        setEnabled(newStatus);
        if (onChange) onChange(newStatus);
        toast.success(t("toast.success"));
        setTimeout(() => {
          window.location.reload(); // Reload the page after 2 seconds
        }, 1000); // Delay for 2 seconds before closing the modal
      },
      onCancel: () => {
        toast.error(t("toast.error"));
      },
    });
  };

  return (
    <button
      tabIndex={-1}
      className={`toggle-wrapper ${enabled ? "enabled" : ""}`}
      onClick={handleClick}
    >
      <span className="toggle-circle"></span>
    </button>
  );
};

export const AdminButton = ({
  userId,
  checked,
  onClick,
}: {
  userId: string;
  checked: boolean;
  onClick?: () => void;
}) => {
  const { t } = useTranslation("toggle");
  const [enabled, setEnabled] = useState(checked);

  return (
    <button
      tabIndex={-1}
      className={`toggle-wrapper ${enabled ? "enabled" : ""}`}
      onClick={() => {
        toast.error(t("toast.permissionError"));
        if (onClick) onClick();
      }}
    >
      <span className="toggle-circle"></span>
    </button>
  );
};

export default ToggleButton;

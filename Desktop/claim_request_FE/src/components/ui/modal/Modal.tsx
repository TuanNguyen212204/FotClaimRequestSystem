import React, {
  useEffect,
  useState,
  useRef,
  CSSProperties,
  MouseEvent,
} from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import { createRoot } from "react-dom/client";

interface Position {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

export interface ModalProps {
  open: boolean;
  title?: string;
  onCancel: (e?: MouseEvent | KeyboardEvent) => void;
  onOk?: (e?: MouseEvent) => void | Promise<unknown>;
  footer?: React.ReactNode;
  width?: number;
  height?: number;
  maskClosable?: boolean;
  closeIcon?: React.ReactNode;
  children?: React.ReactNode;
  modalText?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  centered?: boolean;
  autoCloseSeconds?: number;
  position?: Position;
  okButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  cancelButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  icon?: React.ReactNode;
  filled?: boolean;
  confirm?: boolean;
  confirmIcon?: React.ReactNode;
  link?: string;
  linkDisplay?: string;
  image?: string;
  imagePosition?: "top" | "bottom";
  switches?: Array<{
    switchIcon?: React.ReactNode;
    switchTitle?: string;
    switchText?: string;
    value: boolean;
    onChange: (value: boolean) => void;
  }>;
  buttonOk?: string;
  buttonCancel?: string;
}

export interface ModalComponent extends React.FC<ModalProps> {
  confirm: (options: Omit<ModalProps, "open">) => Promise<boolean>;
}

const Modal_: React.FC<ModalProps> = ({
  open,
  title = "Modal Title",
  onCancel,
  onOk,
  footer,
  width = 420,
  height,
  maskClosable = true,
  closeIcon,
  children = "Modal Content",
  modalText = "p",
  centered = true,
  autoCloseSeconds,
  position,
  okButtonProps,
  cancelButtonProps,
  icon,
  filled = false,
  confirm = false,
  confirmIcon,
  link,
  linkDisplay,
  image,
  imagePosition = "top",
  switches,
  buttonOk,
  buttonCancel,
}) => {
  const [visible, setVisible] = useState(open);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(open);
  }, [open]);

  useEffect(() => {
    if (open && autoCloseSeconds && autoCloseSeconds > 0) {
      const timer = setTimeout(() => {
        onCancel();
      }, autoCloseSeconds * 1000);
      return () => clearTimeout(timer);
    }
  }, [open, autoCloseSeconds, onCancel]);

  const TextWrapper: React.ElementType = modalText;

  const containerStyle: CSSProperties = {
    width: width || "auto",
    minWidth: width || "420px",
    height: "auto",
    minHeight: height || "300px",
    maxHeight: "90vh",
    position: position || centered ? "fixed" : "relative",
    ...(position
      ? {
          top: position.top,
          bottom: position.bottom,
          left: position.left,
          right: position.right,
        }
      : {}),
    ...(centered
      ? { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
      : {}),
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    //scroll
    overflow: "auto", //hidden vì bên dưới đang còn có phần tử overflowY
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    fontSize: "18px",
    fontFamily: "Poppins, sans-serif",
  };

  const renderImage = () => {
    if (!image) return null;

    return (
      <img
        src={image}
        alt="image render"
        style={{
          width: "100%",
          height: "30%",
          objectFit: "cover",
        }}
      />
    );
  };

  const renderLinkContent = () => {
    if (
      typeof children === "string" &&
      children.includes("{linkDisplayName}")
    ) {
      const parts = children.split("{linkDisplayName}");
      return (
        <>
          {parts[0]}
          <a
            href={link}
            target="_blank"
            style={{ textDecoration: "none", color: "blue" }}
          >
            {linkDisplay || "Click here"}
          </a>
          {parts[1]}
        </>
      );
    }
    return children;
  };

  const content = (
    <>
      {image && imagePosition === "top" && renderImage()}
      <div
        style={{
          padding: "0px 16px",
          flex: 1,
          overflowY: "auto",
        }}
      >
        {icon && (
          <div style={{ textAlign: "center", margin: "20px 0px" }}>{icon}</div>
        )}
        {confirm && confirmIcon && (
          <div style={{ textAlign: "center", margin: "20px 0px" }}>
            {confirmIcon}
          </div>
        )}
        {title && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h2 style={{ margin: 0 }}>{title}</h2>
          </div>
        )}

        <TextWrapper className={styles.textWrapper}>
          {renderLinkContent()}
        </TextWrapper>

        {switches &&
          switches.map((swi, index) => (
            <div key={index} style={{ marginTop: "8px" }}>
              <div className={styles.switchContainer}>
                <div className={styles.switchIcon}>
                  {swi.switchIcon || null}
                </div>
                <div className={styles.switchContent}>
                  {swi.switchTitle && (
                    <div className={styles.switchTitle}>{swi.switchTitle}</div>
                  )}
                  {swi.switchText && (
                    <div className={styles.switchText}>{swi.switchText}</div>
                  )}
                </div>
                <div className={styles.switchToggle}>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={swi.value}
                      onChange={(e) => swi.onChange(e.target.checked)}
                      className={styles.switchInput}
                    />
                    <span
                      className={`${styles.slider} ${styles.sliderRound}`}
                    ></span>
                  </label>
                </div>
              </div>
            </div>
          ))}
      </div>
      {image && imagePosition === "bottom" && renderImage()}
    </>
  );

  const renderFooter = footer ? (
    footer
  ) : (
    <div
      style={{
        display: "inline-flex",
        justifyContent: "center",
        gap: "16px",
        margin: "20px 0px",
      }}
    >
      <button
        {...(cancelButtonProps || {})}
        onClick={onCancel}
        className={styles.buttonCancel}
      >
        {buttonCancel ? buttonCancel : "Cancel"}
      </button>
      <button
        {...(okButtonProps || {})}
        onClick={onOk}
        className={styles.buttonOk}
      >
        {buttonOk ? buttonOk : "OK"}
      </button>
    </div>
  );

  const renderFooterFilled = footer ? (
    footer
  ) : (
    <div style={{ display: "flex", width: "100%" }}>
      <button
        {...(cancelButtonProps || {})}
        onClick={onCancel}
        className={styles.buttonCancelFilled}
      >
        {buttonCancel ? buttonCancel : "Cancel"}
      </button>
      <button
        {...(okButtonProps || {})}
        onClick={onOk}
        className={styles.buttonOkFilled}
      >
        {buttonOk ? buttonOk : "OK"}
      </button>
    </div>
  );

  const modalNode = visible ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
      }}
      onClick={(e) => {
        if (maskClosable && e.target === e.currentTarget) {
          onCancel();
        }
      }}
    >
      <div ref={modalRef} style={containerStyle}>
        <span
          onClick={onCancel}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            cursor: "pointer",
            fontSize: "20px",
            zIndex: 100,
            backgroundColor: "rgba(172, 164, 164, 0.18)",
            borderRadius: "5px",
            color: "grey",
            width: "30px",
            height: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {closeIcon || "×"}
        </span>
        {content}
        <div
          style={{
            borderTop: "1px solid #eee",
            textAlign: "center",
          }}
        >
          {filled ? renderFooterFilled : renderFooter}
        </div>
      </div>
    </div>
  ) : null;

  return ReactDOM.createPortal(modalNode, document.body);
};

export const confirmModal = (
  options: Omit<ModalProps, "open">
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const modal = document.createElement("div");
    document.body.appendChild(modal);

    const root = createRoot(modal);
    const cleanup = () => {
      root.unmount();
      modal.remove();
    }

    const handleOk = async (e?: MouseEvent<HTMLButtonElement>) => {
      if (options.onOk) {
        const res = options.onOk(e as MouseEvent);
        if (
          res !== undefined &&
          typeof (res as Promise<unknown>).then === "function"
        ) {
          try {
            await res;
          } catch (error) {
            console.error("Lỗi confirm onOk nè", error);
          }
        }
      }
      cleanup();
      resolve(true);
    };

    const handleCancel = (e?: MouseEvent | KeyboardEvent) => {
      if (options.onCancel) options.onCancel(e);
      cleanup();
      resolve(false);
    };

    root.render(
      <Modal {...options} open={true} onOk={handleOk} onCancel={handleCancel} />
    );
  });
};

export interface ModalComponent extends React.FC<ModalProps> {
  confirm: (options: Omit<ModalProps, "open">) => Promise<boolean>;
}

const Modal = Modal_ as ModalComponent;

(Modal as ModalComponent).confirm = confirmModal;
export default Modal;

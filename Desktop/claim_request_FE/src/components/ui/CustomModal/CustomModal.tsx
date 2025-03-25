import React, { useEffect, useState, useRef, CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import styles from './CustomModal.module.css';
import { X, Printer } from 'lucide-react';

interface Position {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

interface CustomModalProps {
  isOpen: boolean;
  onClose: (e?: React.MouseEvent | KeyboardEvent) => void;
  title?: string;
  children?: React.ReactNode;
  width?: number;
  height?: number;
  maskClosable?: boolean;
  centered?: boolean;
  position?: Position;
  onPrint?: () => void;
  backgroundColor?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title = 'Modal Title',
  children = 'Modal Content',
  width = 600,
  height,
  maskClosable = true,
  centered = false,
  position,
  onPrint,
  backgroundColor = '#fff'
}) => {
  const [visible, setVisible] = useState(isOpen);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && maskClosable) {
      onClose();
    }
  };

  if (!visible) return null;

  const containerStyle: CSSProperties = {
    width: width || 'auto',
    minWidth: width || '600px',
    height: 'auto',
    minHeight: height || '300px',
    maxHeight: '95vh',
    position: position || centered ? 'fixed' : 'relative',
    ...(position
      ? {
          top: position.top,
          bottom: position.bottom,
          left: position.left,
          right: position.right,
        }
      : {}),
    ...(centered
      ? { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
      : {}),
    background: backgroundColor,
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  };

  const modalNode = (
    <div 
      className={styles.overlay}
      onClick={(e) => {
        if (maskClosable && e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        ref={modalRef} 
        className={styles.modal} 
        style={containerStyle}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2>{title}</h2>
          <button 
            onClick={() => onClose()} 
            className={styles.closeButton}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
        {onPrint && (
          <div className={styles.footer}>
            <button 
              onClick={onPrint} 
              className={styles.printButton}
              aria-label="Print details"
            >
              <Printer size={16} />
              <span>Print</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalNode, document.body);
};

export default CustomModal;
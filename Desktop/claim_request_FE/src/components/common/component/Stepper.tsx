import React, { useState } from "react";
import styles from "./stepper.module.css";
import { FaCheckCircle } from "react-icons/fa";

export interface StepStatus {
  id: string;
  label: string;
}

interface StepperProps {
  statuses: StepStatus[];
  readonly?: boolean;
}

const Stepper: React.FC<StepperProps> = ({ statuses, readonly = false }) => {
  const [currentStatus, setCurrentStatus] = useState(statuses[0].id);
  const [isCompleted, setIsCompleted] = useState(false);
  const currentIndex = statuses.findIndex((s) => s.id === currentStatus);

  const getStepStatus = (index: number) => {
    if (index < currentIndex || (index === currentIndex && isCompleted))
      return "completed";
    if (index === currentIndex) return "active";
    return "";
  };

  const handleStepClick = (statusId: string, index: number) => {
    if (readonly || index > currentIndex + 1) return;
    setCurrentStatus(statusId);
    setIsCompleted(false);
  };

  const nextStep = () => {
    if (currentIndex < statuses.length - 1) {
      setCurrentStatus(statuses[currentIndex + 1].id);
    } else {
      setIsCompleted(true);
    }
  };

  return (
    <div className="demoContainer">
      <h2>Stepper Component Demo</h2>
      <div className={styles.stepperContainer}>
        {statuses.map((status, index) => (
          <div key={status.id} className={styles.stepWrapper}>
            <div
              className={`${styles.step} ${
                getStepStatus(index) === "completed"
                  ? styles.completed
                  : getStepStatus(index) === "active"
                  ? styles.active
                  : ""
              } ${readonly ? styles.readonly : ""}`}
              onClick={() => handleStepClick(status.id, index)}
            >
              {getStepStatus(index) === "completed" ? (
                <FaCheckCircle />
              ) : (
                <span className={styles.stepNumber}>{index + 1}</span>
              )}
            </div>
            <div className={styles.stepLabelContainer}>
              <p className={styles.stepLabel}>{status.label}</p>
            </div>
            {index !== statuses.length - 1 && (
              <div
                className={`${styles.line} ${
                  index < currentIndex ? styles.completedLine : ""
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <button className={styles.nextButton} onClick={nextStep}>
        {isCompleted ? "Completed" : "Next Step"}
      </button>
    </div>
  );
};

export default Stepper;

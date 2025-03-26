import { useState } from "react";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import styles from "./Rating.module.css";

const Ratings = () => {
  const [starRating, setStarRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [emojiRating, setEmojiRating] = useState<"bad" | "neutral" | "good" | null>(null);
  const [thumbRating, setThumbRating] = useState<"up" | "down" | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  const openFeedbackForm = () => setIsFeedbackOpen(true);
  const closeFeedbackForm = () => {
    setIsFeedbackOpen(false);
    setFeedbackText("");
  };

  const submitFeedback = () => {
    toast.success("Thank for your feedback!"); 
    closeFeedbackForm();
  };

  const cancelFeedback = () => {
    toast.info("You have canceled the feedback."); 
    closeFeedbackForm();
  };

  const handleStarClick = (index: number) => {
    setStarRating(index);
    if (index < 3) {
      openFeedbackForm();
    } else {
      toast.success("Thank for your feedback!"); 
    }
  };

  const handleEmojiClick = (value: "bad" | "neutral" | "good") => {
    setEmojiRating(value);
    if (value === "bad") {
      openFeedbackForm();
    } else {
      toast.success("Thank for your feedback!"); 
    }
  };

  const handleThumbClick = (value: "up" | "down") => {
    setThumbRating(value);
    if (value === "down") {
      openFeedbackForm();
    } else {
      toast.success("Thank for your feedback!"); 
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer /> 
      <div className={styles.ratingSection}>
        <div className={styles.ratingBox}>
          <h3>Basic</h3>
          <div>
            {[1, 2, 3, 4, 5].map((index) => (
              <Star
                key={index}
                className={`w-6 h-6 cursor-pointer transition-all duration-200 ${
                  (hoverRating && index <= hoverRating) || (starRating && index <= starRating)
                    ? "fill-yellow-400"
                    : "fill-gray-300"
                }`}
                onMouseEnter={() => setHoverRating(index)}
                onMouseLeave={() => setHoverRating(null)}
                onClick={() => handleStarClick(index)}
                stroke="none"
                fill={(hoverRating && index <= hoverRating) || (starRating && index <= starRating) ? "#FACC15" : "#D1D5DB"}
              />
            ))}
          </div>
        </div>
  
        <div className={styles.ratingBox}>
          <h3>Rate with emoji</h3>
          <div>
            <p className={styles.feedbackText}>Did this answer your question?</p>
            {[{ label: "😞", value: "bad" }, 
              { label: "😐", value: "neutral" }, 
              { label: "🤩", value: "good" }
              ].map(({ label, value }) => (
              <button
                key={value}
                className={`${styles.emoji} ${emojiRating === value ? styles.emojiActive : styles.emojiInactive}`}
                onClick={() => handleEmojiClick(value as "bad" | "neutral" | "good")}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
  
        <div className={styles.ratingBox}>
          <h3>Rate with thumb buttons</h3>
          <div className={styles.thumbContainer}>
            <p className={styles.feedbackText}>Was this page helpful?</p>
            <button
              onClick={() => handleThumbClick("up")}
              className={`${styles.button} ${thumbRating === "up" ? styles.YesbuttonActive : ""}`}
            >
              <ThumbsUp size={16} /> Yes
            </button>
            <button
              onClick={() => handleThumbClick("down")}
              className={`${styles.button} ${thumbRating === "down" ? styles.NobuttonActive : ""}`}
            >
              <ThumbsDown size={16} /> No
            </button>
          </div>
        </div>
      </div> 
  
      {isFeedbackOpen && (
        <div className={styles.overlay}>
          <div className={styles.feedbackForm}>
            <h3>What feature can we add to improve</h3>
            <textarea
              placeholder="We'd love to hear your suggestions"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <div className={styles.buttonContainer}>
              <button className={styles.sendButton} onClick={submitFeedback}>Send</button>
              <button className={styles.cancelButton} onClick={cancelFeedback}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ratings;

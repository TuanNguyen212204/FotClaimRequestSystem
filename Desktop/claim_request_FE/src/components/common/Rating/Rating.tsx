"use client"

import { useState } from "react"
import { Heart, Star, ThumbsUp, ThumbsDown } from "lucide-react"
import styles from "./rating.module.css"

type RatingProps = {
  maxStars?: number
  starColor?: string
  heartColor?: string
  initialValue?: number
  onChange?: (value: number) => void
  showHeartRating?: boolean
  showEmojiRating?: boolean
  showThumbRating?: boolean
}

export default function Rating({
  maxStars = 5,
  starColor = "#FFD700",
  heartColor = "#FF6B6B",
  initialValue = 0,
  onChange,
  showHeartRating = true,
  showEmojiRating = true,
  showThumbRating = true,
}: RatingProps) {
  const [starRating, setStarRating] = useState(initialValue)
  const [heartRating, setHeartRating] = useState(initialValue)
  const [emojiRating, setEmojiRating] = useState(0)
  const [thumbRating, setThumbRating] = useState<"up" | "down" | null>(null)
  const [hoverRating, setHoverRating] = useState(0)
  const [heartHoverRating, setHeartHoverRating] = useState(0)

  const handleStarClick = (rating: number) => {
    setStarRating(rating)
    onChange?.(rating)
  }

  const handleHeartClick = (rating: number) => {
    setHeartRating(rating)
    onChange?.(rating)
  }

  const handleEmojiClick = (rating: number) => {
    setEmojiRating(rating)
    onChange?.(rating)
  }

  const handleThumbClick = (value: "up" | "down") => {
    setThumbRating(value)
    onChange?.(value === "up" ? maxStars : 0)
  }

  const emojis = ["😞", "😕", "😐", "🙂", "😄"]

  return (
    <div className={styles.ratingContainer}>
      <div className={styles.ratingSection}>
        <h3 className={styles.ratingTitle}>Star Rating</h3>
        <div className={styles.starsContainer}>
          {[...Array(maxStars)].map((_, index) => {
            const ratingValue = index + 1
            return (
              <button
                type="button"
                key={`star-${index}`}
                className={styles.ratingButton}
                onClick={() => handleStarClick(ratingValue)}
                onMouseEnter={() => setHoverRating(ratingValue)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  className={styles.starIcon}
                  fill={(hoverRating || starRating) >= ratingValue ? starColor : "transparent"}
                  stroke={starColor}
                  size={24}
                />
                <span className="sr-only">
                  Rate {ratingValue} out of {maxStars}
                </span>
              </button>
            )
          })}
          <span className={styles.ratingValue}>{starRating > 0 ? starRating : ""}</span>
        </div>
      </div>

      {showHeartRating && (
        <div className={styles.ratingSection}>
          <h3 className={styles.ratingTitle}>Heart Rating</h3>
          <div className={styles.heartsContainer}>
            {[...Array(maxStars)].map((_, index) => {
              const ratingValue = index + 1
              return (
                <button
                  type="button"
                  key={`heart-${index}`}
                  className={styles.ratingButton}
                  onClick={() => handleHeartClick(ratingValue)}
                  onMouseEnter={() => setHeartHoverRating(ratingValue)}
                  onMouseLeave={() => setHeartHoverRating(0)}
                >
                  <Heart
                    className={styles.heartIcon}
                    fill={(heartHoverRating || heartRating) >= ratingValue ? heartColor : "transparent"}
                    stroke={heartColor}
                    size={22}
                  />
                  <span className="sr-only">
                    Rate {ratingValue} hearts out of {maxStars}
                  </span>
                </button>
              )
            })}
            <span className={styles.ratingValue}>{heartRating > 0 ? heartRating : ""}</span>
          </div>
        </div>
      )}

      {showEmojiRating && (
        <div className={styles.ratingSection}>
          <h3 className={styles.ratingTitle}>Emoji Rating</h3>
          <div className={styles.emojiContainer}>
            {emojis.map((emoji, index) => (
              <button
                type="button"
                key={`emoji-${index}`}
                className={`${styles.emojiButton} ${emojiRating === index + 1 ? styles.selectedEmoji : ""}`}
                onClick={() => handleEmojiClick(index + 1)}
              >
                <span className={styles.emoji}>{emoji}</span>
                <span className="sr-only">Rate {index + 1} out of {emojis.length}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {showThumbRating && (
        <div className={styles.ratingSection}>
          <h3 className={styles.ratingTitle}>Thumbs Rating</h3>
          <div className={styles.thumbContainer}>
            <button
              type="button"
              className={`${styles.thumbButton} ${thumbRating === "up" ? styles.selectedThumb : ""}`}
              onClick={() => handleThumbClick("up")}
            >
              <ThumbsUp
                className={styles.thumbIcon}
                fill={thumbRating === "up" ? "#4CAF50" : "transparent"}
                stroke={thumbRating === "up" ? "#4CAF50" : "currentColor"}
                size={24}
              />
              <span className="sr-only">Thumbs up</span>
            </button>
            <button
              type="button"
              className={`${styles.thumbButton} ${thumbRating === "down" ? styles.selectedThumb : ""}`}
              onClick={() => handleThumbClick("down")}
            >
              <ThumbsDown
                className={styles.thumbIcon}
                fill={thumbRating === "down" ? "#F44336" : "transparent"}
                stroke={thumbRating === "down" ? "#F44336" : "currentColor"}
                size={24}
              />
              <span className="sr-only">Thumbs down</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}


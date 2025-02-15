import React from 'react'
import styles from "./UserClaimDetails.module.css"
import { useParams } from 'react-router-dom'

export const UserClaimDetails = () => {
    const { id } = useParams();
  return (
      <div>
          <h1 className={styles.head}>Claim Status</h1>
          <hr />
    </div>
  )
}

// import React from "react";
// import { useSelector } from "react-redux";
// import { MoveRight } from "lucide-react";
// import styles from "./ClaimStatus.module.css";

// interface ClaimStatusProps {
//   requestId: string;
// }

// const formatDateToMonthDay = (date: string) => {
//   const dateObj = new Date(date);
//   const day = dateObj.getDate();
//   const month = dateObj.toLocaleString("en-US", { month: "long" });
//   return `${month} ${day}`;
// };

// const ClaimStatus: React.FC<ClaimStatusProps> = ({ requestId }) => {
//   const { data: claims, loading } = useSelector((state: any) => state.paidClaims);

//   if (loading || !claims?.length) {
//     return <div className={styles.loading}>Loading claim details...</div>;
//   }

//   const selectedClaim = claims.find((claim: any) => claim.request_id === requestId);
  
//   if (!selectedClaim?.claim_details?.length) {
//     return <div className={styles.loading}>No overtime details found</div>;
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.containerUser}>
//         <div className={styles.infoUser1}>
//           <img
//             src="https://i1.wp.com/upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
//             alt="avatar"
//             className={styles.avatar}
//           />
//           <div>
//             <p>{selectedClaim.full_name}</p>
//             <p className={styles.department}>Department | {selectedClaim.department_name}</p>
//             <p className={styles.department}>{selectedClaim.job_rank_name}</p>
//           </div>
//         </div>
//       </div>

//       <div className={styles.claimInfo}>
//         <div className={styles.infoRow}>
//           <p>Project Name:</p>
//           <p>{selectedClaim.project_name}</p>
//         </div>
//         <div className={styles.infoRow}>
//           <p>Project ID:</p>
//           <p>{selectedClaim.project_id}</p>
//         </div>
//         <div className={styles.infoRow}>
//           <p>Over Time Duration:</p>
//           <p>{formatDateToMonthDay(selectedClaim.start_date)} - {formatDateToMonthDay(selectedClaim.end_date)} ({selectedClaim.total_days} days)</p>
//         </div>
//         <div className={styles.infoRow}>
//           <p>Submitted Date:</p>
//           <p>{formatDateToMonthDay(selectedClaim.submitted_date)}</p>
//         </div>
//         <div className={styles.infoRow}>
//           <p>Approved Date:</p>
//           <p>{formatDateToMonthDay(selectedClaim.approved_date)}</p>
//         </div>
//         <div className={styles.infoRow}>
//           <p>Status:</p>
//           <div className={styles.statusPaid}>Paid</div>
//         </div>
//         <div className={styles.infoRow}>
//           <p>Total Overtime Salary:</p>
//           <p>${selectedClaim.salary_overtime}</p>
//         </div>
//       </div>

//       <div className={styles.history}>
//         <div className={styles.historyHeader}>
//           <h4>History</h4>
//           <MoveRight size={16} />
//         </div>
//         {selectedClaim.claim_details.map((detail: any, index: number) => (
//           <div key={index} className={styles.historyItem}>
//             <p>{formatDateToMonthDay(detail.date)}</p>
//             <div className={styles.historyDetails}>
//               <p>Working Hours: <span>{detail.working_hours} hours</span></p>
//               <p>Overtime Salary: <span>${detail.salaryOvertimePerDay}</span></p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ClaimStatus;

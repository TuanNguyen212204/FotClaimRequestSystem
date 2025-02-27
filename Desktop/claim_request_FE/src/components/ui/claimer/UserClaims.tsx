import { useEffect, useState } from "react";
import styles from "./UserClaims.module.css";
import axios from "axios";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { PATH } from "../../../constant/config";
import { useNavigate } from "react-router-dom";

interface Claim {
  id: string;
  claimID: number;
  pName: string;
  pDuration: string;
  totalWorkingHours: string;
  status: string;
}

const UserClaims = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [filteredClaims, setFilteredClaims] = useState<Claim[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("Processing");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://6780c0ac85151f714b07bbd0.mockapi.io/myclaims")
      .then((response) => {
        const formattedData: Claim[] = response.data.map(
          (item: Claim, index: number) => ({
            ...item,
            claimID: index + 1,
          })
        );
        setClaims(formattedData);
        setFilteredClaims(
          formattedData.filter((claim) => claim.status === "Processing")
        );
      })
      .catch((error) => {
        console.error("Error fetching claims:", error);
      });
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this claim?")) {
      alert(`Deleted claim ID: ${id}`);
    }
  };

  useEffect(() => {
    setFilteredClaims(
      claims.filter((claim) => claim.status === selectedStatus)
    );
    setCurrentPage(1);
  }, [selectedStatus, claims]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClaims.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredClaims.length / itemsPerPage);
  const goToPage = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1 className={styles.head}>My Claims</h1>
      <hr />
      <div className={styles.filterContainer}>
        <button className={styles.filterButton}>Filter ▼</button>
        <div className={styles.dropdown}>
          {["Processing", "Approved", "Paid", "Rejected"].map((status) => (
            <div
              key={status}
              className={`${styles.filterItem} ${
                selectedStatus === status ? styles.active : ""
              }`}
              onClick={() => setSelectedStatus(status)}
              style={{
                backgroundColor:
                  status === "Processing"
                    ? "#FFA500"
                    : status === "Approved"
                    ? "#28A745"
                    : status === "Paid"
                    ? "#BC4B51"
                    : "#8F0000",
                color: "white",
              }}
            >
              {status}
            </div>
          ))}
        </div>
      </div>

      <div>
        <table className={styles.table_Style}>
          <thead>
            <tr>
              <th className={styles.th_Style}>Claim ID</th>
              <th className={styles.th_Style}>Project Name</th>
              <th className={styles.th_Style}>Project Duration</th>
              <th className={styles.th_Style}>Total Working Hours</th>
              <th className={styles.th_Style}>Status</th>
              <th className={styles.th_Style}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((claim) => (
              <tr key={claim.id}>
                <td className={styles.td_Style}>{claim.claimID}</td>
                <td className={styles.td_Style}>{claim.pName}</td>
                <td className={styles.td_Style}>{claim.pDuration}</td>
                <td className={styles.td_Style}>{claim.totalWorkingHours}</td>
                <td
                  style={{
                    color:
                      claim.status === "Processing"
                        ? "#FFA500"
                        : claim.status === "Approved"
                        ? "#28A745"
                        : claim.status === "Paid"
                        ? "#BC4B51"
                        : "#8F0000",
                  }}
                >
                  {claim.status}
                </td>
                <td className={styles.actionColumn}>
                  {claim.status === "Processing" ? (
                    <>
                      <AiFillEdit className={styles.editIcon} />
                      <AiFillDelete
                        className={styles.deleteIcon}
                        onClick={() => handleDelete(claim.id)}
                      />
                    </>
                  ) : (
                    <AiFillEye
                      className={styles.viewIcon}
                      onClick={() =>
                        navigate(`${PATH.userclaimdetails}/${claim.id}`)
                      }
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.pageButton}
        >
          <AiOutlineLeft />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`${styles.pageNumber} ${
              currentPage === page ? styles.activePage : ""
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
        >
          <AiOutlineRight />
        </button>
      </div>
    </div>
  );
};

export default UserClaims;

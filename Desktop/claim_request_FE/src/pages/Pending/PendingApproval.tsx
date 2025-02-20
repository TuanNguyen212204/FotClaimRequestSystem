import { EyeIcon, TrashIcon, CheckIcon, Trash2Icon } from "lucide-react";
import { FaEye } from "react-icons/fa";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./PendingApproval.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchAllClaims, deleteClaim } from "@/redux/Claim/store/pendingSlice";
import { useAppDispatch } from "@redux/index";
import type { RootState } from "@redux/index";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export const PendingComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const claims = useSelector((state: RootState) => state.pending.listClaims);

  useEffect(() => {
    dispatch(fetchAllClaims());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedClaims, setSelectedClaims] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = claims.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(claims.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const navigator = useNavigate();

  function details(id: string) {
    navigator(`/details/${id}`);
  }

  const handleSelectClaim = (id: string) => {
    setSelectedClaims((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((claimId) => claimId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedClaims([]);
    } else {
      setSelectedClaims(currentItems.map((claim) => claim.id));
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = () => {
    selectedClaims.forEach((id) => {
      dispatch(deleteClaim(id));
    });
    setSelectedClaims([]);
    toast.success("Selected claims deleted successfully!");
  };

  const handleDelete = (id: string) => {
    dispatch(deleteClaim(id));
    toast.success("Claim deleted successfully!");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pending Approval Claims</h1>
      {/* <hr /> */}
      <nav className={styles.breadcrumb}>
        <Link to="/">My Claims</Link> &gt;{" "}
        <Link to="/pending">Pending Approval</Link>
      </nav>
      {/* <Link to="" style={{ textDecoration: "none", color: "#212121" }}>
        My Claims
      </Link> */}
      <button
        className={styles.deleteButton}
        onClick={handleDeleteSelected}
        disabled={selectedClaims.length === 0}
        style={{ textDecoration: "none" }}
      >
        <Trash2Icon />
        &nbsp; Delete Selected
      </button>
      <table className={styles.claimsTable}>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Claim ID</th>
            <th>Staff Name</th>
            <th>Project Name</th>
            <th>Project Duration</th>
            <th>Total Hours Working</th>
            <th>Approver Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((claim) => (
            <tr key={claim.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedClaims.includes(claim.id)}
                  onChange={() => handleSelectClaim(claim.id)}
                />
              </td>
              <td>{claim.id}</td>
              <td>{claim.staffName}</td>
              <td>{claim.projectName}</td>
              <td>{claim.duration}</td>
              <td>{claim.hours} hours</td>
              <td>{claim.approveName}</td>
              <td className={styles.actions}>
                <EyeIcon
                  onClick={() => details(claim.id)}
                  className={styles.icon}
                />
                &nbsp;&nbsp;&nbsp;
                <TrashIcon
                  onClick={() => handleDelete(claim.id)}
                  className={styles.icon}
                />
                &nbsp;&nbsp;&nbsp;
                <CheckIcon className={styles.icon} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <span className={styles.pageIcon} onClick={handlePreviousPage}>
          <ArrowLeft />
        </span>
        {[...Array(totalPages)].map((_, index) => (
          <span
            key={index}
            className={`${styles.pageNumber} ${
              currentPage === index + 1 ? styles.activePage : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </span>
        ))}
        <span className={styles.pageIcon} onClick={handleNextPage}>
          <ArrowRight />
        </span>
      </div>
    </div>
  );
};

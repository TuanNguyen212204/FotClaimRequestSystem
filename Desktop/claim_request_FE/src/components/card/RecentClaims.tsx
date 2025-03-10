import { useState } from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface Claim {
  id: string;
  staff: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
}

//data 
const claims: Claim[] = [
  { id: "REQ123", staff: "Nguyễn Văn A", date: "25-02-2024", status: "Pending" },
  { id: "REQ124", staff: "Trần Thị B", date: "24-02-2024", status: "Approved" },
  { id: "REQ125", staff: "Lê Văn C", date: "23-02-2024", status: "Rejected" },
  { id: "REQ126", staff: "Phạm Thị D", date: "22-02-2024", status: "Pending" },
  { id: "REQ127", staff: "Hoàng Văn E", date: "21-02-2024", status: "Approved" },
  { id: "REQ128", staff: "Lý Văn F", date: "20-02-2024", status: "Rejected" },
  { id: "REQ129", staff: "Nguyễn Văn G", date: "19-02-2024", status: "Pending" },
  { id: "REQ130", staff: "Trần Thị H", date: "18-02-2024", status: "Approved" },
];

const getStatus = (status: string) => {
  switch (status) {
    case "Pending":
      return { text: "Pending", color: "text-yellow-500", icon: <Clock size={20} /> };
    case "Approved":
      return { text: "Approved", color: "text-green-500", icon: <CheckCircle size={20} /> };
    case "Rejected":
      return { text: "Rejected", color: "text-red-500", icon: <XCircle size={20} /> };
    default:
      return { text: "NULL", color: "text-gray-500", icon: null };
  }
};

const RecentClaims = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedClaims = claims.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(claims.length / itemsPerPage);

  return (
    <div className="bg-white p-4 shadow rounded-xl">
      <h2 className="text-lg font-semibold mb-4">📌 Last Claim</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100 text-gray-600">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Staff</th>
              <th className="p-2 text-left">Day</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {selectedClaims.map((claim) => {
              const status = getStatus(claim.status);
              return (
                <tr key={claim.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{claim.id}</td>
                  <td className="p-2">{claim.staff}</td>
                  <td className="p-2">{claim.date}</td>
                  <td className={`p-2 flex items-center space-x-2 ${status.color}`}>
                    {status.icon}
                    <span>{status.text}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg text-white ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          ⬅ Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg text-white ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default RecentClaims;

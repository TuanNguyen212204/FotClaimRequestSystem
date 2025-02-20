import { useEffect, useState } from "react";
import styles from "@ui/Forms/Create-Claim/Claim.module.css";
interface ICreateRequest {
  date: string;
  from: string;
  to: string;
  hours: number;
  remark: string;
}

export default function ClaimTable() {
  const [claims, setClaims] = useState<ICreateRequest[]>([]);
  useEffect(() => {
    addRow();
  }, []);
  const addRow = () => {
    setClaims([
      ...claims,
      { date: "", from: "", to: "", hours: 0, remark: "" },
    ]);
  };

  return (
    <div className="mb-5 box-border overflow-auto">
      <h2 className="text-lg pb-1.5 mb-4 border-b-1 border-gray-400">
      Claim Table
      </h2>
      <table className="border box-border border-spacing-2 border-gray-300 mb-2.5 w-full ">
        <thead>
          <tr>
            <th>Date</th>
            <th>From Time</th>
            <th>To Time</th>
            <th>Total Hours</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim, index) => (
            <tr key={index}>
              <td>
                <input
                  title="Claim Date"
                  type="date"
                  value={claim.date}
                  onChange={(e) => {
                    const newClaims = [...claims];
                    newClaims[index].date = e.target.value;
                    setClaims(newClaims);
                  }}
                />
              </td>
              <td>
                <input
                  title="From"
                  type="time"
                  value={claim.from}
                  onChange={(e) => {
                    const newClaims = [...claims];
                    newClaims[index].from = e.target.value;
                    setClaims(newClaims);
                  }}
                />
              </td>
              <td>
                <input
                  title="To"
                  type="time"
                  value={claim.to}
                  onChange={(e) => {
                    const newClaims = [...claims];
                    newClaims[index].to = e.target.value;
                    setClaims(newClaims);
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.1"
                  placeholder="0"
                  value={claim.hours}
                  onChange={(e) => {
                    const newClaims = [...claims];
                    newClaims[index].hours = parseFloat(e.target.value) || 0;
                    setClaims(newClaims);
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Enter remarks"
                  value={claim.remark}
                  onChange={(e) => {
                    const newClaims = [...claims];
                    newClaims[index].remark = e.target.value;
                    setClaims(newClaims);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        title="Add More"
        type="button"
        onClick={addRow}
        className={`mt-2 p-2 max-w-24 rounded ${styles.add_button} `}
      >
        Add Row
      </button> 
      <div className="mb-2.5">
        <span className="block mb-1 font-bold">Total Working Hours</span>
        <input
          disabled
          placeholder="Total Hours"
          className="w-full p-2 mb-2.5 border-2 border-white box-border rounded-sm"
          value={100}
        />
      </div>
    </div>
  );
}

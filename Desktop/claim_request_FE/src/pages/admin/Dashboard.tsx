import { useState, useEffect } from "react";
import SummaryCard from "@/components/card/SummaryCard";
import DashboardHeader from "@/components/card/DashboardHeader";
import ClaimChart from "@/components/card/ClaimChart";
import OTChart from "@/components/card/OTChart";
import EmployeeClaimChart from "@/components/card/EmployeeClaimChart";
import { Chart } from "react-google-charts";
import {
  CheckCircle,
  XCircle,
  Clock,
  ClipboardList,
  Briefcase,
  Users,
} from "lucide-react";
import styles from "./Dashboard.module.css";
import httpClient from "@/constant/apiInstance";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState("monthly");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalClaim, setTotalClaim] = useState({
    totalClaims: null,
    currentMonthClaims: null,
    changePercentage: null,
  });
  const [totalPending, setTotalPending] = useState({
    pendingClaims: null,
    currentMonthPending: null,
    changePercentage: null,
  });
  const [totalApproved, setTotalApproved] = useState({
    approvedClaims: null,
    currentMonthClaims: null,
    changePercentage: null,
  });
  const [totalRejected, setTotalRejected] = useState({
    rejectedClaims: null,
    currentMonthClaims: null,
    changePercentage: null,
  });
  const [totalUser, setTotalUser] = useState({
    totalActiveUser: null,
    totalInactiveUser: null,
    totalUser: null,
  });
  const [totalProject, setTotalProject] = useState({
    totalActiveProjects: null,
    totalInactiveProjects: null,
    totalProjects: null,
  });
  const { t } = useTranslation("dashboard");

  const [selected, setSelected] = useState({
    Pending: true,
    Approved: true,
    Rejected: true,
    Paid: true,
  });

  useEffect(() => {
    const fetchTotalClaim = async () => {
      setLoading(true);
      try {
        const response = await httpClient.get("/admin/total-claims");
        const data = response?.data?.data ?? {};

        setTotalClaim({
          totalClaims: data.totalClaims ?? null,
          currentMonthClaims: data.currentMonthClaims ?? null,
          changePercentage: data.changePercentage ?? null,
        });
      } catch (error) {
        console.error("Error fetching summary data:", error);
        setTotalClaim({
          totalClaims: null,
          currentMonthClaims: null,
          changePercentage: null,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTotalClaim();
  }, []);

  useEffect(() => {
    const fetchSummaryData = async () => {
      setLoading(true);
      try {
        const response = await httpClient.get("/admin/pending-claims");
        const data = response?.data?.data ?? {};
        setTotalPending({
          pendingClaims: data.pendingClaims ?? null,
          currentMonthPending: data.currentMonthClaims ?? null,
          changePercentage: data.changePercentage ?? null,
        });
      } catch (error) {
        console.error("Error fetching summary data:", error);
        setTotalPending({
          pendingClaims: null,
          currentMonthPending: null,
          changePercentage: null,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchSummaryData();
  }, []);

  useEffect(() => {
    const fetchTotalApproved = async () => {
      setLoading(true);
      try {
        const response = await httpClient.get("/admin/approved-claims");
        const data = response?.data?.data ?? {};

        setTotalApproved({
          approvedClaims: data.approvedClaims ?? null,
          currentMonthClaims: data.currentMonthClaims ?? null,
          changePercentage: data.changePercentage ?? null,
        });
      } catch (error) {
        console.error("Error fetching summary data:", error);
        setTotalApproved({
          approvedClaims: null,
          currentMonthClaims: null,
          changePercentage: null,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTotalApproved();
  }, []);

  useEffect(() => {
    const fetchTotalRejected = async () => {
      setLoading(true);
      try {
        const response = await httpClient.get("/admin/total-users");
        const data = response?.data?.data ?? {};
        setTotalUser({
          totalActiveUser: data.totalActiveUser ?? null,
          totalInactiveUser: data.totalInactiveUser ?? null,
          totalUser: data.totalUser ?? null,
        });
      } catch (error) {
        console.error("Error fetching summary data:", error);
        setTotalUser({
          totalActiveUser: null,
          totalInactiveUser: null,
          totalUser: null,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTotalRejected();
  }, []);

  useEffect(() => {
    const fetchTotalUser = async () => {
      setLoading(true);
      try {
        const response = await httpClient.get("/admin/rejected-claims");
        const data = response?.data?.data ?? {};
        setTotalRejected({
          rejectedClaims: data.rejectedClaims ?? null,
          currentMonthClaims: data.currentMonthClaims ?? null,
          changePercentage: data.changePercentage ?? null,
        });
      } catch (error) {
        console.error("Error fetching summary data:", error);
        setTotalRejected({
          rejectedClaims: null,
          currentMonthClaims: null,
          changePercentage: null,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTotalUser();
  }, []);

  useEffect(() => {
    const fetchTotalProjects = async () => {
      setLoading(true);
      try {
        const response = await httpClient.get("/admin/total-projects");
        const data = response?.data?.data ?? {};
        setTotalProject({
          totalActiveProjects: data.totalActiveProjects ?? null,
          totalInactiveProjects: data.totalInactiveProjects ?? null,
          totalProjects: data.totalProjects ?? null,
        });
      } catch (error) {
        console.error("Error fetching summary data:", error);
        setTotalProject({
          totalActiveProjects: null,
          totalInactiveProjects: null,
          totalProjects: null,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTotalProjects();
  }, []);

  const filteredData = [
    ["Time", ...Object.keys(selected).filter((key) => selected[key])],
    ...data.map((item) => [
      item.name,
      ...Object.keys(selected)
        .filter((key) => selected[key])
        .map((key) => item[key.toLowerCase()]),
    ]),
  ];

  const isValidData = filteredData.length > 1 && filteredData[0].length > 1;
  const chartData = isValidData
    ? filteredData
    : [
        ["Time", "No Data"],
        ["", 0],
      ];

  return (
    <div className={styles.container}>
      <DashboardHeader />
      <div className="grid grid-cols-2 gap-3">
        <div className="grid grid-cols-2 grid-rows-2 gap-3">
          <SummaryCard
            title={t("dashboard.summaryCard.totalClaim")}
            totalvalue={totalClaim?.totalClaims ?? 0}
            monthvalue={totalClaim?.currentMonthClaims ?? 0}
            icon={<ClipboardList />}
            percentage={totalClaim?.changePercentage ?? 0}
          />
          <SummaryCard
            title={t("dashboard.summaryCard.pendingClaim")}
            totalvalue={totalPending?.pendingClaims ?? 0}
            monthvalue={totalPending?.currentMonthPending ?? 0}
            icon={<Clock />}
            percentage={totalPending?.changePercentage ?? 0}
          />
          <SummaryCard
            title={t("dashboard.summaryCard.approvedClaim")}
            totalvalue={totalApproved?.approvedClaims ?? 0}
            monthvalue={totalApproved?.currentMonthClaims ?? 0}
            icon={<CheckCircle />}
            percentage={totalApproved?.changePercentage ?? 0}
          />
          <SummaryCard
            title={t("dashboard.summaryCard.rejectedClaim")}
            totalvalue={totalRejected?.rejectedClaims ?? 0}
            monthvalue={totalRejected?.currentMonthClaims ?? 0}
            icon={<XCircle />}
            percentage={totalRejected?.changePercentage ?? 0}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <SummaryCard
            title={t("dashboard.summaryCard.totalProject")}
            totalvalue={
              (totalProject.totalActiveProjects ?? 0) +
              (totalProject.totalInactiveProjects ?? 0)
            }
            icon={<Briefcase />}
            chartData={[
              [
                t("dashboard.summaryCard.active"),
                totalProject.totalActiveProjects ?? 0,
              ],
              [
                t("dashboard.summaryCard.inactive"),
                totalProject.totalInactiveProjects ?? 0,
              ],
            ]}
            colors={["#ffdb70", "#FFC107"]}
          />
          <SummaryCard
            title={t("dashboard.summaryCard.totalUser")}
            totalvalue={
              (totalUser.totalActiveUser ?? 0) +
              (totalUser.totalInactiveUser ?? 0)
            }
            icon={<Users />}
            chartData={[
              [
                t("dashboard.summaryCard.active"),
                totalUser.totalActiveUser ?? 0,
              ],
              [
                t("dashboard.summaryCard.inactive"),
                totalUser.totalInactiveUser ?? 0,
              ],
            ]}
            colors={["#ff855e", "#FF5722"]}
          />
        </div>
      </div>
      <div className={styles.gridContainer}>
        <div>
          <OTChart />
        </div>
        <div>
          <ClaimChart />
        </div>
        <div>
          {/* <EmployeeClaimChart/> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

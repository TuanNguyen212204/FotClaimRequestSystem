import { JSX } from "react";
import { useTranslation } from "react-i18next";

export interface IHeadProps {
  title: string | undefined;
  status: string | undefined;
  prepareBy: string | undefined;
}

const statusStyles = {
  Draft: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  Pending: "bg-blue-100 text-blue-800 border border-blue-300",
  Approved: "bg-green-100 text-green-800 border border-green-300",
};

export default function Header({
  title = "",
  status = "Draft",
  prepareBy = "",
}: IHeadProps): JSX.Element {
  const { t } = useTranslation("claim");

  const statusClass =
    statusStyles[status as keyof typeof statusStyles] || statusStyles.Draft;

  return (
    <HeaderContainer>
      <div>
        <h1 className="text-2xl p-0">{title}</h1>
        <span className="text-gray-400 pt-2">
          {t("prepare_by_label")} {prepareBy}
        </span>
      </div>
      <div className={headerStyle.Claim_Status}>
        {t("claim_status_label")} {status}
    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 pb-4 border-b border-gray-300 gap-2 sm:gap-0 box-border">
      <div className="box-border text-left">
        <h1 className="text-2xl font-bold mb-1 p-0 box-border">{title}</h1>
        <span className="text-sm text-gray-500 pt-0 box-border">
          {t("header.preparedBy", { name: prepareBy })}
        </span>
      </div>
      <div
        className={`py-1.5 px-3 rounded-full text-sm font-medium self-start sm:self-center ${statusClass} box-border`}
      >
        {status}
      </div>
    </HeaderContainer>
    </div>
  );
}

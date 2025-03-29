import { JSX, ReactNode } from "react";
import headerStyle from "../Claim.module.css";
import { useTranslation } from "react-i18next";

export interface IHeadProps {
  title: string | undefined;
  status: string | undefined;
  prepareBy: string | undefined;
}

export default function Header({
  title = "",
  status = "",
  prepareBy = "",
}: IHeadProps): JSX.Element {
  const { t } = useTranslation("claim");

  return (
    <HeaderContainer>
      <div>
        <h1 className="text-2xl p-0">{title}</h1>
        <span className="text-gray-400 pt-2">
          {t("header.preparedBy", { name: prepareBy })}
        </span>
      </div>
      <div className={headerStyle.Claim_Status}>
        {t("header.claimStatus", { status: status })}
      </div>
    </HeaderContainer>
  );
}
const HeaderContainer = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  return <div className={headerStyle.Header_Container}>{children}</div>;
};

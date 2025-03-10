import { JSX, ReactNode } from "react";
import headerStyle from "../Claim.module.css";
export interface IHeadProps {
  title: string;
  status: string;
  prepareBy: string;
}

export default function Header({
  title,
  status,
  prepareBy,
}: IHeadProps): JSX.Element {
  return (
    <HeaderContainer>
      <div>
        <h1 className="text-2xl p-0">{title}</h1>
        <span className="text-gray-400 pt-2">Prepare By: {prepareBy}</span>
      </div>
      <div className={headerStyle.Claim_Status}>Claim Status: {status}</div>
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

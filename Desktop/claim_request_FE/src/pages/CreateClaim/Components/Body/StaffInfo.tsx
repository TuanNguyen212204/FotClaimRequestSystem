import React, { JSX, ReactNode } from "react";
import staffInfoCss from "../../Claim.module.css";
import Card from "../Card";
import PopOver from "@/components/ui/PopOver";
import { Check } from "lucide-react";
import { useState } from "react";
interface IStaffInfoProps {
  name: string | undefined;
  department: string | undefined;
  staffID: string;
}

export default function StaffInfo({
  name = "",
  department = "",
  staffID,
}: IStaffInfoProps): JSX.Element {
  const [copied, setCopied] = useState(false);
  const handleCopy = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    navigator.clipboard.writeText(staffID);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };
  return (
    <Card>
      <StaffContainer>
        <StaffSection title="Staff Name">
          <StaffValue isName value={name} />
        </StaffSection>

        <StaffSection title="Department">
          <StaffValue value={department} />
        </StaffSection>

        <StaffSection title="Staff ID">
          <PopOver
            placement="top"
            trigger="hover"
            content={
              copied ? (
                <Check className="transform delay-75" size={16} color="green" />
              ) : (
                "Click to copy"
              )
            }
            style={{ padding: "0.5rem" }}
          >
            <StaffValue cursor="pointer" onClick={handleCopy} value={staffID} />
          </PopOver>
        </StaffSection>
      </StaffContainer>
    </Card>
  );
}

const StaffContainer = ({ children }: { children: ReactNode }): JSX.Element => {
  return <div className={staffInfoCss.staff_info}>{children}</div>;
};

const StaffSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): JSX.Element => {
  return (
    <div className={staffInfoCss.staff_field}>
      <StaffLabel>{title}</StaffLabel>
      {children}
    </div>
  );
};

const StaffLabel = ({ children }: { children: ReactNode }): JSX.Element => {
  return <div className={staffInfoCss.staff_label}>{children}</div>;
};

const StaffValue = ({
  isName = false,
  value,
  onClick,
  cursor,
}: {
  isName?: boolean;
  value?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  cursor?: React.CSSProperties["cursor"];
}): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className={`${staffInfoCss.staff_value} ${
        isName ? staffInfoCss.staff_name : ""
      }`}
      style={{ cursor }}
    >
      {value}
    </div>
  );
};

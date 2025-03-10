import { JSX, ReactNode } from "react";
import staffInfoCss from "../../Claim.module.css";
import Card from "../Card";

interface IStaffInfoProps {
  name: string;
  department: string;
  staffID: string;
}

export default function StaffInfo({
  name,
  department,
  staffID,
}: IStaffInfoProps): JSX.Element {
  return (
    <Card>
      <StaffContainer>
        <StaffSection title="Staff Name">
          <StaffValue isName>{name}</StaffValue>
        </StaffSection>

        <StaffSection title="Department">
          <StaffValue>{department}</StaffValue>
        </StaffSection>

        <StaffSection title="Staff ID">
          <StaffValue>{staffID}</StaffValue>
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
  children,
  isName = false,
}: {
  children: ReactNode;
  isName?: boolean;
}): JSX.Element => {
  return (
    <div
      className={`${staffInfoCss.staff_value} ${
        isName ? staffInfoCss.staff_name : ""
      }`}
    >
      {children}
    </div>
  );
};

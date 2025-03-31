import React, { JSX, useState } from "react";
import Card from "../Card";
import PopOver from "@/components/ui/PopOver";
import { User, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("claim");
  const [copied, setCopied] = useState(false);


  const handleCopy = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    navigator.clipboard.writeText(staffID);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  };


  return (
    <Card>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 box-border">
        <div className="min-w-0 box-border text-left">
          <label className="block text-xs font-medium text-gray-500 uppercase mb-1 box-border">
            {t("staffInfo.nameLabel")}
          </label>
          <div className="text-base font-normal py-1 break-words flex items-center box-border">
            <User size={16} className="mr-2 text-teal-600 inline box-border" />
            {name}
          </div>
        </div>

        <div className="min-w-0 box-border text-left">
          <label className="block text-xs font-medium text-gray-500 uppercase mb-1 box-border">
            {t("staffInfo.departmentLabel")}
          </label>
          <div className="text-base font-normal py-1 break-words box-border">
            {department}
          </div>
        </div>

        <div className="min-w-0 box-border text-left">
          <label className="block text-xs font-medium text-gray-500 uppercase mb-1 box-border">
            {t("staffInfo.staffIdLabel")}
          </label>
          <PopOver
            placement="top"
            trigger="hover"
            content={
              copied ? (
                <span className="flex items-center text-green-600">
                  <Check size={16} className="inline mr-1" />
                  {t("staffInfo.copiedTooltip", { defaultValue: "Copied!" })}
                </span>
              ) : (
                t("staffInfo.copyTooltip")
              )
            }
          >
            <div
              onClick={handleCopy}
              title={t("staffInfo.copyTooltip")}
              className="text-base font-normal py-1 break-words cursor-pointer inline-flex items-center gap-2 transition-colors duration-200 ease-in-out hover:text-teal-600 group box-border"
            >
              {staffID}
            </div>
          </PopOver>
        </div>
      </div>
    </Card>
  );
}

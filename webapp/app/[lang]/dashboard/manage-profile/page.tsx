import { Checkbox } from "@/components/ui/checkbox";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Profile Information",
};

interface RowProps {
  title: string;
  value: React.ReactNode;
}

export const Row = ({ title, value }: RowProps) => (
  <div className="flex px-[10px] py-4 gap-32 border-b border-primary-foreground items-center">
    <div className="flex-1">
      <span className="text-black tracking-[0.5px] font-semibold">{title}</span>
    </div>
    <div className="flex-[3]">
      <div className="text-gray-dark tracking-[0.5px]">{value}</div>
    </div>
  </div>
);

export default async function ManageProfilePage() {
  return (
    <div className="w-full px-28 py-16 flex-1">
      <div className="flex w-full flex-1 flex-col">
        <h1 className="font-poppins font-bold tracking-[1px] text-[2rem] leading-[3rem] py-4">
          {"Profile Information"}
        </h1>
        <div className="p-8 bg-white min-w-[866px] flex flex-col">
          <div className="flex items-center gap-2 self-end mr-36">
            <Image src="/images/edit.svg" alt="edit" width={24} height={24} />
            <span>{"Edit"}</span>
          </div>
          <div className="flex flex-col gap-[10px]">
            <Row title="Account owner" value={"George Brunetti"} />
            <Row title="Account number" value="ACCT 14-5678-12" />
            <Row
              title="Service Address"
              value="123 Oak Street Minneapolis, MN"
            />
            <Row
              title="Mailing Address"
              value="123 Oak Street Minneapolis, MN"
            />
            <Row title="Primary Phone" value="555-555-5555" />
            <Row title="Email Address" value="customername@email" />
            <Row
              title="Password"
              value={
                <div className="flex items-center gap-16">
                  <span>******************</span>
                  <Link href="/change-password" className="font-bold underline">
                    {"Change password"}
                  </Link>
                </div>
              }
            />
            <Row
              title="Security Settings"
              value={
                <div className="flex items-center gap-2">
                  <Checkbox checked={true} className="" />
                  <span>Enable Two Factor Authentication</span>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

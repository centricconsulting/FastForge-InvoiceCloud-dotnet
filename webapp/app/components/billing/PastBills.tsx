import { Button } from "@/components/ui/button";
import { DictionaryType } from "@/types";
import React from "react";

export default function PastBills({
  dictionary,
  pastBillData,
}: Readonly<{
  dictionary: DictionaryType;
  pastBillData: Array<{
    id: number;
    status: string;
    statusColor: string;
    date: string;
    description: string;
    period: string;
    total: string;
    paidOn: string;
  }>;
}>) {
  return (
    <div className="bg-white p-6 shadow-[2px_2px_18px_0px_#00000014]">
      <h2 className="text-2xl tracking-wide font-poppins font-bold text-black">
        {dictionary.billings.past_bills}
      </h2>
      <div className="border-b-4 border-[#FDB825] w-12 my-2" />
      <table className="mt-4 text-left">
        <thead>
          <tr className="text-black tracking-[0.5px]">
            {[
              dictionary.billings.status,
              dictionary.billings.date,
              dictionary.billings.description,
              dictionary.billings.total,
              dictionary.billings.paid_on,
            ].map((header) => (
              <th key={header} className="py-2 px-5 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pastBillData.map((bill) => (
            <tr key={bill.id} className="border-b border-[#D6D8E7]">
              <td className="p-5">
                <p
                  className={`px-3 py-1 text-black text-xs font-bold rounded-full ${bill.statusColor} uppercase text-center`}
                >
                  {bill.status}
                </p>
              </td>
              <td className="p-5">{bill.date}</td>
              <td className="p-5">
                {bill.description}
                <div>{bill.period}</div>
              </td>
              <td className="p-5">{bill.total}</td>
              <td className="p-5">{bill.paidOn}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-6">
        <Button
          variant={"outline"}
          type="button"
          className="w-auto uppercase border-2 px-10 py-3 tracking-[0.5px] text-bold"
        >
          {dictionary.billings.view_payment_history}
        </Button>
      </div>
    </div>
  );
}

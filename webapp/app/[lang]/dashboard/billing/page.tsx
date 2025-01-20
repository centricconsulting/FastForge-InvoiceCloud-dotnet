import CurrentBill from "@/app/components/dashboard/currentBill";
import billingHistoryAPI from "@/app/apis/dummyMonthlyBillHistory";
import MonthlyBillingHistory from "@/app/components/billing/MonthlyBillingHistory";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import dummyBillApi from "../../../apis/dummyBillApi";

export const metadata: Metadata = {
  title: "Billing",
};

export default async function BillingPage({
  params: { lang },
}: Readonly<{
  params: { lang: Locale };
}>) {
  const customerBill = dummyBillApi.getBill(123);
  const billHistoryData = billingHistoryAPI.getBillingHistory();

  const dictionary = await getDictionary(lang);

  return (
    <div className="w-full gap-6 flex flex-col">
      <div className="flex w-full items-center justify-between ">
        <h1 className="text-4xl font-poppins font-bold">Pay My Bill</h1>
      </div>
      <CurrentBill dictionary={dictionary} billDetails={customerBill} />
      <MonthlyBillingHistory
        dictionary={dictionary}
        billHistoryData={billHistoryData}
      />
    </div>
  );
}

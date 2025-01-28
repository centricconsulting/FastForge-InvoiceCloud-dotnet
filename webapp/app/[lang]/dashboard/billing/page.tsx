import CurrentBill from "@/app/components/dashboard/currentBill";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";
import dummyBillApi from "../../../apis/dummyBillApi";

export const metadata: Metadata = {
  title: "Billing",
};

export default async function BillingPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const customerBill = dummyBillApi.getBill(123);

  const dictionary = await getDictionary(lang);
  return (
    <div className="flex flex-row items-center w-full  justify-between">
      <div className="w-[49%] bg-white">{"Account Details"}</div>
      <CurrentBill
        dictionary={dictionary}
        billDetails={customerBill}
      />
    </div>
  );
}

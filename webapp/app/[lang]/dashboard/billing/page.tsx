import api from "@/app/apis/dummyPastBillsData";
import PastBills from "@/app/components/billing/PastBills";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing",
};

export default async function BillingPage({
  params: { lang },
}: Readonly<{
  params: { lang: Locale };
}>) {
  const dictionary = await getDictionary(lang);
  const billingHistory = api.getBillingHistory();
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Billing </h1>
      </div>
      <PastBills dictionary={dictionary} pastBillData={billingHistory} />
    </div>
  );
}

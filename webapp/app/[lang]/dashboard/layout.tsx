import Drawer from "@/app/components/drawer";
import { Locale } from "@/i18n-config";

export default function Layout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <div className="min-h-screen flex-col md:flex-row md:overflow-hidden max-w-screen-2xl m-auto relative bg-[#F4F6FC]">
      <Drawer lang={lang} />

      <div className="ml-[85px] mt-[58px] p-4">{children}</div>
    </div>
  );
}

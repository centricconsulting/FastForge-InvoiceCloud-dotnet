import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Login from "../components/auth/login";

export default async function LoginPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return <Login dictionary={dictionary} />;
}

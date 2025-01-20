"use client";

import { Button } from "@/components/ui/button";
import AuthWrapper from "./auth-wrapper";
import { DictionaryType } from "@/types";
import Link from "next/link";

export default function ConfirmEmail({
  dictionary,
}: {
  dictionary: DictionaryType;
}) {
  return (
    <AuthWrapper title={dictionary.auth.confirm_your_email}>
      <p className=" text-black text-base tracking-[0.5px] my-6">
        {dictionary.auth.account_creation_thanks}
        <br />
        <br />
        {dictionary.auth.account_creation_message}
      </p>

      <Button
        type="submit"
        className="mt-6 uppercase font-bold text-base tracking-[0.5px]"
      >
        <Link href="/login">{dictionary.auth.back_to_log_in}</Link>
      </Button>
    </AuthWrapper>
  );
}

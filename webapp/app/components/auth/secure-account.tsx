"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DictionaryType } from "@/types";
import { useFormik } from "formik";
import { ChevronRight, Loader2Icon, Phone } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import * as yup from "yup";
const VerificationInput = dynamic(() => import("react-verification-input"), {
  loading: () => <Loader2Icon />,
});
const LoadingWithBackground = dynamic(
  () => import("../loading-with-background"),
  {
    loading: () => <Loader2Icon />,
  }
);

interface Props {
  readonly setOpen: Dispatch<SetStateAction<boolean>>;
  readonly open: boolean;
  readonly dictionary: DictionaryType;
}

const validationSchema = yup.object({
  phone: yup.string().required("Phone is required"),
});

export default function SecureAccount({ setOpen, open, dictionary }: Props) {
  const [contactType, setContactType] = useState(1);
  const [openLoading, setOpenLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState("");

  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setShowCode(true);
    },
  });

  const handleCloseModal = useCallback(() => {
    if (showCode) setShowCode(false);
    else setOpen(false);
  }, [setOpen, showCode]);

  const { phone } = formik.values;
  const { phone: phoneError } = formik.errors;
  const { phone: phoneTouched } = formik.touched;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[580px] p-[2.5rem]">
          <DialogHeader>
            <h1 className="text-3xl font-poppins font-bold text-center text-gray-dark tracking-[1px]">
              {dictionary.auth.secure_your_account}
            </h1>
          </DialogHeader>
          <div className=" text-center px-4">
            <p className="text-lg text-gray-dark mt-6 font-bold tracking-[0.5px]">
              {showCode
                ? dictionary.auth.confirm_your_phone_number
                : dictionary.auth.receive_authentication_via_phone}
            </p>
            <p className="text-base text-[#404041] mt-4 tracking-[0.5px]">
              {showCode
                ? `${
                    dictionary.auth.please_enter_the_6_digits_code_sent_to
                  } ${phone.replace(/^(\d{3})(\d{3})/, "XXX-XXX-")}`
                : dictionary.auth.use_accessible_phone_number}
            </p>
            {showCode ? (
              <>
                <VerificationInput
                  classNames={{
                    character:
                      "border-[#D6CCF1] rounded-[5px] w-[70px] h-[70px] flex items-center justify-center",
                    container: "w-full text-center my-12",
                    characterInactive: "bg-white",
                    characterFilled:
                      "text-[2rem] leading-[3rem] tracking-[1px] font-bold font-poppins",
                  }}
                  placeholder=""
                  value={code}
                  onChange={(e) => setCode(e)}
                />
                <p className="mt-8 text-gray-dark text-lg tracking-[0.5px] font-bold">
                  {dictionary.auth.text_or_data_rates_may_apply}
                </p>
                <Button
                  disabled={!code || code.length !== 6}
                  type="button"
                  onClick={() => {
                    setOpenLoading(true);
                    setShowCode(false);
                    setOpen(false);
                  }}
                  className="mt-6 uppercase font-bold text-base tracking-[0.5px] disabled:bg-[#D6CCF1] disabled:opacity-100"
                >
                  {dictionary.auth.continue} <ChevronRight />
                </Button>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-6 my-8">
                  <button
                    className={`border ${
                      contactType === 1
                        ? "border-primary bg-[#F0ECFA]"
                        : "border-primary-foreground"
                    } flex flex-col justify-center items-center p-4 rounded-lg text-gray-dark cursor-pointer`}
                    onClick={() => setContactType(1)}
                  >
                    <Image
                      className="mb-2"
                      src="/images/text.svg"
                      alt="Text"
                      width={80}
                      height={80}
                    />
                    <p className="text-lg tracking-[0.5px] font-bold">
                      {dictionary.auth.text_me}
                    </p>
                  </button>
                  <button
                    className={`border ${
                      contactType === 2
                        ? "border-primary bg-[#F0ECFA]"
                        : "border-primary-foreground"
                    } flex flex-col justify-center items-center p-4 rounded-lg text-gray-dark cursor-pointer`}
                    onClick={() => setContactType(2)}
                  >
                    <Image
                      src="/images/call.svg"
                      alt="Call"
                      width={85}
                      height={82}
                      className="mb-2"
                    />
                    <p className="text-lg tracking-[0.5px] font-bold">
                      {dictionary.auth.call_me}
                    </p>
                  </button>
                </div>
                <form onSubmit={formik.handleSubmit} className="mt-8">
                  <Input
                    name="phone"
                    id="phone"
                    placeholder="Your Phone Number"
                    label="Your Phone Number"
                    autoComplete="off"
                    error={phoneTouched && phoneError ? phoneError : undefined}
                    value={phone}
                    onChange={formik.handleChange}
                    icon={<Phone className="text-gray-mid" size={18} />}
                  />
                  <p className="mt-6 text-lg tracking-[0.5px] text-gray-dark font-bold">
                    {dictionary.auth.text_or_data_rates_may_apply}
                  </p>
                  <Button
                    type="submit"
                    className="mt-6 uppercase font-bold text-base tracking-[0.5px]"
                  >
                    {dictionary.auth.continue} <ChevronRight />
                  </Button>
                </form>
              </>
            )}

            <Button
              variant={"outline"}
              type="button"
              className="mt-4 uppercase font-bold text-base tracking-[0.5px]"
              onClick={handleCloseModal}
            >
              {dictionary.auth.go_back}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {openLoading && (
        <LoadingWithBackground
          title={dictionary.auth.thanks_for_verifying_its_you}
          subTitle={dictionary.auth.logging_you_in}
          open={openLoading}
          setOpen={setOpenLoading}
        />
      )}
    </>
  );
}

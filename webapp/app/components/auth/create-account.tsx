"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import Link from "next/link";

import * as yup from "yup";
import AuthWrapper from "./auth-wrapper";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DictionaryType } from "@/types";
import { phoneRegExp } from "@/constants/regex";

const validationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Primary phone number is not valid")
    .required("Phone is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords not match"),
});

export default function CreateAccount({
  dictionary,
}: {
  dictionary: DictionaryType;
}) {
  const [agree, setAgree] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      router.push("/confirm-email");
    },
  });

  const { password, email, firstName, lastName, confirmPassword, phone } =
    formik.values;
  const {
    email: emailError,
    password: passwordError,
    phone: PhoneError,
    firstName: firstNameError,
    lastName: lastNameError,
    confirmPassword: confirmPasswordError,
  } = formik.errors;
  const {
    email: emailTouched,
    password: passwordTouched,
    confirmPassword: confirmPasswordTouched,
    phone: PhoneTouched,
    firstName: firstNameTouched,
    lastName: lastNameTouched,
  } = formik.touched;

  return (
    <AuthWrapper title={dictionary.auth.create_your_account}>
      <p className="font-sans font-bold text-xs mt-6 text-gray-mid">
        <span className="text-error mr-1">*</span>{dictionary.auth.required_fields}
      </p>
      <form onSubmit={formik.handleSubmit}>
        <div className="my-6 grid md:grid-cols-2 gap-4">
          <Input
            required
            name="firstName"
            id="firstName"
            placeholder={dictionary.auth.first_name}
            label={dictionary.auth.first_name}
            autoComplete="off"
            error={
              firstNameTouched && firstNameError ? firstNameError : undefined
            }
            value={firstName}
            onChange={formik.handleChange}
          />
          <Input
            required
            name="lastName"
            id="lastName"
            placeholder={dictionary.auth.last_name}
            label={dictionary.auth.last_name}
            autoComplete="off"
            error={lastNameTouched && lastNameError ? lastNameError : undefined}
            value={lastName}
            onChange={formik.handleChange}
          />
        </div>
        <div className="my-6">
          <Input
            required
            name="phone"
            id="phone"
            inputMode="numeric"
            type="number"
            placeholder={dictionary.auth.primary_phone_number}
            label={dictionary.auth.primary_phone_number}
            autoComplete="off"
            error={PhoneTouched && PhoneError ? PhoneError : undefined}
            value={phone}
            onChange={formik.handleChange}
          />
        </div>
        <div className="my-6">
          <Input
            required
            name="email"
            id="email"
            placeholder={dictionary.auth.email}
            label={dictionary.auth.email}
            autoComplete="off"
            error={emailTouched && emailError ? emailError : undefined}
            value={email}
            onChange={formik.handleChange}
          />
        </div>
        <div className="my-6">
          <Input
            hint={dictionary.auth.password_hint}
            label={dictionary.auth.password}
            type="password"
            name="password"
            id="password"
            placeholder={dictionary.auth.password}
            error={passwordTouched && passwordError ? passwordError : undefined}
            value={password}
            onChange={formik.handleChange}
          />
        </div>
        <div className="my-6">
          <Input
            required
            label={dictionary.auth.confirm_password}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder={dictionary.auth.confirm_password}
            error={
              confirmPasswordTouched && confirmPasswordError
                ? confirmPasswordError
                : undefined
            }
            value={confirmPassword}
            onChange={formik.handleChange}
          />
        </div>
        <Checkbox
          id="terms"
          checked={agree}
          onCheckedChange={(checked: boolean) => setAgree(checked)}
        />
        <label
          htmlFor="terms"
          className="font-sans text-base font-semibold ml-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
        >
          {dictionary.auth.agree_to}
          <Link href="/" className="text-primary underline">            
            {dictionary.auth.terms_and_conditions}
          </Link>
        </label>

        <Button disabled={!agree} type="submit" className="mt-12">
          {dictionary.auth.create_account_in_uppercase}
        </Button>
      </form>
    </AuthWrapper>
  );
}

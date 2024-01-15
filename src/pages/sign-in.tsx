import Input from "@/components/shared/input";
import InputGroup from "@/components/shared/input-group";
import FormValidator from "@/utils/form-validator";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const SignIn: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({ criteriaMode: "firstError" });

  const onSubmit = (data) => {
    console.log("Sign In Success !", data);
    router.push("/landing");
  };

  return (
    <>
      <div className={"pageHeader"}>
        <h1>{t("Welcome Back")}</h1>
        <p>{t("Sign in description")}</p>
      </div>

      <form className={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email", {
            required: FormValidator.required("Email"),
            pattern: FormValidator.email("Email"),
          })}
          label={t("Email")}
          type="text"
          name="email"
          required={true}
          placeholder={t("Email input")}
          errors={errors}
        />

        <InputGroup
          {...register("password", {
            required: FormValidator.required("Password"),
            minLength: FormValidator.minLength("Password", 6),
            maxLength: FormValidator.maxLength("Password", 18),
            pattern: FormValidator.password("Password"),
          })}
          label={t("Password")}
          type={showPassword ? "text" : "password"}
          name="password"
          required={true}
          placeholder={t("Password input")}
          errors={errors}
          handleIcon={
            <span
              className={`eye-icon ${showPassword ? "visible" : "invisible"}`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="eye"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path>
                </svg>
              ) : (
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="eye-invisible"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"></path>
                  <path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"></path>
                </svg>
              )}
            </span>
          }
        />

        <Link href="#" className="black">
          {t("Forgot password")}
        </Link>

        <button className={"button"} type="submit">
          {t("Sign in")}
        </button>
      </form>

      <div className={"pageFooter"}>
        <Link href="/sign-up">
          <span className="black">{t("Don't have an account")}</span>
          <span>{t("Sign up")}</span>
        </Link>
      </div>
    </>
  );
};

export default SignIn;

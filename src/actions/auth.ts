"use server";

import { redirect } from "next/navigation";
import { isAPIError } from "better-auth/api";

import { auth } from "@/lib/auth";
import {
  registrationSchema,
  loginSchema,
  type RegistrationFormData,
  type LoginFormData,
} from "@/lib/schemas";

export async function signUpWithEmail(
  input: RegistrationFormData,
): Promise<{ success: false; message: string } | void> {
  // server-side validation of the registration form data using Zod schema
  // client-side validation is already done in the form component,
  // but this is a safety net in case the client-side validation is bypassed or disabled
  const parsed = registrationSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check your registration details.",
    };
  }

  try {
    const { name, email, password } = parsed.data;
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        // callbackURL: `${window.location.origin}`, // redirect home after login
      },
    });
    console.log("Registration successful for:", email);
  } catch (error) {
    if (isAPIError(error)) {
      console.warn("Registration rejected:", error.status);

      return {
        success: false,
        message:
          "Unable to create your account. Please check your details and try again.",
      };
    }

    console.error("Unexpected registration failure:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }

  // keep redirect outside try/catch.
  redirect("/");
}

export async function signInWithEmail(
  input: LoginFormData,
): Promise<{ success: false; message: string } | void> {
  const parsed = loginSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please check your login details.",
    };
  }

  try {
    const { email, password } = parsed.data;
    await auth.api.signInEmail({
      body: { email, password },
    });
    console.log("Login successful for:", email);
  } catch (error) {
    if (isAPIError(error)) {
      console.warn("Login rejected:", error.status);

      return {
        success: false,
        message:
          "Unable to log in. Please check your email and password and try again.",
      };
    }

    console.error("Unexpected login failure:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }

  redirect("/");
}

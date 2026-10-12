"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registrationSchema, type RegistrationFormData } from "@/lib/schemas";
import { signUpWithEmail } from "@/actions/auth";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegistrationFormData) {
    clearErrors("root");

    const result = await signUpWithEmail(data);

    if (result && !result.success) {
      setError("root", {
        type: "server",
        message: result.message,
      });
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="text-xs-ds rounded-sm-ds focus:outline-none focus:ring-1! focus:ring-accent! placeholder:tracking-wide placeholder:text-muted-foreground"
                  required
                  {...register("name")}
                />
                {errors.name && (
                  <span className="text-xs text-destructive mt-1">
                    {errors.name.message}
                  </span>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="jhon@example.com"
                  className="text-xs-ds rounded-sm-ds focus:outline-none focus:ring-1! focus:ring-accent! placeholder:tracking-wide placeholder:text-muted-foreground"
                  required
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-xs text-destructive mt-1">
                    {errors.email.message}
                  </span>
                )}
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      className="text-xs-ds rounded-sm-ds focus:outline-none focus:ring-1! focus:ring-accent!"
                      required
                      {...register("password")}
                    />
                    {errors.password && (
                      <span className="text-xs text-destructive mt-1">
                        {errors.password.message}
                      </span>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirmPassword"
                      type="password"
                      className="text-xs-ds rounded-sm-ds focus:outline-none focus:ring-1! focus:ring-accent!"
                      required
                      {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <span className="text-xs text-destructive mt-1">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>

                {/* root errors from server */}
                {errors.root && (
                  <span className="text-xs text-destructive mt-1">
                    {errors.root.message}
                  </span>
                )}
              </Field>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating account..." : "Create Account"}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="signin">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      {/*<FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>*/}
    </div>
  );
}

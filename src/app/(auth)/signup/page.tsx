import Link from "next/link";

import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-4.5">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-5 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <span className="grid place-items-center rounded-sm-ds bg-primary text-primary-foreground">
              <svg
                className="size-4 fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="4"></rect>
                <path d="M9 8h6M9 12h6M9 16h3"></path>
              </svg>
            </span>
          </div>
          Context Library
        </Link>
        <SignupForm />
      </div>
    </div>
  );
}

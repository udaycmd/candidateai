import { AuthContainer } from "@/components/auth/auth-container"

export const metadata = {
  title: "Sign In",
  description: "Sign in to your account using Google or GitHub",
}

export default function SignInPage() {
  return (
    <AuthContainer
      headerLabel="Welcome Back"
      subHeaderLabel="Sign into your account with"
      backLabel="Don't have an account? Make one!"
      backHref="/sign-up"
    />
  )
}

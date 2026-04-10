import { AuthContainer } from "@/components/auth/auth-container"

export const metadata = {
  title: "Sign Up",
  description: "Create your account using Google or GitHub",
}

export default function SignUpPage() {
  return (
    <AuthContainer
      headerLabel="Create Account"
      subHeaderLabel="Create your account with"
      backLabel="Already have an account? Sign in!"
      backHref="/sign-in"
    />
  )
}

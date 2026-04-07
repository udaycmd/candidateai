import { AuthContainer } from "@/components/auth/auth-container"
import { OAuthProviders } from "@/components/auth/oauth-providers"
import Link from "next/link"

export const metadata = {
  title: "Sign In",
  description: "Sign in to your account using Google or GitHub",
}

export default function SignInPage() {
  return (
    <AuthContainer title="Welcome Back" description="Sign in to your account">
      <OAuthProviders />
      <div className="border-t border-gray-200 pt-4 text-center dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </AuthContainer>
  )
}

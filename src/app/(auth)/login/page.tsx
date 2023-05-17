import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { UserLoginForm } from "@/components/user-login-form"
import Container from '@/components/container'

import Saly from "../../../../public/images/Saly.png"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <Container className="flex min-h-[80vh] items-center justify-between">
      <div className="relative w-1/2">
        <h2 className="text-5xl font-bold leading-relaxed">
          Step into Comfort <br className="hidden sm:inline" />
          Sign In Now
        </h2>

        <p className="my-5">
          If you don&apos;t have an account <br className="hidden sm:inline" />{" "}
          You can <Link href="/">Register here!</Link>{" "}
        </p>

        <Image
          className="absolute right-0 top-3 h-96 w-96"
          src={Saly}
          alt="Login image"
        />
      </div>
      <div className="w-2/5">
        <h2 className="mb-10 text-center text-3xl font-bold">Login</h2>
        <UserLoginForm />
      </div>
    </Container>
  )
}

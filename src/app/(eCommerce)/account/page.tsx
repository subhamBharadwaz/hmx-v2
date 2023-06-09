import LogoutButton from "@/components/account/logout";
import { Button, buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import Link from "next/link";

const Address = dynamic(
    () => import("@/components/address"),
    {
      ssr: false,
    }
  )

export default async function AccountPage(){
    const user = await getCurrentUser()
    return (
        <section className="container space-y-10 pt-24">
            <div className="flex w-full items-center justify-between">
                <h2 className="text-xl font-bold text-foreground md:text-4xl">Account</h2>
                <LogoutButton/>
            </div>

            <div className="space-y-5">
                <h3 className="text-lg text-foreground md:text-2xl">Account Details</h3>
                <div className="space-y-3">
                    <p className="text-foreground lg:text-lg">{`${user?.user?.firstName} ${user?.user?.lastName}`}</p>
                    <p className="text-foreground lg:text-lg">{user?.user?.email}</p>
                    <p className="text-foreground lg:text-lg">{user?.user?.phoneNumber}</p>
                    <Link href='/account/update' className={cn(buttonVariants({size: 'sm', variant: 'outline'}))}>Update Details</Link>
                </div>
                <div className="space-y-3">
                    <h3 className="text-lg text-foreground md:text-2xl">Address</h3>
                    <Address/>
                </div>
                <Link href='/account/orders' className="inline-block underline underline-offset-4 transition-all duration-200 ease-in-out hover:decoration-slate-500">
                <h3 className="text-lg text-foreground md:text-2xl">View Orders</h3>
                </Link>
            </div>
        </section>
    )
}
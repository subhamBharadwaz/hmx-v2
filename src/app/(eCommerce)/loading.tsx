import { Icons } from "@/components/icons"

export default function Loading(){
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Icons.loader className="h-24 w-24 animate-spin font-bold"/>
        </div>
    )
}
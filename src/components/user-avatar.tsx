import { Icons } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { IUser } from "@/types"
import { AvatarProps } from "@radix-ui/react-avatar"

interface UserAvatarProps extends AvatarProps {
  user: {
    firstName: string
    lastName: string
    photo: string
  }
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user?.photo ? (
        <AvatarImage alt="Picture" src={user?.photo} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{`${user?.firstName} ${user?.lastName}`}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}

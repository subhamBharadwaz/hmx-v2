import * as React from "react"
import {
  Alert as AlertContainer,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { title } from "process"

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  className?: string
  variant: "default" | "destructive" | "success"
}

const Alert: React.FC<AlertProps> = ({ className, variant,title,description, ...props }) => {
  return (
    <AlertContainer {...props} variant={variant}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {description}
      </AlertDescription>
    </AlertContainer>
  )
}

export default Alert

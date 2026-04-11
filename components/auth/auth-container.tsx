import { cn } from "@/lib/utils"
import { Social } from "@/components/auth/social"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

interface AuthContainerProps extends React.ComponentProps<typeof Card> {
  className?: string
  headerLabel: string
  subHeaderLabel: string
  backHref: string
  backLabel: string
}

export function AuthContainer({
  className,
  headerLabel,
  subHeaderLabel,
  backHref,
  backLabel,
  ...props
}: AuthContainerProps) {
  return (
    <Card
      className={cn(
        "z-10 w-88 rounded border border-none bg-transparent shadow-none ring-0 outline-none dark:backdrop-blur-xs",
        className
      )}
      {...props}
    >
      <CardHeader>
        <div className="flex w-full flex-col items-center justify-center gap-y-1 text-center text-card-foreground">
          <div className="relative h-10 w-10 shrink-0">
            <Image
              src="/logo.png"
              alt="logo"
              fill
              className="object-contain dark:invert"
              priority
            />
          </div>
          <p className="text-xl font-light">{headerLabel}</p>
          <p className="text-center text-xs font-medium text-muted-foreground">
            {subHeaderLabel}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex w-full items-center justify-center gap-3">
          <Social />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <Link
            className="text-xs font-medium text-muted-foreground hover:text-accent-foreground"
            href={backHref}
          >
            {backLabel}
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

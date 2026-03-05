import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>AY</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Ahmet Yılmaz</p>
          <p className="text-sm text-muted-foreground">
            ahmet@ornek.com
          </p>
        </div>
        <div className="ml-auto font-medium">+₺1,999.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>MK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Mehmet Kaya</p>
          <p className="text-sm text-muted-foreground">mehmet@ornek.com</p>
        </div>
        <div className="ml-auto font-medium">+₺39.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Ayşe Demir</p>
          <p className="text-sm text-muted-foreground">
            ayse@ornek.com
          </p>
        </div>
        <div className="ml-auto font-medium">+₺299.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>FO</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Fatma Öztürk</p>
          <p className="text-sm text-muted-foreground">fatma@ornek.com</p>
        </div>
        <div className="ml-auto font-medium">+₺99.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Ali Can</p>
          <p className="text-sm text-muted-foreground">ali@ornek.com</p>
        </div>
        <div className="ml-auto font-medium">+₺39.00</div>
      </div>
    </div>
  )
}

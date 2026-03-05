import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Trash2, Mail } from "lucide-react"

const users = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    email: "ahmet@sirket.com",
    role: "Admin",
    status: "active",
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: "2",
    name: "Ayşe Demir",
    email: "ayse@sirket.com",
    role: "User",
    status: "active",
    avatar: ""
  },
  {
    id: "3",
    name: "Mehmet Kaya",
    email: "mehmet@sirket.com",
    role: "Viewer",
    status: "pending",
    avatar: ""
  }
]

export function UserSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Kullanıcılar</h3>
          <p className="text-sm text-muted-foreground">
            Ekip arkadaşlarınızı yönetin ve yetkilendirin.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Kullanıcı Davet Et
        </Button>
      </div>
      
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Avatar</TableHead>
              <TableHead>Ad Soyad</TableHead>
              <TableHead>E-posta</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                    {user.status === 'active' ? 'Aktif' : 'Davet Edildi'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {user.status === 'pending' && (
                      <Button variant="ghost" size="icon" title="Tekrar Davet Et">
                        <Mail className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

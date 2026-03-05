import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CreateContactDialog } from './components/CreateContactDialog'
import { Contact } from '@/types/contact'
import { contactService } from '@/services/contactService'

export default function ContactsList() {
  const queryClient = useQueryClient()

  const { data: contacts, isLoading, error } = useQuery({
    queryKey: ['contacts'],
    queryFn: contactService.getAll
  })

  const createContactMutation = useMutation({
    mutationFn: contactService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
    }
  })

  const handleCreateContact = (data: any) => {
    const newContact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'> = {
      name: data.name,
      type: data.type,
      taxNumber: data.taxNumber,
      email: data.email,
      balance: 0,
      currency: "TRY",
      status: "active",
      // Add other fields if necessary or make them optional in type
      phone: data.phone,
      address: data.address
    }
    createContactMutation.mutate(newContact)
  }

  if (isLoading) return <div>Yükleniyor...</div>
  if (error) return <div>Hata oluştu: {error.message}</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Cari Hesaplar</h2>
        <CreateContactDialog onContactCreated={handleCreateContact} />
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableCaption>Müşteri ve tedarikçi listesi.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Firma / Kişi Adı</TableHead>
              <TableHead>Tip</TableHead>
              <TableHead>Vergi No</TableHead>
              <TableHead>E-posta</TableHead>
              <TableHead className="text-right">Bakiye</TableHead>
              <TableHead className="text-center">Durum</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts?.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="font-medium">{contact.name}</TableCell>
                <TableCell>
                  <Badge variant={contact.type === 'customer' ? 'default' : contact.type === 'supplier' ? 'secondary' : 'outline'}>
                    {contact.type === 'customer' ? 'Müşteri' : contact.type === 'supplier' ? 'Tedarikçi' : 'Müşteri & Tedarikçi'}
                  </Badge>
                </TableCell>
                <TableCell>{contact.taxNumber || '-'}</TableCell>
                <TableCell>{contact.email || '-'}</TableCell>
                <TableCell className={`text-right font-medium ${contact.balance > 0 ? 'text-green-600' : contact.balance < 0 ? 'text-red-600' : ''}`}>
                  {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: contact.currency }).format(contact.balance)}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={contact.status === 'active' ? 'outline' : 'destructive'} className={contact.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : ''}>
                    {contact.status === 'active' ? 'Aktif' : 'Pasif'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompanySettings } from "./components/CompanySettings"
import { UserSettings } from "./components/UserSettings"
import { SubscriptionSettings } from "./components/SubscriptionSettings"

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Ayarlar</h2>
      </div>
      
      <Tabs defaultValue="company" className="space-y-4">
        <TabsList>
          <TabsTrigger value="company">Firma Bilgileri</TabsTrigger>
          <TabsTrigger value="users">Kullanıcılar</TabsTrigger>
          <TabsTrigger value="subscription">Abonelik</TabsTrigger>
        </TabsList>
        
        <TabsContent value="company" className="space-y-4">
          <CompanySettings />
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <UserSettings />
        </TabsContent>
        
        <TabsContent value="subscription" className="space-y-4">
          <SubscriptionSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

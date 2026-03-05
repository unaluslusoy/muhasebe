import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { name: "Oca", total: 12500 },
  { name: "Şub", total: 15000 },
  { name: "Mar", total: 18000 },
  { name: "Nis", total: 14000 },
  { name: "May", total: 21000 },
  { name: "Haz", total: 25000 },
  { name: "Tem", total: 22000 },
  { name: "Ağu", total: 28000 },
  { name: "Eyl", total: 32000 },
  { name: "Eki", total: 30000 },
  { name: "Kas", total: 35000 },
  { name: "Ara", total: 42000 },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₺${value / 1000}k`}
        />
        <Tooltip 
          cursor={{ fill: 'transparent' }}
          formatter={(value: number) => [`₺${value}`, 'Gelir']}
          contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
        />
        <Bar dataKey="total" fill="#00DF81" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

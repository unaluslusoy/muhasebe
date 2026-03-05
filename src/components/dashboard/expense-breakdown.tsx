import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Kira", value: 15000, color: "#0088FE" },
  { name: "Personel", value: 45000, color: "#00C49F" },
  { name: "Vergi", value: 12000, color: "#FFBB28" },
  { name: "Ofis", value: 3500, color: "#FF8042" },
  { name: "Diğer", value: 2000, color: "#8884d8" },
]

export function ExpenseBreakdown() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(value)}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

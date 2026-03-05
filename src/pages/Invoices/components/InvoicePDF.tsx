import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import { Invoice } from '@/types/invoice'

// Register fonts
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
})

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: 'column',
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  titleContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  reportTitle: {
    color: '#111',
    letterSpacing: 4,
    fontSize: 25,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  invoiceNoContainer: {
    flexDirection: 'row',
    marginTop: 36,
    justifyContent: 'flex-end',
  },
  invoiceDateContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  invoiceDate: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  label: {
    width: 60,
  },
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: 'Helvetica-Oblique',
  },
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#bff0fd',
  },
  container: {
    flexDirection: 'row',
    borderBottomColor: '#bff0fd',
    backgroundColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    flexGrow: 1,
  },
  description: {
    width: '60%',
    borderRightColor: '#bff0fd',
    borderRightWidth: 1,
  },
  qty: {
    width: '10%',
    borderRightColor: '#bff0fd',
    borderRightWidth: 1,
  },
  rate: {
    width: '15%',
    borderRightColor: '#bff0fd',
    borderRightWidth: 1,
  },
  amount: {
    width: '15%',
  },
  row: {
    flexDirection: 'row',
    borderBottomColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 36,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingRight: 10,
  },
  totalValue: {
    fontSize: 12,
    fontWeight: 'bold',
    width: 100,
    textAlign: 'right',
  },
})

interface InvoicePDFProps {
  invoice: Invoice
}

export const InvoicePDF = ({ invoice }: InvoicePDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.titleContainer}>
        <View style={{ flexDirection: 'column', width: '50%' }}>
          <Text style={styles.reportTitle}>FATURA</Text>
        </View>
        <View style={{ flexDirection: 'column', width: '50%', alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Örnek Teknoloji A.Ş.</Text>
          <Text>Fenerbahçe Mah. Bağdat Cad.</Text>
          <Text>No:123 Kadıköy/İstanbul</Text>
          <Text>V.D.: Kadıköy - V.No: 1234567890</Text>
        </View>
      </View>

      <View style={styles.headerContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'column', width: '50%' }}>
            <Text style={styles.billTo}>Sayın:</Text>
            <Text>{invoice.contactName}</Text>
            <Text>Müşteri Adresi Buraya Gelecek</Text>
          </View>
          <View style={{ flexDirection: 'column', width: '50%', alignItems: 'flex-end' }}>
            <Text>Fatura No: {invoice.number}</Text>
            <Text>Tarih: {invoice.issueDate}</Text>
            <Text>Vade: {invoice.dueDate}</Text>
          </View>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.container}>
          <Text style={styles.description}>Açıklama</Text>
          <Text style={styles.qty}>Miktar</Text>
          <Text style={styles.rate}>Birim Fiyat</Text>
          <Text style={styles.amount}>Tutar</Text>
        </View>
        {invoice.items.map((item, i) => (
          <View style={styles.row} key={i}>
            <Text style={{ ...styles.description, textAlign: 'left', paddingLeft: 8 }}>{item.productName}</Text>
            <Text style={{ ...styles.qty, textAlign: 'center' }}>{item.quantity}</Text>
            <Text style={{ ...styles.rate, textAlign: 'right', paddingRight: 8 }}>
              {new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2 }).format(item.unitPrice)}
            </Text>
            <Text style={{ ...styles.amount, textAlign: 'right', paddingRight: 8 }}>
              {new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2 }).format(item.total)}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.totalContainer}>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row', marginBottom: 4 }}>
            <Text style={styles.totalLabel}>Ara Toplam:</Text>
            <Text style={styles.totalValue}>
              {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: invoice.currency }).format(invoice.subtotal)}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 4 }}>
            <Text style={styles.totalLabel}>KDV Toplam:</Text>
            <Text style={styles.totalValue}>
              {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: invoice.currency }).format(invoice.taxTotal)}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#000', paddingTop: 4 }}>
            <Text style={styles.totalLabel}>Genel Toplam:</Text>
            <Text style={styles.totalValue}>
              {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: invoice.currency }).format(invoice.total)}
            </Text>
          </View>
        </View>
      </View>

      {invoice.notes && (
        <View style={{ marginTop: 40 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Notlar:</Text>
          <Text>{invoice.notes}</Text>
        </View>
      )}
    </Page>
  </Document>
)

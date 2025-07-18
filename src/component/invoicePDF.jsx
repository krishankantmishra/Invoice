import React from "react";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 10 },
  header: { fontSize: 20, marginBottom: 20, fontWeight: "bold" },
  label: { fontSize: 12, fontWeight: "bold" },
  value: { fontSize: 12 },
  table: { marginTop: 10 },
  row: { flexDirection: "row", borderBottom: "1px solid #eee", padding: 5 },
  cell: { flex: 1, fontSize: 12 }
});

// PDF Document Component
const InvoiceDocument = ({ invoice }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Invoice #{invoice.id}</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Client:</Text>
        <Text style={styles.value}>{invoice.clientName}</Text>
        <Text style={styles.value}>{invoice.billTo.streetAddress}, {invoice.billTo.city}</Text>
        <Text style={styles.value}>{invoice.billTo.country}, {invoice.billTo.pinCode}</Text>
        <Text style={styles.value}>Email: {invoice.billTo.clientEmail}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Project:</Text>
        <Text style={styles.value}>{invoice.aboutProject}</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cell}>Item</Text>
          <Text style={styles.cell}>Qty</Text>
          <Text style={styles.cell}>Price</Text>
          <Text style={styles.cell}>Total</Text>
        </View>
        {invoice.items.map((item, idx) => (
          <View style={styles.row} key={idx}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.quantity}</Text>
            <Text style={styles.cell}>₹{item.price.toFixed(2)}</Text>
            <Text style={styles.cell}>₹{(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Amount Due: ₹{invoice.amount?.toFixed(2) || "0.00"}</Text>
      </View>
    </Page>
  </Document>
);

// Main Component
const InvoicePdf = ({ invoice }) => (
  <div>
    <PDFDownloadLink
      document={<InvoiceDocument invoice={invoice} />}
      fileName={`Invoice_${invoice.id}.pdf`}
    >
      {({ loading }) => (loading ? "Generating PDF..." : "Download PDF")}
    </PDFDownloadLink>
  </div>
);

export default InvoicePdf;
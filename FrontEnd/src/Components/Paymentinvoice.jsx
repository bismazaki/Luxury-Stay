import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { Download } from "@mui/icons-material";

const InvoiceHistory = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token"); // Token from login

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get("http://localhost:2000/api/billing/my-invoices", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInvoices(res.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [token]);
  const downloadInvoice = async (invoiceId) => {
    if (!invoiceId) {
        console.error("Invalid Invoice ID");
        return;
    }

    try {
        const response = await axios.get(`http://localhost:2000/api/billing/invoice/download/${invoiceId}`, {
            responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `invoice-${invoiceId}.pdf`);
        document.body.appendChild(link);
        link.click();
    } catch (error) {
        console.error("Error downloading invoice:", error.response ? error.response.data : error.message);
    }
};
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        My Invoice History
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", mx: "auto", mt: 3 }} />
      ) : invoices.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center">
          No invoices found.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 3, overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell><strong>Invoice ID</strong></TableCell>
                <TableCell><strong>Total Amount</strong></TableCell>
                <TableCell><strong>Payment Mode</strong></TableCell>
                <TableCell><strong>Dowmload</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice._id}>
                  <TableCell>{invoice.InvoiceId}</TableCell>
                  <TableCell>${invoice.TotalAmount}</TableCell>
                  <TableCell>{invoice.PaymentMode}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Download />}
                      onClick={() => downloadInvoice(invoice._id)}
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default InvoiceHistory;

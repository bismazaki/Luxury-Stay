import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Container, CircularProgress } from "@mui/material";
import { Download } from "@mui/icons-material";

const BillingManagement = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPayments = async () => {
        try {
            const token = localStorage.getItem("token_admin");
            const response = await axios.get("http://localhost:2000/api/billing/all", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPayments(response.data);
        } catch (error) {
            console.error("Error fetching payments:", error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };

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

    useEffect(() => {
        fetchPayments();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: "#1976d2" }}>
                Billing & Transactions
            </Typography>
            {loading ? (
                <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
            ) : (
                <TableContainer component={Paper} sx={{ overflowX: "auto", boxShadow: 3, borderRadius: 2 }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#1976d2" }}>
                            <TableRow>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Invoice ID</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Guest Name</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Total Amount</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Payment Mode</TableCell>
                                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Download</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {payments.map((payment) => (
                                <TableRow key={payment._id} hover>
                                    <TableCell>{payment.InvoiceId}</TableCell>
                                    <TableCell>{payment.GuestId?.name || "N/A"}</TableCell>
                                    <TableCell>${payment.TotalAmount}</TableCell>
                                    <TableCell>{payment.PaymentMode}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            startIcon={<Download />} 
                                            onClick={() => downloadInvoice(payment._id)}
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

export default BillingManagement;

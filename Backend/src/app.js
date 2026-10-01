const express = require("express");
const cors = require("cors");

const materialRoutes = require("./routes/material_routes");
const warehouseRoutes = require("./routes/warehouse_routes");
const suppliersRoutes = require("./routes/suppliers_routes");
const customersRoutes = require("./routes/customers_routes");
const usersRoutes = require("./routes/users_routes");
const stockRoutes = require("./routes/stock_routes");
const purchase_invoices_Routes = require("./routes/purchaseInvoices_routes");
const purchase_invoices_items_Routes = require("./routes/Purchase_Invoice_Items_routes");
const companyRoutes = require("./routes/company_routes");
const sales_invoices_Routes = require("./routes/salesInvoices_routes");
const sales_invoices_items_Routes = require("./routes/sales_Invoice_Items_routes");
const reportsRoutes = require("./routes/reports_routes");
const dashboardRoutes = require("./routes/dashboard_routes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/materials", materialRoutes);
app.use("/api/warehouse", warehouseRoutes);
app.use("/api/suppliers", suppliersRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/purchase_invoice", purchase_invoices_Routes);
app.use("/api/purchase_invoice_items", purchase_invoices_items_Routes);
app.use("/api/company", companyRoutes);
app.use("/api/sales_invoice", sales_invoices_Routes);
app.use("/api/sales_invoice_items", sales_invoices_items_Routes);
app.use("/api/reports", reportsRoutes);
app.use("/api/dashboard", dashboardRoutes);


module.exports = app;
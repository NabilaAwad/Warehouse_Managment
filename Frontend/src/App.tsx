import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout";

import Dashboard from "./pages/Dashboard/dashboard";
import Materials from "./pages/Materials/materials";
import Warehouses from "./pages/Warehouses/warehouse";
import Customers from "./pages/Customers/customers";
import Suppliers from "./pages/Suppliers/suppliers";
import Users from "./pages/Users/user";
import Stock from "./pages/Stock/stock";
import PurchaseInvoices from "./pages/PurchaseInvoices/purchaseinvoices";
import SalesInvoices from "./pages/SalesInvoicse/salesInvoice";
import Reports from "./pages/Reports/reports";
import SalesInvoice from "./pages/SalesInvoicse/salesInvoice";
import { Warehouse } from "lucide-react";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/materials"
            element={<Materials />}
          />

          <Route
            path="/warehouses"
            element={<Warehouses />}
          />

          <Route
            path="/customers"
            element={<Customers />}
          />

          <Route
            path="/suppliers"
            element={<Suppliers />}
          />

          <Route
            path="/users"
            element={<Users />}
          />

          <Route
            path="/stock"
            element={<Stock />}
          />

          <Route
            path="/purchase-invoices"
            element={<PurchaseInvoices />}
          />

          <Route
            path="/sales-invoices"
            element={<SalesInvoice />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
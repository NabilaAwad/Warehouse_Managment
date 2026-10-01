import { useEffect, useState } from "react";

import {
  getInventoryReport,
  getItemMovementReport,
  getPurchaseInvoicesReport,
  getSalesInvoicesReport,
  getBestSellingMaterialsReport,
  getMostAvailableMaterialsReport,
  getMaterialsWithBalanceReport,
  getMaterialsWithoutBalanceReport,
} from "../../services/reports_service";

type ReportType =
  | "inventory"
  | "item-movement"
  | "purchase-invoices"
  | "sales-invoices"
  | "best-selling"
  | "most-available"
  | "with-balance"
  | "without-balance";

type InventoryItem = {
  id: number;
  warehouse_name: string;
  material_name: string;
  quantity: number;
};

type ItemMovement = {
  material_id: number;
  material_name: string;
  purchased_quantity: number;
  sold_quantity: number;
};

type PurchaseInvoice = {
  id: number;
  supplier_name: string;
  warehouse_name: string;
  date: string;
};

type SalesInvoice = {
  id: number;
  customer_name: string;
  warehouse_name: string;
  date: string;
};

type MaterialReport = {
  material_id: number;
  material_name: string;
  sold_quantity?: number;
  available_quantity?: number;
  quantity?: number;
};

function Reports() {
  const [selectedReport, setSelectedReport] =
    useState<ReportType>("inventory");

  const [data, setData] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadReport();
  }, [selectedReport]);

  const loadReport = async () => {
    try {
      setLoading(true);
      setError("");

      let result;

      switch (selectedReport) {
        case "inventory":
          result = await getInventoryReport();
          break;

        case "item-movement":
          result = await getItemMovementReport();
          break;

        case "purchase-invoices":
          result = await getPurchaseInvoicesReport();
          break;

        case "sales-invoices":
          result = await getSalesInvoicesReport();
          break;

        case "best-selling":
          result = await getBestSellingMaterialsReport();
          break;

        case "most-available":
          result = await getMostAvailableMaterialsReport();
          break;

        case "with-balance":
          result = await getMaterialsWithBalanceReport();
          break;

        case "without-balance":
          result = await getMaterialsWithoutBalanceReport();
          break;
      }

      setData(result);
    } catch (error) {
      console.error(error);
      setError("Failed to load report");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const getReportTitle = () => {
    switch (selectedReport) {
      case "inventory":
        return "Inventory";

      case "item-movement":
        return "Item Movement";

      case "purchase-invoices":
        return "Purchase Invoices";

      case "sales-invoices":
        return "Sales Invoices";

      case "best-selling":
        return "Best Selling Materials";

      case "most-available":
        return "Most Available Materials";

      case "with-balance":
        return "Materials With Balance";

      case "without-balance":
        return "Materials Without Balance";
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Reports
      </h1>

      <div className="mb-6">
        <label className="mb-2 block font-medium">
          Select Report
        </label>

        <select
          value={selectedReport}
          onChange={(e) =>
            setSelectedReport(
              e.target.value as ReportType
            )
          }
          className="w-full max-w-md rounded-lg border px-4 py-2"
        >
          <option value="inventory">
            Inventory
          </option>

          <option value="item-movement">
            Item Movement
          </option>

          <option value="purchase-invoices">
            Purchase Invoices
          </option>

          <option value="sales-invoices">
            Sales Invoices
          </option>

          <option value="best-selling">
            Best Selling Materials
          </option>

          <option value="most-available">
            Most Available Materials
          </option>

          <option value="with-balance">
            Materials With Balance
          </option>

          <option value="without-balance">
            Materials Without Balance
          </option>
        </select>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">
            {getReportTitle()}
          </h2>
        </div>

        {loading ? (
          <div className="p-6 text-center">
            Loading...
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">
            {error}
          </div>
        ) : data.length === 0 ? (
          <div className="p-6 text-center">
            No data found.
          </div>
        ) : (
          <>
            {selectedReport === "inventory" && (
              <InventoryTable
                data={data as InventoryItem[]}
              />
            )}

            {selectedReport === "item-movement" && (
              <ItemMovementTable
                data={data as ItemMovement[]}
              />
            )}

            {selectedReport === "purchase-invoices" && (
              <PurchaseInvoicesTable
                data={data as PurchaseInvoice[]}
              />
            )}

            {selectedReport === "sales-invoices" && (
              <SalesInvoicesTable
                data={data as SalesInvoice[]}
              />
            )}

            {selectedReport === "best-selling" && (
              <MaterialReportTable
                data={data as MaterialReport[]}
                valueKey="sold_quantity"
                valueTitle="Sold Quantity"
              />
            )}

            {selectedReport === "most-available" && (
              <MaterialReportTable
                data={data as MaterialReport[]}
                valueKey="available_quantity"
                valueTitle="Available Quantity"
              />
            )}

            {selectedReport === "with-balance" && (
              <MaterialReportTable
                data={data as MaterialReport[]}
                valueKey="quantity"
                valueTitle="Quantity"
              />
            )}

            {selectedReport === "without-balance" && (
              <MaterialReportTable
                data={data as MaterialReport[]}
                valueKey="quantity"
                valueTitle="Quantity"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}


// Inventory Table

function InventoryTable({
  data,
}: {
  data: InventoryItem[];
}) {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-3">#</th>
          <th className="p-3">Warehouse</th>
          <th className="p-3">Material</th>
          <th className="p-3">Quantity</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item, index) => (
          <tr
            key={item.id}
            className="border-t"
          >
            <td className="p-3">
              {index + 1}
            </td>

            <td className="p-3">
              {item.warehouse_name}
            </td>

            <td className="p-3">
              {item.material_name}
            </td>

            <td className="p-3">
              {item.quantity}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


// Item Movement Table

function ItemMovementTable({
  data,
}: {
  data: ItemMovement[];
}) {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-3">#</th>
          <th className="p-3">Material</th>
          <th className="p-3">
            Purchased Quantity
          </th>
          <th className="p-3">
            Sold Quantity
          </th>
        </tr>
      </thead>

      <tbody>
        {data.map((item, index) => (
          <tr
            key={item.material_id}
            className="border-t"
          >
            <td className="p-3">
              {index + 1}
            </td>

            <td className="p-3">
              {item.material_name}
            </td>

            <td className="p-3">
              {item.purchased_quantity}
            </td>

            <td className="p-3">
              {item.sold_quantity}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


// Purchase Invoices Table

function PurchaseInvoicesTable({
  data,
}: {
  data: PurchaseInvoice[];
}) {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-3">#</th>
          <th className="p-3">Supplier</th>
          <th className="p-3">Warehouse</th>
          <th className="p-3">Date</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr
            key={item.id}
            className="border-t"
          >
            <td className="p-3">
              {item.id}
            </td>

            <td className="p-3">
              {item.supplier_name}
            </td>

            <td className="p-3">
              {item.warehouse_name}
            </td>

            <td className="p-3">
              {item.date}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


// Sales Invoices Table

function SalesInvoicesTable({
  data,
}: {
  data: SalesInvoice[];
}) {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-3">#</th>
          <th className="p-3">Customer</th>
          <th className="p-3">Warehouse</th>
          <th className="p-3">Date</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr
            key={item.id}
            className="border-t"
          >
            <td className="p-3">
              {item.id}
            </td>

            <td className="p-3">
              {item.customer_name}
            </td>

            <td className="p-3">
              {item.warehouse_name}
            </td>

            <td className="p-3">
              {item.date}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


// Materials Reports Table

function MaterialReportTable({
  data,
  valueKey,
  valueTitle,
}: {
  data: MaterialReport[];
  valueKey:
    | "sold_quantity"
    | "available_quantity"
    | "quantity";
  valueTitle: string;
}) {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-3">#</th>
          <th className="p-3">Material</th>
          <th className="p-3">
            {valueTitle}
          </th>
        </tr>
      </thead>

      <tbody>
        {data.map((item, index) => (
          <tr
            key={item.material_id}
            className="border-t"
          >
            <td className="p-3">
              {index + 1}
            </td>

            <td className="p-3">
              {item.material_name}
            </td>

            <td className="p-3">
              {item[valueKey]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Reports;
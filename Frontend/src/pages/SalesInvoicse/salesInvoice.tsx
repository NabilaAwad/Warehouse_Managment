
import { useEffect, useState } from "react";

import { getCustomers } from "../../services/customers_service";
import { getWarehouse } from "../../services/warehouse_service";
import { getMaterials } from "../../services/materials_service";
import { getStock } from "../../services/stock_service";

import {
  getSalesInvoices,
  createSalesInvoice,
  deleteSalesInvoice,
} from "../../services/sales_invoice_service";

type Customer = {
  id: number;
  name: string;
};

type Warehouse = {
  id: number;
  name: string;
};

type Material = {
  id: number;
  name: string;
};

type Stock = {
  id: number;
  warehouse_id: number;
  material_id: number;
  quantity: number;
};

type SalesInvoice = {
  id: number;
  customer_id: number;
  warehouse_id: number;
  date: string;
};

type InvoiceItem = {
  material_id: string;
  quantity: string;
  price: string;
};

function SalesInvoices() {
  const [showForm, setShowForm] = useState(false);

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [stock, setStock] = useState<Stock[]>([]);

  const [salesInvoices, setSalesInvoices] = useState<
    SalesInvoice[]
  >([]);

  const [customerId, setCustomerId] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  const [date, setDate] = useState("");

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      material_id: "",
      quantity: "",
      price: "",
    },
  ]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        customerData,
        warehouseData,
        materialData,
        invoiceData,
        stockData,
      ] = await Promise.all([
        getCustomers(),
        getWarehouse(),
        getMaterials(),
        getSalesInvoices(),
        getStock(),
      ]);

      setCustomers(customerData);
      setWarehouses(warehouseData);
      setMaterials(materialData);
      setSalesInvoices(invoiceData);
      setStock(stockData);
    } catch (error) {
      console.error(error);
      setError("Failed to load sales invoice data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        material_id: "",
        quantity: "",
        price: "",
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length === 1) {
      return;
    }

    setItems(
      items.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: string
  ) => {
    const updatedItems = [...items];

    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };

    setItems(updatedItems);
  };

  const calculateItemTotal = (item: InvoiceItem) => {
    const quantity = Number(item.quantity);
    const price = Number(item.price);

    return quantity * price;
  };

  const calculateInvoiceTotal = () => {
    return items.reduce((total, item) => {
      return total + calculateItemTotal(item);
    }, 0);
  };

  const validateForm = () => {
    if (!customerId) {
      setError("Please select a customer");
      return false;
    }

    if (!warehouseId) {
      setError("Please select a warehouse");
      return false;
    }

    if (!date) {
      setError("Please select the invoice date");
      return false;
    }

    if (items.length === 0) {
      setError("Please add at least one item");
      return false;
    }

    for (const item of items) {
      if (!item.material_id) {
        setError("Please select a material for all items");
        return false;
      }

      if (!item.quantity || Number(item.quantity) <= 0) {
        setError("Quantity must be greater than 0");
        return false;
      }

      if (!item.price || Number(item.price) < 0) {
        setError("Price must be 0 or greater");
        return false;
      }
    }

    return true;
  };

  const handleSave = async () => {
    setError("");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    // Check available stock before sending the request
    for (const item of items) {
      const availableStock = stock.find(
        (stockItem) =>
          stockItem.warehouse_id === Number(warehouseId) &&
          stockItem.material_id === Number(item.material_id)
      );

      const availableQuantity = availableStock
        ? Number(availableStock.quantity)
        : 0;

      if (Number(item.quantity) > availableQuantity) {
        setError(
          `Available stock for this material is ${availableQuantity}.`
        );
        return;
      }
    }

    try {
      setSaving(true);

      const invoice = await createSalesInvoice(
        Number(customerId),
        Number(warehouseId),
        date,
        items.map((item) => ({
          material_id: Number(item.material_id),
          quantity: Number(item.quantity),
          price: Number(item.price),
        }))
      );

      console.log("Created sales invoice:", invoice);

      await loadData();

      handleCancel();
    } catch (error) {
      console.error(error);
      setError("Failed to save sales invoice");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this sales invoice?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteSalesInvoice(id);

      await loadData();
    } catch (error) {
      console.error(error);
      setError("Failed to delete sales invoice");
    }
  };

  const handleCancel = () => {
    setCustomerId("");
    setWarehouseId("");
    setDate("");

    setItems([
      {
        material_id: "",
        quantity: "",
        price: "",
      },
    ]);

    setError("");
    setShowForm(false);
  };

  const getCustomerName = (id: number) => {
    const customer = customers.find(
      (customer) => customer.id === id
    );

    return customer ? customer.name : "Unknown";
  };

  const getWarehouseName = (id: number) => {
    const warehouse = warehouses.find(
      (warehouse) => warehouse.id === id
    );

    return warehouse ? warehouse.name : "Unknown";
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Sales Invoices
        </h1>

        <p className="mt-1 text-gray-500">
          Manage sales invoices and their items
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Sales Invoices
          </h2>

          <button
            onClick={() => {
              setError("");
              setShowForm(true);
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            + New Invoice
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
          </div>
        ) : (
          <>
            {/* New Invoice Form */}
            {showForm && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800">
                  New Sales Invoice
                </h3>

                {/* Invoice Information */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {/* Customer */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Customer
                    </label>

                    <select
                      value={customerId}
                      onChange={(e) =>
                        setCustomerId(e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                    >
                      <option value="">
                        Select customer
                      </option>

                      {customers.map((customer) => (
                        <option
                          key={customer.id}
                          value={customer.id}
                        >
                          {customer.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Warehouse */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Warehouse
                    </label>

                    <select
                      value={warehouseId}
                      onChange={(e) =>
                        setWarehouseId(e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                    >
                      <option value="">
                        Select warehouse
                      </option>

                      {warehouses.map((warehouse) => (
                        <option
                          key={warehouse.id}
                          value={warehouse.id}
                        >
                          {warehouse.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Date
                    </label>

                    <input
                      type="date"
                      value={date}
                      onChange={(e) =>
                        setDate(e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="mt-8">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Invoice Items
                    </h3>

                    <button
                      onClick={handleAddItem}
                      className="rounded-lg border border-blue-600 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
                    >
                      + Add Item
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 text-left text-sm text-gray-500">
                          <th className="px-3 py-3">
                            #
                          </th>

                          <th className="px-3 py-3">
                            Material
                          </th>

                          <th className="px-3 py-3">
                            Quantity
                          </th>

                          <th className="px-3 py-3">
                            Price
                          </th>

                          <th className="px-3 py-3">
                            Total
                          </th>

                          <th className="px-3 py-3">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {items.map((item, index) => (
                          <tr
                            key={index}
                            className="border-b border-gray-100"
                          >
                            {/* Number */}
                            <td className="px-3 py-3 text-sm text-gray-600">
                              {index + 1}
                            </td>

                            {/* Material */}
                            <td className="px-3 py-3">
                              <select
                                value={item.material_id}
                                onChange={(e) =>
                                  handleItemChange(
                                    index,
                                    "material_id",
                                    e.target.value
                                  )
                                }
                                className="w-full min-w-[180px] rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                              >
                                <option value="">
                                  Select material
                                </option>

                                {materials.map(
                                  (material) => (
                                    <option
                                      key={material.id}
                                      value={material.id}
                                    >
                                      {material.name}
                                    </option>
                                  )
                                )}
                              </select>
                            </td>

                            {/* Quantity */}
                            <td className="px-3 py-3">
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  handleItemChange(
                                    index,
                                    "quantity",
                                    e.target.value
                                  )
                                }
                                className="w-full min-w-[120px] rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                                placeholder="Quantity"
                              />
                            </td>

                            {/* Price */}
                            <td className="px-3 py-3">
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={item.price}
                                onChange={(e) =>
                                  handleItemChange(
                                    index,
                                    "price",
                                    e.target.value
                                  )
                                }
                                className="w-full min-w-[120px] rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                                placeholder="Price"
                              />
                            </td>

                            {/* Total */}
                            <td className="px-3 py-3 font-medium text-gray-800">
                              {calculateItemTotal(
                                item
                              ).toFixed(2)}
                            </td>

                            {/* Delete item */}
                            <td className="px-3 py-3">
                              <button
                                onClick={() =>
                                  handleRemoveItem(index)
                                }
                                disabled={
                                  items.length === 1
                                }
                                className="rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Invoice Total */}
                <div className="mt-6 flex justify-end">
                  <div className="rounded-lg bg-gray-50 px-6 py-4">
                    <div className="flex items-center gap-8">
                      <span className="font-semibold text-gray-700">
                        Invoice Total
                      </span>

                      <span className="text-xl font-bold text-gray-800">
                        {calculateInvoiceTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Save Invoice"}
                  </button>

                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="rounded-lg border border-gray-300 px-5 py-2 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Invoice List */}
            {!showForm && (
              <div className="mt-6 overflow-x-auto">
                {salesInvoices.length === 0 ? (
                  <div className="py-12 text-center text-gray-500">
                    No sales invoices found.
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 text-left text-sm text-gray-500">
                        <th className="px-4 py-3">
                          #
                        </th>

                        <th className="px-4 py-3">
                          Customer
                        </th>

                        <th className="px-4 py-3">
                          Warehouse
                        </th>

                        <th className="px-4 py-3">
                          Date
                        </th>

                        <th className="px-4 py-3">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {salesInvoices.map(
                        (invoice, index) => (
                          <tr
                            key={invoice.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {index + 1}
                            </td>

                            <td className="px-4 py-3 text-sm font-medium text-gray-800">
                              {getCustomerName(
                                invoice.customer_id
                              )}
                            </td>

                            <td className="px-4 py-3 text-sm text-gray-600">
                              {getWarehouseName(
                                invoice.warehouse_id
                              )}
                            </td>

                            <td className="px-4 py-3 text-sm text-gray-600">
                              {invoice.date}
                            </td>

                            <td className="px-4 py-3">
                              <button
                                onClick={() =>
                                  handleDelete(
                                    invoice.id
                                  )
                                }
                                className="rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SalesInvoices;


import { useEffect, useState } from "react";

import { getSuppliers } from "../../services/suppliers_service";
import { getWarehouse } from "../../services/warehouse_service";
import { getMaterials } from "../../services/materials_service";

import {
  getPurchaseInvoices,
  createPurchaseInvoice,
  deletePurchaseInvoice,
} from "../../services/purchase_invoice_service";

import {
  createPurchaseInvoiceItem,
} from "../../services/purchase_invoice_items_service";

type Supplier = {
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

type PurchaseInvoice = {
  id: number;
  supplier_id: number;
  warehouse_id: number;
  date: string;
};

type InvoiceItem = {
  material_id: string;
  quantity: string;
  price: string;
};

function PurchaseInvoices() {
  const [showForm, setShowForm] = useState(false);

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [purchaseInvoices, setPurchaseInvoices] = useState<
    PurchaseInvoice[]
  >([]);

  const [supplierId, setSupplierId] = useState("");
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
        supplierData,
        warehouseData,
        materialData,
        invoiceData,
      ] = await Promise.all([
        getSuppliers(),
        getWarehouse(),
        getMaterials(),
        getPurchaseInvoices(),
      ]);

      setSuppliers(supplierData);
      setWarehouses(warehouseData);
      setMaterials(materialData);
      setPurchaseInvoices(invoiceData);
    } catch (error) {
      console.error(error);
      setError("Failed to load purchase invoice data.");
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
      items.filter(
        (_, itemIndex) => itemIndex !== index
      )
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

    if (error) {
      setError("");
    }
  };

  const calculateItemTotal = (
    item: InvoiceItem
  ) => {
    const quantity = Number(item.quantity);
    const price = Number(item.price);

    if (
      !Number.isFinite(quantity) ||
      !Number.isFinite(price)
    ) {
      return 0;
    }

    return quantity * price;
  };

  const calculateInvoiceTotal = () => {
    return items.reduce(
      (total, item) =>
        total + calculateItemTotal(item),
      0
    );
  };

  const validateForm = () => {
    setError("");

    if (!supplierId) {
      setError("Supplier is required.");
      return false;
    }

    if (!warehouseId) {
      setError("Warehouse is required.");
      return false;
    }

    if (!date) {
      setError("Invoice date is required.");
      return false;
    }

    if (items.length === 0) {
      setError("Please add at least one item.");
      return false;
    }

    const selectedMaterials = new Set<number>();

    for (const item of items) {
      if (!item.material_id) {
        setError(
          "Material is required for all items."
        );
        return false;
      }

      const materialId = Number(
        item.material_id
      );

      if (selectedMaterials.has(materialId)) {
        setError(
          "The same material cannot be added more than once."
        );
        return false;
      }

      selectedMaterials.add(materialId);

      if (!item.quantity.trim()) {
        setError("Quantity is required.");
        return false;
      }

      const quantity = Number(item.quantity);

      if (
        !Number.isFinite(quantity) ||
        quantity <= 0
      ) {
        setError(
          "Quantity must be a number greater than 0."
        );
        return false;
      }

      if (!item.price.trim()) {
        setError("Price is required.");
        return false;
      }

      const price = Number(item.price);

      if (
        !Number.isFinite(price) ||
        price < 0
      ) {
        setError(
          "Price must be a number 0 or greater."
        );
        return false;
      }
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      // Create invoice header
      const invoice =
        await createPurchaseInvoice(
          Number(supplierId),
          Number(warehouseId),
          date
        );

      // Create invoice items
      for (const item of items) {
        await createPurchaseInvoiceItem(
          invoice.id,
          Number(item.material_id),
          Number(item.quantity),
          Number(item.price)
        );
      }

      await loadData();

      handleCancel();
    } catch (error) {
      console.error(error);
      setError(
        "Failed to save purchase invoice."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this purchase invoice?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      await deletePurchaseInvoice(id);

      await loadData();
    } catch (error) {
      console.error(error);
      setError(
        "Failed to delete purchase invoice."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setSupplierId("");
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

  const handleOpenForm = () => {
    setSupplierId("");
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
    setShowForm(true);
  };

  const getSupplierName = (id: number) => {
    const supplier = suppliers.find(
      (supplier) => supplier.id === id
    );

    return supplier
      ? supplier.name
      : "Unknown";
  };

  const getWarehouseName = (id: number) => {
    const warehouse = warehouses.find(
      (warehouse) => warehouse.id === id
    );

    return warehouse
      ? warehouse.name
      : "Unknown";
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Purchase Invoices
        </h1>

        <p className="mt-1 text-gray-500">
          Manage purchase invoices and their items
        </p>
      </div>

      <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Purchase Invoices
          </h2>

          <button
            type="button"
            onClick={handleOpenForm}
            disabled={saving}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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
                  New Purchase Invoice
                </h3>

                {/* Invoice Information */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {/* Supplier */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Supplier{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <select
                      value={supplierId}
                      onChange={(e) => {
                        setSupplierId(
                          e.target.value
                        );
                        setError("");
                      }}
                      disabled={saving}
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
                    >
                      <option value="">
                        Select supplier
                      </option>

                      {suppliers.map(
                        (supplier) => (
                          <option
                            key={supplier.id}
                            value={supplier.id}
                          >
                            {supplier.name}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* Warehouse */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Warehouse{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <select
                      value={warehouseId}
                      onChange={(e) => {
                        setWarehouseId(
                          e.target.value
                        );
                        setError("");
                      }}
                      disabled={saving}
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
                    >
                      <option value="">
                        Select warehouse
                      </option>

                      {warehouses.map(
                        (warehouse) => (
                          <option
                            key={warehouse.id}
                            value={warehouse.id}
                          >
                            {warehouse.name}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Date{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <input
                      type="date"
                      value={date}
                      onChange={(e) => {
                        setDate(
                          e.target.value
                        );
                        setError("");
                      }}
                      disabled={saving}
                      required
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="mt-8">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Invoice Items
                    </h3>

                    <button
                      type="button"
                      onClick={handleAddItem}
                      disabled={saving}
                      className="w-full rounded-lg border border-blue-600 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    >
                      + Add Item
                    </button>
                  </div>

                  <div className="overflow-x-auto rounded-lg border border-gray-100">
                    <table className="w-full min-w-[850px]">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm text-gray-500">
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
                        {items.map(
                          (item, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-100 last:border-b-0"
                            >
                              {/* Number */}
                              <td className="px-3 py-3 text-sm text-gray-600">
                                {index + 1}
                              </td>

                              {/* Material */}
                              <td className="px-3 py-3">
                                <select
                                  value={
                                    item.material_id
                                  }
                                  onChange={(e) =>
                                    handleItemChange(
                                      index,
                                      "material_id",
                                      e.target.value
                                    )
                                  }
                                  disabled={saving}
                                  required
                                  className="w-full min-w-[180px] rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
                                >
                                  <option value="">
                                    Select material
                                  </option>

                                  {materials.map(
                                    (material) => (
                                      <option
                                        key={
                                          material.id
                                        }
                                        value={
                                          material.id
                                        }
                                      >
                                        {
                                          material.name
                                        }
                                      </option>
                                    )
                                  )}
                                </select>
                              </td>

                              {/* Quantity */}
                              <td className="px-3 py-3">
                                <input
                                  type="number"
                                  min="0.01"
                                  step="any"
                                  value={
                                    item.quantity
                                  }
                                  onChange={(e) =>
                                    handleItemChange(
                                      index,
                                      "quantity",
                                      e.target.value
                                    )
                                  }
                                  disabled={saving}
                                  required
                                  className="w-full min-w-[120px] rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
                                  placeholder="Quantity"
                                />
                              </td>

                              {/* Price */}
                              <td className="px-3 py-3">
                                <input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={
                                    item.price
                                  }
                                  onChange={(e) =>
                                    handleItemChange(
                                      index,
                                      "price",
                                      e.target.value
                                    )
                                  }
                                  disabled={saving}
                                  required
                                  className="w-full min-w-[120px] rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
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
                                  type="button"
                                  onClick={() =>
                                    handleRemoveItem(
                                      index
                                    )
                                  }
                                  disabled={
                                    items.length ===
                                      1 ||
                                    saving
                                  }
                                  className="rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Invoice Total */}
                <div className="mt-6 flex justify-end">
                  <div className="w-full rounded-lg bg-gray-50 px-5 py-4 sm:w-auto sm:px-6">
                    <div className="flex items-center justify-between gap-8">
                      <span className="font-semibold text-gray-700">
                        Invoice Total
                      </span>

                      <span className="text-xl font-bold text-gray-800">
                        {calculateInvoiceTotal().toFixed(
                          2
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving
                      ? "Saving..."
                      : "Save Invoice"}
                  </button>

                  <button
                    type="button"
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
                {purchaseInvoices.length ===
                0 ? (
                  <div className="py-12 text-center text-gray-500">
                    No purchase invoices found.
                  </div>
                ) : (
                  <table className="w-full min-w-[700px]">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50 text-left text-sm text-gray-500">
                        <th className="px-4 py-3">
                          #
                        </th>

                        <th className="px-4 py-3">
                          Supplier
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
                      {purchaseInvoices.map(
                        (
                          invoice,
                          index
                        ) => (
                          <tr
                            key={invoice.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {index + 1}
                            </td>

                            <td className="px-4 py-3 text-sm font-medium text-gray-800">
                              {getSupplierName(
                                invoice.supplier_id
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
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    invoice.id
                                  )
                                }
                                disabled={saving}
                                className="rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
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

export default PurchaseInvoices;

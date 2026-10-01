
import { useEffect, useState } from "react";

import StockForm from "../../components/Stockcomponent/stockforms";

import {
  getStock,
  createStock,
  updateStock,
  deleteStock,
} from "../../services/stock_service";

import { getWarehouse } from "../../services/warehouse_service";
import { getMaterials } from "../../services/materials_service";

type Stock = {
  id: number;
  warehouse_id: number;
  material_id: number;
  quantity: number;
};

type Warehouse = {
  id: number;
  name: string;
};

type Material = {
  id: number;
  name: string;
};

function Stock() {
  const [stock, setStock] = useState<Stock[]>([]);

  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);

  const [warehouse_id, setWarehouseId] = useState("");
  const [material_id, setMaterialId] = useState("");
  const [quantity, setQuantity] = useState("");

  const [editingStockId, setEditingStockId] =
    useState<number | null>(null);

  const [showForm, setShowForm] = useState(false);

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

      const [stockData, warehouseData, materialData] =
        await Promise.all([
          getStock(),
          getWarehouse(),
          getMaterials(),
        ]);

      setStock(stockData);
      setWarehouses(warehouseData);
      setMaterials(materialData);
    } catch (error) {
      console.error(error);
      setError("Failed to load stock data.");
    } finally {
      setLoading(false);
    }
  };

  // Validation
  const validateStock = () => {
    setError("");

    if (!warehouse_id) {
      setError("Warehouse is required.");
      return false;
    }

    if (!material_id) {
      setError("Material is required.");
      return false;
    }

    if (!quantity.trim()) {
      setError("Quantity is required.");
      return false;
    }

    const numericQuantity = Number(quantity);

    if (isNaN(numericQuantity)) {
      setError("Quantity must be a valid number.");
      return false;
    }

    if (numericQuantity <= 0) {
      setError("Quantity must be greater than 0.");
      return false;
    }

    return true;
  };

  // Save
  const handleSave = async () => {
    if (!validateStock()) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (editingStockId !== null) {
        await updateStock(
          editingStockId,
          Number(warehouse_id),
          Number(material_id),
          Number(quantity),
        );
      } else {
        await createStock(
          Number(warehouse_id),
          Number(material_id),
          Number(quantity),
        );
      }

      await loadData();

      handleCancel();
    } catch (error) {
      console.error(error);
      setError("Failed to save stock.");
    } finally {
      setSaving(false);
    }
  };

  // Edit
  const handleEdit = (item: Stock) => {
    setWarehouseId(String(item.warehouse_id));
    setMaterialId(String(item.material_id));
    setQuantity(String(item.quantity));

    setEditingStockId(item.id);
    setError("");
    setShowForm(true);
  };

  // Delete
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this stock?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      await deleteStock(id);

      await loadData();
    } catch (error) {
      console.error(error);
      setError("Failed to delete stock.");
    } finally {
      setSaving(false);
    }
  };

  // Cancel / Reset
  const handleCancel = () => {
    setWarehouseId("");
    setMaterialId("");
    setQuantity("");

    setEditingStockId(null);
    setShowForm(false);
    setError("");
  };

  const getWarehouseName = (id: number) => {
    const warehouse = warehouses.find(
      (warehouse) => warehouse.id === id,
    );

    return warehouse ? warehouse.name : "Unknown";
  };

  const getMaterialName = (id: number) => {
    const material = materials.find(
      (material) => material.id === id,
    );

    return material ? material.name : "Unknown";
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Stock
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage warehouse stock
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            handleCancel();
            setShowForm(true);
          }}
          disabled={saving}
          className="w-full rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          + Add Stock
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <StockForm
          warehouse_id={warehouse_id}
          material_id={material_id}
          quantity={quantity}
          warehouses={warehouses}
          materials={materials}
          setWarehouseId={(value) => {
            setWarehouseId(value);
            setError("");
          }}
          setMaterialId={(value) => {
            setMaterialId(value);
            setError("");
          }}
          setQuantity={(value) => {
            setQuantity(value);
            setError("");
          }}
          onCancel={handleCancel}
          onSave={handleSave}
          saving={saving}
          isEditing={editingStockId !== null}
        />
      )}

      {/* Error */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
        </div>
      ) : (
        /* Table */
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
          <table className="w-full min-w-[750px]">
            <thead>
              <tr className="border-b bg-gray-50 text-left text-sm text-gray-600">
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Warehouse</th>
                <th className="px-6 py-4">Material</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {stock.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No stock found.
                  </td>
                </tr>
              ) : (
                stock.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b last:border-b-0"
                  >
                    <td className="px-6 py-4 text-gray-700">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {getWarehouseName(item.warehouse_id)}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {getMaterialName(item.material_id)}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {item.quantity}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          disabled={saving}
                          className="rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(item.id)
                          }
                          disabled={saving}
                          className="rounded-lg bg-red-100 px-3 py-1 text-sm text-red-700 hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Stock;

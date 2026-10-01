
type Warehouse = {
  id: number;
  name: string;
};

type Material = {
  id: number;
  name: string;
};

type StockFormProps = {
  warehouse_id: string;
  material_id: string;
  quantity: string;

  warehouses: Warehouse[];
  materials: Material[];

  setWarehouseId: (value: string) => void;
  setMaterialId: (value: string) => void;
  setQuantity: (value: string) => void;

  onCancel: () => void;
  onSave: () => void;

  saving: boolean;
  isEditing: boolean;
};

function StockForm({
  warehouse_id,
  material_id,
  quantity,
  warehouses,
  materials,
  setWarehouseId,
  setMaterialId,
  setQuantity,
  onCancel,
  onSave,
  saving,
  isEditing,
}: StockFormProps) {
  return (
    <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold text-gray-800">
        {isEditing ? "Edit Stock" : "Stock Information"}
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Warehouse */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Warehouse{" "}
            <span className="text-red-500">*</span>
          </label>

          <select
            value={warehouse_id}
            onChange={(e) =>
              setWarehouseId(e.target.value)
            }
            required
            disabled={saving}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
          >
            <option value="">Select warehouse</option>

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

        {/* Material */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Material{" "}
            <span className="text-red-500">*</span>
          </label>

          <select
            value={material_id}
            onChange={(e) =>
              setMaterialId(e.target.value)
            }
            required
            disabled={saving}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
          >
            <option value="">Select material</option>

            {materials.map((material) => (
              <option
                key={material.id}
                value={material.id}
              >
                {material.name}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Quantity{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value)
            }
            min="0.01"
            step="any"
            required
            disabled={saving}
            placeholder="Enter quantity"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="rounded-lg border border-gray-300 px-5 py-2 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : isEditing
              ? "Update Stock"
              : "Save Stock"}
        </button>
      </div>
    </div>
  );
}

export default StockForm;

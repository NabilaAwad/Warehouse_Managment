type WarehouseFormProps = {
  name: string;
  location: string;

  setName: (value: string) => void;
  setLocation: (value: string) => void;

  onCancel: () => void;
  onSave: () => void;

  saving: boolean;
  isEditing: boolean;
};

function WarehouseForm({
  name,
  location,
  setName,
  setLocation,
  onCancel,
  onSave,
  saving,
  isEditing,
}: WarehouseFormProps) {
  return (
    <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">
        {isEditing
          ? "Edit Warehouse"
          : "Add Warehouse"}
      </h3>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Warehouse Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Warehouse Name{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
            disabled={saving}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
            placeholder="Enter warehouse name"
          />
        </div>

        {/* Location */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Location{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            required
            disabled={saving}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
            placeholder="e.g. Midan, Barzeh, Daraa"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : isEditing
              ? "Update Warehouse"
              : "Save Warehouse"}
        </button>
      </div>
    </div>
  );
}

export default WarehouseForm;

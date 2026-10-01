
type MaterialFormProps = {
  name: string;
  unit: string;

  setName: (value: string) => void;
  setUnit: (value: string) => void;

  onCancel: () => void;
  onSave: () => void;

  saving: boolean;
  isEditing: boolean;
};

function MaterialForm({
  name,
  unit,
  setName,
  setUnit,
  onCancel,
  onSave,
  saving,
  isEditing,
}: MaterialFormProps) {
  return (
    <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">
        {isEditing ? "Edit Material" : "Add Material"}
      </h3>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Material Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Material Name{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={saving}
            placeholder="Enter material name"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
          />
        </div>

        {/* Unit */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Unit{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
            disabled={saving}
            placeholder="e.g. kg, piece, ton"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
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
              ? "Update Material"
              : "Save Material"}
        </button>
      </div>
    </div>
  );
}

export default MaterialForm;

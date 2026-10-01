type CompanyFormProps = {
  name: string;
  setName: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
};

function CompanyForm({
  name,
  setName,
  onCancel,
  onSave,
}: CompanyFormProps) {
  return (
    <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">Create Company</h3>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Company Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            placeholder="Enter material name"
          />
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          onClick={onSave}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default CompanyForm;

type CustomersFormProps = {
  name: string;
  phone: string;
  email: string;
  address: string;

  setName: (value: string) => void;
  setPhone: (value: string) => void;
  setEmail: (value: string) => void;
  setAddress: (value: string) => void;

  onCancel: () => void;
  onSave: () => void;
};

function CustomersForm({
  name,
  email,
  phone,
  address,
  setName,
  setEmail,
  setPhone,
  setAddress,
  onCancel,
  onSave,
}: CustomersFormProps) {
  return (
    <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">
        Add Customer
      </h3>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

        {/* Customer Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Customer Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            placeholder="Enter customer name"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Phone <span className="text-red-500">*</span>
          </label>

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            placeholder="e.g. +963 944 123 456"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            placeholder="e.g. customer@gmail.com"
          />
        </div>

        {/* Address */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Address <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
            placeholder="e.g. Damascus - Midan"
          />
        </div>

      </div>

      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onSave}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default CustomersForm;
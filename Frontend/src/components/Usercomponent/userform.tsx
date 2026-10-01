type UsersFormProps = {
  name: string;
  user_name: string;
  password: string;
  role: string;
  setName: (value: string) => void;
  setUserName: (value: string) => void;
  setPassword: (value: string) => void;
  setRole: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
  saving: boolean;
  isEditing: boolean;
};
function UserForm({
  name,
  user_name,
  password,
  role,
  setName,
  setUserName,
  setPassword,
  setRole,
  onCancel,
  onSave,
  saving,
  isEditing,
}: UsersFormProps) {
  return (
    <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
      {" "}
      <h3 className="text-lg font-semibold text-gray-800">
        {" "}
        {isEditing ? "Edit User" : "Add User"}{" "}
      </h3>{" "}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {" "}
        {/* Name */}{" "}
        <div>
          {" "}
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {" "}
            Name <span className="text-red-500">*</span>{" "}
          </label>{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter user name"
            required
            disabled={saving}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
          />{" "}
        </div>{" "}
        {/* Username */}{" "}
        <div>
          {" "}
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {" "}
            Username <span className="text-red-500">*</span>{" "}
          </label>{" "}
          <input
            type="text"
            value={user_name}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter username"
            required
            disabled={saving}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
          />{" "}
        </div>{" "}
        {/* Password */}{" "}
        <div>
          {" "}
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {" "}
            Password <span className="text-red-500">*</span>{" "}
          </label>{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isEditing ? "Enter new password" : "Enter password"}
            required
            disabled={saving}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
          />{" "}
          <p className="mt-1 text-xs text-gray-500">
            {" "}
            Minimum 6 characters{" "}
          </p>{" "}
        </div>{" "}
        {/* Role */}{" "}
        <div>
          {" "}
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {" "}
            Role <span className="text-red-500">*</span>{" "}
          </label>{" "}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            disabled={saving}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
          >
            {" "}
            <option value=""> Select role </option>{" "}
            <option value="owner"> Owner </option>{" "}
            <option value="manager"> Manager </option>{" "}
            <option value="accountant"> Accountant </option>{" "}
            <option value="warehouse_manager"> Warehouse Manager </option>{" "}
          </select>{" "}
        </div>{" "}
      </div>{" "}
      {/* Buttons */}{" "}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {" "}
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {" "}
          {saving ? "Saving..." : isEditing ? "Update User" : "Save User"}{" "}
        </button>{" "}
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {" "}
          Cancel{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
}
export default UserForm;

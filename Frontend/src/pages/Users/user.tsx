
import { useEffect, useState } from "react";

import UserForm from "../../components/Usercomponent/userform";

import {
  createusers,
  getUsers,
  Updateusers,
  deleteusers,
} from "../../services/user_service";

type User = {
  id: number;
  name: string;
  user_name: string;
  password: string;
  role: string;
  company_id: number | null;
  created_at: string;
};

function Users() {
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [users, setUsers] = useState<User[]>([]);

  const [editingUserId, setEditingUserId] =
    useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  // Get Users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getUsers();

        setUsers(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Validation
  const validateForm = () => {
    setError("");

    if (!name.trim()) {
      setError("Name is required.");
      return false;
    }

    if (!user_name.trim()) {
      setError("Username is required.");
      return false;
    }

    if (!password.trim()) {
      setError("Password is required.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    if (!role) {
      setError("Please select a role.");
      return false;
    }

    return true;
  };

  // Reset Form
  const resetForm = () => {
    setName("");
    setUserName("");
    setPassword("");
    setRole("");

    setEditingUserId(null);
    setShowForm(false);
    setError("");
  };

  // Create
  const handleCreateUser = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      const newUser = await createusers(
        name.trim(),
        user_name.trim(),
        password,
        role,
      );

      setUsers((prevUsers) => [
        ...prevUsers,
        newUser,
      ]);

      resetForm();
    } catch (error) {
      console.error(error);
      setError("Failed to create user.");
    } finally {
      setSaving(false);
    }
  };

  // Update
  const handleUpdateUser = async () => {
    if (editingUserId === null) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      const updatedUser = await Updateusers(
        editingUserId,
        name.trim(),
        user_name.trim(),
        password,
        role,
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUserId
            ? updatedUser
            : user,
        ),
      );

      resetForm();
    } catch (error) {
      console.error(error);
      setError("Failed to update user.");
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDeleteUser = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      await deleteusers(id);

      setUsers((prevUsers) =>
        prevUsers.filter(
          (user) => user.id !== id,
        ),
      );
    } catch (error) {
      console.error(error);
      setError("Failed to delete user.");
    } finally {
      setSaving(false);
    }
  };

  // Open Add Form
  const handleOpenAddForm = () => {
    setEditingUserId(null);

    setName("");
    setUserName("");
    setPassword("");
    setRole("");

    setError("");
    setShowForm(true);
  };

  // Open Edit Form
  const handleOpenEditForm = (user: User) => {
    setEditingUserId(user.id);

    setName(user.name);
    setUserName(user.user_name);

    // Do not load the existing password
    setPassword("");

    setRole(user.role);

    setError("");
    setShowForm(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Users
          </h2>

          <p className="mt-2 text-gray-500">
            Manage system users
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddForm}
          disabled={saving}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          + Add User
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <UserForm
          name={name}
          user_name={user_name}
          password={password}
          role={role}
          setName={(value) => {
            setName(value);
            setError("");
          }}
          setUserName={(value) => {
            setUserName(value);
            setError("");
          }}
          setPassword={(value) => {
            setPassword(value);
            setError("");
          }}
          setRole={(value) => {
            setRole(value);
            setError("");
          }}
          onSave={
            editingUserId === null
              ? handleCreateUser
              : handleUpdateUser
          }
          onCancel={resetForm}
          saving={saving}
          isEditing={editingUserId !== null}
        />
      )}

      {/* Loading / Table */}
      {loading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow-sm">
          {users.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              No users found.
            </div>
          ) : (
            <table className="w-full min-w-[700px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    #
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Username
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Role
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-t"
                  >
                    <td className="px-6 py-4 text-gray-700">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {user.name}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {user.user_name}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {user.role}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenEditForm(user)
                          }
                          disabled={saving}
                          className="rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteUser(user.id)
                          }
                          disabled={saving}
                          className="rounded-lg bg-red-100 px-3 py-1 text-sm text-red-700 hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Users;
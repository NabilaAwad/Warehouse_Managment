
import { useEffect, useState } from "react";

import {
  getSuppliers,
  createSuppliers,
  UpdateSuppliers,
  deleteSuppliers,
} from "../../services/suppliers_service";

import SuppliersForm from "../../components/Supplierscomponent/suppliersform";

type Supplier = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  company_id: number | null;
  created_at: string;
};

function Suppliers() {
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const [editingSupplierId, setEditingSupplierId] =
    useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const data = await getSuppliers();

        setSuppliers(data);
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to load suppliers.");
      } finally {
        setLoading(false);
      }
    };

    loadSuppliers();
  }, []);

  const validateSupplier = () => {
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Supplier name is required.");
      return false;
    }

    if (!phone.trim()) {
      setErrorMessage("Phone is required.");
      return false;
    }

    if (!email.trim()) {
      setErrorMessage("Email is required.");
      return false;
    }

    if (!address.trim()) {
      setErrorMessage("Address is required.");
      return false;
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(phone.trim())) {
      setErrorMessage("Please enter a valid phone number.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");

    setEditingSupplierId(null);
    setShowForm(false);
    setErrorMessage("");
  };

  // Create
  const handleCreateSupplier = async () => {
    if (!validateSupplier()) {
      return;
    }

    try {
      setSaving(true);
      setErrorMessage("");

      const newSupplier = await createSuppliers(
        name.trim(),
        phone.trim(),
        email.trim(),
        address.trim(),
      );

      setSuppliers((prevSuppliers) => [
        ...prevSuppliers,
        newSupplier,
      ]);

      resetForm();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to create supplier.");
    } finally {
      setSaving(false);
    }
  };

  // Update
  const handleUpdateSupplier = async () => {
    if (editingSupplierId === null) {
      return;
    }

    if (!validateSupplier()) {
      return;
    }

    try {
      setSaving(true);
      setErrorMessage("");

      const updatedSupplier = await UpdateSuppliers(
        editingSupplierId,
        name.trim(),
        phone.trim(),
        email.trim(),
        address.trim(),
      );

      setSuppliers((prevSuppliers) =>
        prevSuppliers.map((supplier) =>
          supplier.id === editingSupplierId
            ? updatedSupplier
            : supplier,
        ),
      );

      resetForm();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to update supplier.");
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDeleteSupplier = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this supplier?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setSaving(true);
      setErrorMessage("");

      await deleteSuppliers(id);

      setSuppliers((prevSuppliers) =>
        prevSuppliers.filter(
          (supplier) => supplier.id !== id,
        ),
      );
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to delete supplier.");
    } finally {
      setSaving(false);
    }
  };

  // Open Add Form
  const handleOpenAddForm = () => {
    setEditingSupplierId(null);

    setName("");
    setPhone("");
    setEmail("");
    setAddress("");

    setErrorMessage("");
    setShowForm(true);
  };

  // Open Edit Form
  const handleOpenEditForm = (supplier: Supplier) => {
    setEditingSupplierId(supplier.id);

    setName(supplier.name);
    setPhone(supplier.phone);
    setEmail(supplier.email);
    setAddress(supplier.address);

    setErrorMessage("");
    setShowForm(true);
  };

  if (loading) {
    return (
      <div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Suppliers
          </h2>

          <p className="mt-2 text-gray-500">
            Manage your suppliers
          </p>
        </div>

        <div className="flex min-h-[400px] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Suppliers
          </h2>

          <p className="mt-2 text-gray-500">
            Manage your suppliers
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddForm}
          disabled={saving}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          + Add Supplier
        </button>
      </div>

      {/* Error */}
      {errorMessage && (
        <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <SuppliersForm
          name={name}
          phone={phone}
          email={email}
          address={address}
          setName={(value) => {
            setName(value);
            setErrorMessage("");
          }}
          setPhone={(value) => {
            setPhone(value);
            setErrorMessage("");
          }}
          setEmail={(value) => {
            setEmail(value);
            setErrorMessage("");
          }}
          setAddress={(value) => {
            setAddress(value);
            setErrorMessage("");
          }}
          onSave={
            editingSupplierId === null
              ? handleCreateSupplier
              : handleUpdateSupplier
          }
          onCancel={resetForm}
          saving={saving}
          isEditing={editingSupplierId !== null}
        />
      )}

      {/* Table */}
      <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow-sm">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                #
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Phone
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Email
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Address
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {suppliers.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No suppliers found.
                </td>
              </tr>
            ) : (
              suppliers.map((supplier, index) => (
                <tr
                  key={supplier.id}
                  className="border-t"
                >
                  <td className="px-6 py-4 text-gray-700">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {supplier.name}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {supplier.phone}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {supplier.email}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {supplier.address}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenEditForm(supplier)
                        }
                        disabled={saving}
                        className="rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteSupplier(supplier.id)
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
    </div>
  );
}

export default Suppliers;

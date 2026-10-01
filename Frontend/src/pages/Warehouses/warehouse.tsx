
import { useEffect, useState } from "react";

import {
  getWarehouse,
  createWarehouse,
  UpdateWarehouses,
  deleteWarehouse,
} from "../../services/warehouse_service";

import WarehouseForm from "../../components/Warehousecomponent/warehouseform";

type Warehouse = {
  id: number;
  name: string;
  location: string;
  company_id: number | null;
};

function Warehouses() {
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const [warehouses, setWarehouses] =
    useState<Warehouse[]>([]);

  const [editingWarehouseId, setEditingWarehouseId] =
    useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  // Get Warehouses
useEffect(() => {
  console.log("WAREHOUSE PAGE LOADED");

  const loadWarehouses = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      console.log("BEFORE API");

      const data = await getWarehouse();

      console.log("WAREHOUSE DATA:", data);

      setWarehouses(data);
    } catch (error) {
      console.error("WAREHOUSE ERROR:", error);
      setErrorMessage("Failed to load warehouses.");
    } finally {
      setLoading(false);
    }
  };

  loadWarehouses();
}, []);

  // Validation
  const validateWarehouse = () => {
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Warehouse name is required.");
      return false;
    }

    if (!location.trim()) {
      setErrorMessage("Location is required.");
      return false;
    }

    return true;
  };

  // Reset Form
  const resetForm = () => {
    setName("");
    setLocation("");

    setEditingWarehouseId(null);
    setShowForm(false);
    setErrorMessage("");
  };

  // Create
  const handleCreateWarehouse = async () => {
    if (!validateWarehouse()) {
      return;
    }

    try {
      setSaving(true);
      setErrorMessage("");

      const newWarehouse = await createWarehouse(
        name.trim(),
        location.trim(),
      );

      setWarehouses((prevWarehouses) => [
        ...prevWarehouses,
        newWarehouse,
      ]);

      resetForm();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to create warehouse.");
    } finally {
      setSaving(false);
    }
  };

  // Update
  const handleUpdateWarehouse = async () => {
    if (editingWarehouseId === null) {
      return;
    }

    if (!validateWarehouse()) {
      return;
    }

    try {
      setSaving(true);
      setErrorMessage("");

      const updatedWarehouse =
        await UpdateWarehouses(
          editingWarehouseId,
          name.trim(),
          location.trim(),
        );

      setWarehouses((prevWarehouses) =>
        prevWarehouses.map((warehouse) =>
          warehouse.id === editingWarehouseId
            ? updatedWarehouse
            : warehouse,
        ),
      );

      resetForm();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to update warehouse.");
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDeleteWarehouse = async (
    id: number,
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this warehouse?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setSaving(true);
      setErrorMessage("");

      await deleteWarehouse(id);

      setWarehouses((prevWarehouses) =>
        prevWarehouses.filter(
          (warehouse) => warehouse.id !== id,
        ),
      );
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to delete warehouse.");
    } finally {
      setSaving(false);
    }
  };

  // Open Add Form
  const handleOpenAddForm = () => {
    setEditingWarehouseId(null);

    setName("");
    setLocation("");

    setErrorMessage("");
    setShowForm(true);
  };

  // Open Edit Form
  const handleOpenEditForm = (
    warehouse: Warehouse,
  ) => {
    setEditingWarehouseId(warehouse.id);

    setName(warehouse.name);
    setLocation(warehouse.location);

    setErrorMessage("");
    setShowForm(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Warehouses
          </h2>

          <p className="mt-2 text-gray-500">
            Manage your warehouses
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddForm}
          disabled={saving}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          + Add Warehouse
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
        <WarehouseForm
          name={name}
          location={location}
          setName={(value) => {
            setName(value);
            setErrorMessage("");
          }}
          setLocation={(value) => {
            setLocation(value);
            setErrorMessage("");
          }}
          onSave={
            editingWarehouseId === null
              ? handleCreateWarehouse
              : handleUpdateWarehouse
          }
          onCancel={resetForm}
          saving={saving}
          isEditing={editingWarehouseId !== null}
        />
      )}

      {/* Loading / Table */}
      {loading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow-sm">
          {warehouses.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              No warehouses found.
            </div>
          ) : (
            <table className="w-full min-w-[650px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    #
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Location
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {warehouses.map(
                  (warehouse, index) => (
                    <tr
                      key={warehouse.id}
                      className="border-t"
                    >
                      <td className="px-6 py-4 text-gray-700">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {warehouse.name}
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        {warehouse.location}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenEditForm(
                                warehouse,
                              )
                            }
                            disabled={saving}
                            className="rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteWarehouse(
                                warehouse.id,
                              )
                            }
                            disabled={saving}
                            className="rounded-lg bg-red-100 px-3 py-1 text-sm text-red-700 hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default Warehouses;


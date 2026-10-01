
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getMaterials,
  createMaterials,
  UpdateMaterials,
  deleteMaterial,
} from "../../services/materials_service";

import MaterialForm from "../../components/Materialscomponent/materialform";
import { setMaterials } from "../../store/slices/materialsSlice";

type Material = {
  id: number;
  name: string;
  unit: string;
  company_id: number | null;
};

function Materials() {
  const [showform, setShowform] = useState(false);

  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");

  const [editingMaterialId, setEditingMaterialId] =
    useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  // Redux
  const dispatch = useDispatch();

  const materials = useSelector(
    (state: any) => state.materials.materials,
  );

  // Get Materials
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const data = await getMaterials();

        dispatch(setMaterials(data));
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to load materials.");
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [dispatch]);

  // Validation
  const validateMaterial = () => {
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Material name is required.");
      return false;
    }

    if (!unit.trim()) {
      setErrorMessage("Unit is required.");
      return false;
    }

    return true;
  };

  // Reset Form
  const resetForm = () => {
    setName("");
    setUnit("");
    setEditingMaterialId(null);
    setShowform(false);
    setErrorMessage("");
  };

  // Create
  const handleCreateMaterial = async () => {
    if (!validateMaterial()) {
      return;
    }

    try {
      setSaving(true);
      setErrorMessage("");

      const newMaterial = await createMaterials(
        name.trim(),
        unit.trim(),
      );

      dispatch(
        setMaterials([
          ...materials,
          newMaterial,
        ]),
      );

      resetForm();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to create material.");
    } finally {
      setSaving(false);
    }
  };

  // Update
  const handleUpdateMaterial = async () => {
    if (editingMaterialId === null) {
      return;
    }

    if (!validateMaterial()) {
      return;
    }

    try {
      setSaving(true);
      setErrorMessage("");

      const updatedMaterial = await UpdateMaterials(
        editingMaterialId,
        name.trim(),
        unit.trim(),
      );

      const updatedMaterials = materials.map(
        (material: Material) =>
          material.id === editingMaterialId
            ? updatedMaterial
            : material,
      );

      dispatch(setMaterials(updatedMaterials));

      resetForm();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to update material.");
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDeleteMaterial = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this material?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setErrorMessage("");

      await deleteMaterial(id);

      const updatedMaterials = materials.filter(
        (material: Material) => material.id !== id,
      );

      dispatch(setMaterials(updatedMaterials));
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to delete material.");
    }
  };

  // Open Add Form
  const handleOpenAddForm = () => {
    setEditingMaterialId(null);
    setName("");
    setUnit("");
    setErrorMessage("");
    setShowform(true);
  };

  // Open Edit Form
  const handleOpenEditForm = (material: Material) => {
    setEditingMaterialId(material.id);
    setName(material.name);
    setUnit(material.unit);
    setErrorMessage("");
    setShowform(true);
  };

  // Loading
  if (loading) {
    return (
      <div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Materials
          </h2>

          <p className="mt-2 text-gray-500">
            Manage your materials
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
            Materials
          </h2>

          <p className="mt-2 text-gray-500">
            Manage your materials
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddForm}
          disabled={saving}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          + Add Material
        </button>
      </div>

      {/* Error */}
      {errorMessage && (
        <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      {/* Form */}
      {showform && (
        <MaterialForm
          name={name}
          unit={unit}
          setName={(value) => {
            setName(value);
            setErrorMessage("");
          }}
          setUnit={(value) => {
            setUnit(value);
            setErrorMessage("");
          }}
          onSave={
            editingMaterialId === null
              ? handleCreateMaterial
              : handleUpdateMaterial
          }
          onCancel={resetForm}
          saving={saving}
          isEditing={editingMaterialId !== null}
        />
      )}

      {/* Table */}
      <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow-sm">
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
                Unit
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {materials.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No materials found.
                </td>
              </tr>
            ) : (
              materials.map(
                (material: Material, index: number) => (
                  <tr
                    key={material.id}
                    className="border-t"
                  >
                    <td className="px-6 py-4 text-gray-700">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {material.name}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {material.unit}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenEditForm(material)
                        }
                        disabled={saving}
                        className="mr-3 text-blue-600 hover:text-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteMaterial(material.id)
                        }
                        disabled={saving}
                        className="text-red-600 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ),
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Materials;

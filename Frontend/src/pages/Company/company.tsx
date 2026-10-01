
import { useEffect, useState } from "react";
import {
  getCompany,
  updateCompany,
} from "../../services/company_service";

type Company = {
  id: number;
  name: string;
};

function Company() {
  const [company, setCompany] = useState<Company | null>(null);

  const [name, setName] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadCompany = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCompany();

        const companyData = Array.isArray(data)
          ? data[0]
          : data;

        if (!companyData) {
          setCompany(null);
          return;
        }

        setCompany(companyData);
        setName(companyData.name);
      } catch (error) {
        console.error(error);
        setError("Failed to load company");
      } finally {
        setLoading(false);
      }
    };

    loadCompany();
  }, []);

  const handleSave = async () => {
    if (!company) {
      return;
    }

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Company name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const updatedCompany = await updateCompany(
        company.id,
        trimmedName,
      );

      setCompany(updatedCompany);
      setName(updatedCompany.name);
    } catch (error) {
      console.error(error);
      setError("Failed to update company");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (company) {
      setName(company.name);
      setError("");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
      </div>
    );
  }

  if (error && !company) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <p className="text-gray-500">
          No company found.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Company Settings
        </h2>

        <p className="mt-2 text-gray-500">
          Manage your company information
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Company Form */}
      <div className="mt-6 max-w-2xl rounded-lg bg-white p-6 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            required
            disabled={saving}
            placeholder="Enter company name"
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleCancel}
            disabled={saving}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Company;

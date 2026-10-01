import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import {
  getCustomers,
  createCustomers,
  UpdateCustomers,
  deleteCustomers,
} from "../../services/customers_service";

import CustomersForm from "../../components/customerscomponent/customersform";

type Customer = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  company_id: number | null;
  created_at: string;
};

function Customers() {
  const [showform, setShowform] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [customers, setCustomers] = useState<Customer[]>([]);

  const [editingCustomerId, setEditingCustomerId] = useState<number | null>(
    null,
  );

  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getCustomers()
      .then((data) => {
        setCustomers(data);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Failed to load customers.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Validation
 const validateCustomer = () => {
  setErrorMessage("");

  if (!name.trim()) {
    setErrorMessage("Customer name is required.");
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

  // Create
  const handleCreateCustomer = async () => {
    if (!validateCustomer()) {
      return;
    }

    try {
      const newCustomer = await createCustomers(
        name.trim(),
        phone.trim(),
        email.trim(),
        address.trim(),
      );

      setCustomers((prevCustomers) => [
        ...prevCustomers,
        newCustomer,
      ]);

      resetForm();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to create customer.");
    }
  };

  // Update
  const handleUpdateCustomer = async () => {
    if (editingCustomerId === null) {
      return;
    }

    if (!validateCustomer()) {
      return;
    }

    try {
      const updatedCustomer = await UpdateCustomers(
        editingCustomerId,
        name.trim(),
        phone.trim(),
        email.trim(),
        address.trim(),
      );

      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.id === editingCustomerId
            ? updatedCustomer
            : customer,
        ),
      );

      resetForm();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to update customer.");
    }
  };

  // Delete
  const handleDeleteCustomer = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCustomers(id);

      setCustomers((prevCustomers) =>
        prevCustomers.filter((customer) => customer.id !== id),
      );
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to delete customer.");
    }
  };

  // Reset Form
  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setEditingCustomerId(null);
    setShowform(false);
    setErrorMessage("");
  };

  // Open Add Form
  const handleOpenAddForm = () => {
    setEditingCustomerId(null);

    setName("");
    setPhone("");
    setEmail("");
    setAddress("");

    setErrorMessage("");
    setShowform(true);
  };

  // Open Edit Form
  const handleOpenEditForm = (customer: Customer) => {
    setEditingCustomerId(customer.id);

    setName(customer.name || "");
    setPhone(customer.phone || "");
    setEmail(customer.email || "");
    setAddress(customer.address || "");

    setErrorMessage("");
    setShowform(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Customers
          </h2>

          <p className="mt-2 text-gray-500">
            Manage your customers
          </p>
        </div>

        <button
          onClick={handleOpenAddForm}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 sm:w-auto"
        >
          + Add Customer
        </button>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Form */}
      {showform && (
        <CustomersForm
          name={name}
          phone={phone}
          email={email}
          address={address}
          setName={setName}
          setPhone={setPhone}
          setEmail={setEmail}
          setAddress={setAddress}
          onSave={
            editingCustomerId === null
              ? handleCreateCustomer
              : handleUpdateCustomer
          }
          onCancel={resetForm}
        />
      )}

      {/* Table */}
      <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow-sm">
        {loading ? (
          <div className="flex min-h-60 items-center justify-center">
            <Loader2
              size={32}
              className="animate-spin text-blue-600"
            />
          </div>
        ) : customers.length === 0 ? (
          <div className="flex min-h-60 items-center justify-center text-gray-500">
            No customers found.
          </div>
        ) : (
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
              {customers.map((customer, index) => (
                <tr
                  key={customer.id}
                  className="border-t transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-gray-700">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800">
                    {customer.name || "—"}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {customer.phone?.trim() || "—"}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {customer.email?.trim() || "—"}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {customer.address?.trim() || "—"}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        handleOpenEditForm(customer)
                      }
                      className="mr-3 font-medium text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteCustomer(customer.id)
                      }
                      className="font-medium text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Customers;
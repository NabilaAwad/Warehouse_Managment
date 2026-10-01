import { useEffect, useState } from "react";

import {
  Package,
  Building2,
  Users,
  Truck,
  BarChart3,
  ArrowDownToLine,
  ArrowUpFromLine,
  TrendingUp,
  TrendingDown,
  FileText,
  AlertCircle,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { getDashboardStats } from "../../services/dashboard_service";

import {
  getItemMovementReport,
  getBestSellingMaterialsReport,
  getMostAvailableMaterialsReport,
  getPurchaseInvoicesReport,
  getSalesInvoicesReport,
} from "../../services/reports_service";

type DashboardStats = {
  materials: number;
  warehouses: number;
  customers: number;
  suppliers: number;
  total_stock: number;
  purchase_invoices: number;
  sales_invoices: number;
};

type ItemMovement = {
  material_id: number;
  material_name: string;
  purchased_quantity: number;
  sold_quantity: number;
};

type MaterialReport = {
  material_id: number;
  material_name: string;
  sold_quantity?: number;
  available_quantity?: number;
  quantity?: number;
};

type PurchaseInvoice = {
  id: number;
  supplier_name: string;
  warehouse_name: string;
  date: string;
};

type SalesInvoice = {
  id: number;
  customer_name: string;
  warehouse_name: string;
  date: string;
};

function Dashboard() {
  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [itemMovement, setItemMovement] =
    useState<ItemMovement[]>([]);

  const [bestSelling, setBestSelling] =
    useState<MaterialReport[]>([]);

  const [mostAvailable, setMostAvailable] =
    useState<MaterialReport[]>([]);

  const [purchaseInvoices, setPurchaseInvoices] =
    useState<PurchaseInvoice[]>([]);

  const [salesInvoices, setSalesInvoices] =
    useState<SalesInvoice[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        statsData,
        movementData,
        bestSellingData,
        mostAvailableData,
        purchasesData,
        salesData,
      ] = await Promise.all([
        getDashboardStats(),
        getItemMovementReport(),
        getBestSellingMaterialsReport(),
        getMostAvailableMaterialsReport(),
        getPurchaseInvoicesReport(),
        getSalesInvoicesReport(),
      ]);

      setStats({
        materials: Number(statsData.materials),
        warehouses: Number(statsData.warehouses),
        customers: Number(statsData.customers),
        suppliers: Number(statsData.suppliers),
        total_stock: Number(statsData.total_stock),
        purchase_invoices: Number(
          statsData.purchase_invoices
        ),
        sales_invoices: Number(
          statsData.sales_invoices
        ),
      });

      setItemMovement(
        movementData.map((item: ItemMovement) => ({
          ...item,
          purchased_quantity: Number(
            item.purchased_quantity
          ),
          sold_quantity: Number(
            item.sold_quantity
          ),
        }))
      );

      setBestSelling(
        bestSellingData.map(
          (item: MaterialReport) => ({
            ...item,
            sold_quantity: Number(
              item.sold_quantity
            ),
          })
        )
      );

      setMostAvailable(
        mostAvailableData.map(
          (item: MaterialReport) => ({
            ...item,
            available_quantity: Number(
              item.available_quantity
            ),
          })
        )
      );

      setPurchaseInvoices(purchasesData);
      setSalesInvoices(salesData);
    } catch (error) {
      console.error(error);

      setError(
        "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50 p-10 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <AlertCircle
              size={28}
              className="text-red-500"
            />
          </div>

          <h2 className="text-lg font-semibold text-red-700">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>

          <button
            onClick={loadDashboard}
            className="mt-5 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const chartData = itemMovement.map(
    (item) => ({
      name:
        item.material_name.length > 12
          ? `${item.material_name.slice(0, 12)}...`
          : item.material_name,
      purchased: item.purchased_quantity,
      sold: item.sold_quantity,
    })
  );

  const stockChartData =
    mostAvailable.slice(0, 5).map((item) => ({
      name:
        item.material_name.length > 14
          ? `${item.material_name.slice(0, 14)}...`
          : item.material_name,
      value: Number(
        item.available_quantity ?? 0
      ),
    }));

  return (
    <div className="space-y-6 p-6">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>

          <p className="mt-1 text-gray-500">
            Overview of your warehouse activity
          </p>
        </div>

        <button
          onClick={loadDashboard}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          <BarChart3 size={18} />
          Refresh Data
        </button>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Materials"
          value={stats.materials}
          icon={<Package size={23} />}
        />

        <StatCard
          title="Warehouses"
          value={stats.warehouses}
          icon={<Building2 size={23} />}
        />

        <StatCard
          title="Customers"
          value={stats.customers}
          icon={<Users size={23} />}
        />

        <StatCard
          title="Suppliers"
          value={stats.suppliers}
          icon={<Truck size={23} />}
        />

      </div>

      {/* Invoice / Stock Stats */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

        <StatCard
          title="Total Stock"
          value={stats.total_stock}
          icon={<BarChart3 size={23} />}
        />

        <StatCard
          title="Purchase Invoices"
          value={stats.purchase_invoices}
          icon={<ArrowDownToLine size={23} />}
        />

        <StatCard
          title="Sales Invoices"
          value={stats.sales_invoices}
          icon={<ArrowUpFromLine size={23} />}
        />

      </div>

      {/* Main Charts */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Purchase / Sales */}

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-2">

          <div className="mb-6 flex items-center justify-between">

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Stock Movement
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Purchased and sold quantities
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
              <TrendingUp
                size={20}
                className="text-gray-700"
              />
            </div>

          </div>

          {chartData.length === 0 ? (
            <EmptyChart />
          ) : (
            <div className="h-[330px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart
                  data={chartData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: -20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="name"
                    tick={{
                      fontSize: 12,
                    }}
                  />

                  <YAxis
                    allowDecimals={false}
                    tick={{
                      fontSize: 12,
                    }}
                  />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="purchased"
                    name="Purchased"
                    fill="#6366f1"
                    radius={[
                      6,
                      6,
                      0,
                      0,
                    ]}
                  />

                  <Bar
                    dataKey="sold"
                    name="Sold"
                    fill="#f59e0b"
                    radius={[
                      6,
                      6,
                      0,
                      0,
                    ]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

        </div>

        {/* Stock Distribution */}

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

          <div className="mb-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Stock Overview
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Top available materials
            </p>
          </div>

          {stockChartData.length === 0 ? (
            <EmptyChart />
          ) : (
            <div className="h-[330px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={stockChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    outerRadius={100}
                    innerRadius={55}
                    paddingAngle={3}
                  >
                    {stockChartData.map(
                      (_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            [
                              "#6366f1",
                              "#8b5cf6",
                              "#06b6d4",
                              "#10b981",
                              "#f59e0b",
                            ][
                              index %
                                5
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />

                  <Legend
                    verticalAlign="bottom"
                    height={36}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

        </div>

      </div>

      {/* Best Selling */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center justify-between">

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Best Selling Materials
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Materials with the highest sales
              </p>
            </div>

            <TrendingDown
              size={20}
              className="text-gray-500"
            />

          </div>

          {bestSelling.length === 0 ? (
            <EmptyState message="No sales data available yet." />
          ) : (
            <div className="space-y-4">

              {bestSelling
                .slice(0, 5)
                .map((item, index) => (
                  <div
                    key={item.material_id}
                    className="flex items-center gap-4"
                  >

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-700">
                      {index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-gray-800">
                        {item.material_name}
                      </p>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-gray-800 transition-all"
                          style={{
                            width: `${Math.min(
                              ((Number(
                                item.sold_quantity ??
                                  0
                              ) /
                                Number(
                                  bestSelling[0]
                                    ?.sold_quantity ??
                                    1
                                )) *
                                100),
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    <span className="text-sm font-semibold text-gray-700">
                      {Number(
                        item.sold_quantity ?? 0
                      ).toLocaleString()}
                    </span>

                  </div>
                ))}

            </div>
          )}

        </div>

        {/* Quick Overview */}

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Quick Overview
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Current warehouse status
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <OverviewBox
              title="Materials"
              value={stats.materials}
            />

            <OverviewBox
              title="Stock Units"
              value={stats.total_stock}
            />

            <OverviewBox
              title="Purchases"
              value={stats.purchase_invoices}
            />

            <OverviewBox
              title="Sales"
              value={stats.sales_invoices}
            />

          </div>

        </div>

      </div>

      {/* Recent Invoices */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <InvoiceTable
          title="Recent Sales Invoices"
          icon={
            <ArrowUpFromLine
              size={19}
            />
          }
          data={salesInvoices}
          type="sales"
        />

        <InvoiceTable
          title="Recent Purchase Invoices"
          icon={
            <ArrowDownToLine
              size={19}
            />
          }
          data={purchaseInvoices}
          type="purchase"
        />

      </div>

    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {value.toLocaleString()}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition duration-300 group-hover:scale-110">
          {icon}
        </div>

      </div>

    </div>
  );
}

function OverviewBox({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-gray-900">
        {value.toLocaleString()}
      </p>

    </div>
  );
}

function InvoiceTable({
  title,
  icon,
  data,
  type,
}: {
  title: string;
  icon: React.ReactNode;
  data: SalesInvoice[] | PurchaseInvoice[];
  type: "sales" | "purchase";
}) {
  const recentData = [...data]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
    .slice(0, 5);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b border-gray-100 p-5">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
            {icon}
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              {title}
            </h2>

            <p className="text-xs text-gray-500">
              Latest transactions
            </p>
          </div>

        </div>

        <FileText
          size={19}
          className="text-gray-400"
        />

      </div>

      {recentData.length === 0 ? (
        <EmptyState message="No invoices found." />
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead>
              <tr className="bg-gray-50 text-left text-gray-500">

                <th className="px-5 py-3 font-medium">
                  #
                </th>

                <th className="px-5 py-3 font-medium">
                  {type === "sales"
                    ? "Customer"
                    : "Supplier"}
                </th>

                <th className="px-5 py-3 font-medium">
                  Warehouse
                </th>

                <th className="px-5 py-3 font-medium">
                  Date
                </th>

              </tr>
            </thead>

            <tbody>

              {recentData.map(
                (invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-t border-gray-100 transition hover:bg-gray-50"
                  >

                    <td className="px-5 py-3 font-medium text-gray-700">
                      #{invoice.id}
                    </td>

                    <td className="px-5 py-3 text-gray-700">
                      {type === "sales"
                        ? (
                          invoice as SalesInvoice
                        ).customer_name
                        : (
                          invoice as PurchaseInvoice
                        ).supplier_name}
                    </td>

                    <td className="px-5 py-3 text-gray-500">
                      {invoice.warehouse_name}
                    </td>

                    <td className="px-5 py-3 text-gray-500">
                      {new Date(
                        invoice.date
                      ).toLocaleDateString()}
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

function EmptyChart() {
  return (
    <div className="flex h-full min-h-[250px] items-center justify-center text-sm text-gray-400">
      No data available
    </div>
  );
}

function EmptyState({
  message,
}: {
  message: string;
}) {
  return (
    <div className="flex min-h-[150px] items-center justify-center text-sm text-gray-400">
      {message}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-6">

      <div className="mb-8">
        <div className="h-9 w-40 animate-pulse rounded-lg bg-gray-200" />

        <div className="mt-3 h-5 w-72 animate-pulse rounded-lg bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {[1, 2, 3, 4].map(
          (item) => (
            <SkeletonCard key={item} />
          )
        )}

      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

        {[1, 2, 3].map(
          (item) => (
            <SkeletonCard key={item} />
          )
        )}

      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <SkeletonLargeCard />

        <SkeletonLargeCard />

      </div>

    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div className="w-full">

          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

          <div className="mt-4 h-9 w-20 animate-pulse rounded-lg bg-gray-200" />

        </div>

        <div className="h-12 w-12 animate-pulse rounded-xl bg-gray-200" />

      </div>

    </div>
  );
}

function SkeletonLargeCard() {
  return (
    <div className="h-[380px] animate-pulse rounded-2xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-1">
      <div className="h-5 w-40 rounded bg-gray-200" />

      <div className="mt-3 h-4 w-56 rounded bg-gray-200" />

      <div className="mt-8 h-64 rounded-xl bg-gray-100" />
    </div>
  );
}

export default Dashboard;
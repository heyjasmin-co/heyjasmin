import { useState } from "react";
import { HiTrash } from "react-icons/hi";
import ConfirmationModal from "../../../components/ConfirmationModal";
import Loading from "../../../components/Loading";
import {
  useDeleteBusiness,
  useSuperAdminBusinesses,
} from "../../../hooks/useSuperAdmin";
import { colorTheme } from "../../../theme/colorTheme";
import { errorToast, successToast } from "../../../utils/react-toast";

const BusinessesList = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(
    null,
  );
  // Pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const {
    data: response,
    isLoading,
    isError,
  } = useSuperAdminBusinesses(page, limit);
  const deleteMutation = useDeleteBusiness();

  const businesses = response?.data?.businesses || [];
  const total = response?.data?.total || 0;
  const totalPages = response?.data?.pages || 0;

  const handleDeleteClick = (id: string) => {
    setSelectedBusinessId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedBusinessId) return;
    deleteMutation.mutate(selectedBusinessId, {
      onSuccess: () => {
        setShowDeleteModal(false);
        setSelectedBusinessId(null);
        successToast("Business deleted successfully");
      },
      onError: (error: any) => {
        console.error("Failed to delete business", error);
        errorToast("Failed to delete business");
      },
    });
  };

  if (isLoading && businesses.length === 0) {
    return (
      <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
        <div className="text-center text-red-500">
          Failed to load businesses
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
      <div
        className="w-full rounded-xl border border-gray-200 bg-white shadow-lg"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <div className="h-full w-full divide-y divide-gray-200">
          {/* Header */}
          <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: colorTheme.secondaryColor(0.8) }}
              >
                <i className="fa-solid fa-building text-white"></i>
              </div>
              <h5 className="text-lg font-bold text-gray-900">
                Registered Businesses
              </h5>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm font-medium whitespace-nowrap text-gray-500">
                Total: <span className="text-gray-900">{total}</span>
              </div>
            </div>
          </div>

          {/* Businesses Table */}
          <div className="flex flex-col gap-6 px-4 py-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Business Info
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Owner Info
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Subscription
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Members
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Created At
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {businesses.length === 0 && !isLoading ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No businesses found
                      </td>
                    </tr>
                  ) : (
                    businesses.map((business: any) => (
                      <tr key={business._id}>
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900">
                              {business.name}
                            </span>
                            {business.twilioNumber ? (
                              <span className="text-xs text-gray-500">
                                <i className="fa-solid fa-phone mr-1 text-[10px]"></i>
                                {business.twilioNumber}
                              </span>
                            ) : (
                              <span className="text-[10px] font-medium text-gray-400 italic">
                                No Number
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {business.ownerUserId ? (
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-900">
                                {business.ownerUserId.firstName}{" "}
                                {business.ownerUserId.lastName}
                              </span>
                              <span className="text-xs text-gray-500">
                                {business.ownerUserId.email}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs font-medium text-gray-400 italic">
                              No Owner
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          <div className="flex flex-col gap-1">
                            {business.subscription?.plan ? (
                              <span className="inline-flex w-fit items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 capitalize">
                                {business.subscription.plan}
                              </span>
                            ) : business.subscription?.status ===
                              "trial_active" ? (
                              <span className="inline-flex w-fit items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                Trial
                              </span>
                            ) : business.subscription?.status ===
                              "trial_ended" ? (
                              <span className="inline-flex w-fit items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
                                Trial Expired
                              </span>
                            ) : (
                              <span className="inline-flex w-fit items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                No Plan
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          <span className="flex items-center gap-1.5">
                            <i className="fa-solid fa-users text-gray-400"></i>
                            {business.memberCount || 0}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {new Date(business.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDeleteClick(business._id)}
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-red-50 px-3 py-2 text-red-600 transition-colors duration-200 hover:bg-red-100"
                            title="Delete"
                          >
                            <HiTrash className="h-4 w-4" />
                            <span className="hidden text-sm font-medium sm:inline">
                              Delete
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex flex-1 justify-between sm:hidden">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing{" "}
                      <span className="font-medium">
                        {(page - 1) * limit + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {Math.min(page * limit, total)}
                      </span>{" "}
                      of <span className="font-medium">{total}</span> results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                      aria-label="Pagination"
                    >
                      <button
                        onClick={() => setPage(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                      >
                        <i className="fa-solid fa-chevron-left flex h-5 w-5 items-center justify-center"></i>
                      </button>
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setPage(i + 1)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 ${
                            page === i + 1
                              ? "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              : "text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:outline-offset-0"
                          }`}
                          style={{
                            backgroundColor:
                              page === i + 1
                                ? colorTheme.secondaryColor(1)
                                : "",
                          }}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => setPage(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                      >
                        <i className="fa-solid fa-chevron-right flex h-5 w-5 items-center justify-center"></i>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
        title="Delete Business?"
        message="Are you sure you want to delete this business? This will also cancel any active subscriptions and release the associated phone numbers. This action cannot be undone."
      />
    </div>
  );
};

export default BusinessesList;

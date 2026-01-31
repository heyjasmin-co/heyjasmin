/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle, HiTrash } from "react-icons/hi";
import Loading from "../../../components/Loading";
import { useSuperAdminClient } from "../../../lib/superAdminClient";
import { colorTheme } from "../../../theme/colorTheme";
import { errorToast, successToast } from "../../../utils/react-toast";

const BusinessesList = () => {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(
    null,
  );
  const apiClient = useSuperAdminClient();

  const fetchBusinesses = async () => {
    try {
      const { data } = await apiClient.get("/super-admin/businesses");
      if (data.success) {
        setBusinesses(data.businesses);
      }
    } catch (error) {
      console.error("Failed to fetch businesses", error);
      errorToast("Failed to fetch businesses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteClick = (id: string) => {
    setSelectedBusinessId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedBusinessId) return;
    try {
      await apiClient.delete(`/super-admin/businesses/${selectedBusinessId}`);
      setBusinesses(businesses.filter((b) => b._id !== selectedBusinessId));
      setShowDeleteModal(false);
      setSelectedBusinessId(null);
      successToast("Business deleted successfully");
    } catch (error) {
      console.error("Failed to delete business", error);
      errorToast("Failed to delete business");
    }
  };

  if (loading && businesses.length === 0) {
    return (
      <div className="h-full flex-1 overflow-y-auto rounded-2xl bg-white px-6 py-6 shadow-lg">
        <Loading />
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
          <div className="flex items-center space-x-3 px-4 py-3">
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

          {/* Businesses Table */}
          <div className="flex flex-col gap-6 px-4 py-4">
            <span className="text-lg font-bold text-gray-800">
              All Businesses
            </span>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Business Name
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Owner Name
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Owner Email
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
                  {businesses.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No businesses found
                      </td>
                    </tr>
                  ) : (
                    businesses.map((business) => (
                      <tr key={business._id}>
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {business.name}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {business.ownerUserId?.firstName}{" "}
                          {business.ownerUserId?.lastName}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {business.ownerUserId?.email}
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
                            <span className="text-sm font-medium">Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                Are you sure you want to delete this business? <br />
                <span className="font-bold text-red-500">
                  This will also delete the associated user account!
                </span>
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleConfirmDelete}
                  className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 focus:outline-none"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-200 focus:outline-none"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessesList;

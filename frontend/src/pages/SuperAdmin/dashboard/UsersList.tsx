/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import ConfirmationModal from "../../../components/ConfirmationModal";
import Loading from "../../../components/Loading";
import { superAdminService } from "../../../lib/superAdminService";
import { colorTheme } from "../../../theme/colorTheme";
import { errorToast, successToast } from "../../../utils/react-toast";

const UsersList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  // Pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await superAdminService.getUsers({
        page,
        limit,
      });
      if (data.success) {
        setUsers(data.users);
        setTotal(data.total);
        setTotalPages(data.pages);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
      errorToast("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteClick = (id: string) => {
    setSelectedUserId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUserId) return;
    setIsDeleting(true);
    try {
      await superAdminService.deleteUser(selectedUserId);
      successToast("User and all associated data deleted successfully");
      setShowDeleteModal(false);
      setSelectedUserId(null);
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user", error);
      errorToast("Failed to delete user");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading && users.length === 0) {
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
          <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full"
                style={{ backgroundColor: colorTheme.secondaryColor(0.8) }}
              >
                <i className="fa-solid fa-users text-white"></i>
              </div>
              <h5 className="text-lg font-bold text-gray-900">
                User Management
              </h5>
            </div>
          </div>

          {/* Users Table */}
          <div className="flex flex-col gap-6 px-4 py-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      User
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Email
                    </th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-600">
                      Businesses
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Joined
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.length === 0 && !loading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 font-bold text-gray-400 uppercase">
                              {user.firstName?.charAt(0) || "U"}
                            </div>
                            <span className="font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {user.email}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                            {user.businessCount || 0}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDeleteClick(user._id)}
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
        isLoading={isDeleting}
        title="Delete User Account?"
        message="Are you sure you want to delete this user? This will also delete all businesses owned by this user, cancel their subscriptions, and release all associated phone numbers. This action cannot be undone."
      />
    </div>
  );
};

export default UsersList;

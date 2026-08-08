import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // =========================
  // FETCH REQUESTS
  // =========================
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "requests")
        );

        const requestList = querySnapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setRequests(requestList);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // =========================
  // UPDATE STATUS
  // =========================
  const updateStatus = async (requestId, newStatus) => {
    try {
      setUpdatingId(requestId);

      await updateDoc(doc(db, "requests", requestId), {
        status: newStatus,
      });

      setRequests((previousRequests) =>
        previousRequests.map((request) =>
          request.id === requestId
            ? {
                ...request,
                status: newStatus,
              }
            : request
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Could not update request status.");
    } finally {
      setUpdatingId(null);
    }
  };

  // =========================
  // COUNTS
  // =========================
  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const fulfilledCount = requests.filter(
    (request) => request.status === "Fulfilled"
  ).length;

  const criticalCount = requests.filter(
    (request) => request.urgency === "Critical"
  ).length;

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-pulse mb-4">
            🩸
          </div>

          <p className="text-gray-500 font-medium">
            Loading blood requests...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">

      {/* =========================
          HEADER
      ========================= */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-8">

        <div>

          <div className="flex items-center gap-3">

            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-3xl">
              🚨
            </div>

            <div>

              <p className="text-red-600 font-bold text-sm uppercase tracking-wider">
                Blood Bank
              </p>

              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Blood Requests
              </h1>

            </div>

          </div>

          <p className="text-gray-500 mt-3 max-w-2xl">
            View blood requests and update their status when
            they are fulfilled or cancelled.
          </p>

        </div>

      </div>


      {/* =========================
          STATISTICS
      ========================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

        {/* Total */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm font-medium">
                Total Requests
              </p>

              <p className="text-3xl font-extrabold text-gray-900 mt-1">
                {requests.length}
              </p>
            </div>

            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl">
              🩸
            </div>

          </div>

        </div>


        {/* Pending */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm font-medium">
                Pending
              </p>

              <p className="text-3xl font-extrabold text-orange-600 mt-1">
                {pendingCount}
              </p>
            </div>

            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
              ⏳
            </div>

          </div>

        </div>


        {/* Fulfilled */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-gray-500 text-sm font-medium">
                Fulfilled
              </p>

              <p className="text-3xl font-extrabold text-green-600 mt-1">
                {fulfilledCount}
              </p>
            </div>

            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
              ✓
            </div>

          </div>

        </div>

      </div>


      {/* =========================
          CRITICAL ALERT
      ========================= */}
      {criticalCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-8">

          <div className="flex items-center gap-4">

            <div className="w-11 h-11 bg-red-100 rounded-full flex items-center justify-center text-xl animate-pulse">
              🚨
            </div>

            <div>
              <h3 className="font-bold text-red-800">
                Critical Blood Requests
              </h3>

              <p className="text-red-700 text-sm mt-1">
                There {criticalCount === 1 ? "is" : "are"}{" "}
                {criticalCount} critical request
                {criticalCount !== 1 ? "s" : ""} requiring
                immediate attention.
              </p>
            </div>

          </div>

        </div>
      )}


      {/* =========================
          REQUEST LIST
      ========================= */}
      <div className="flex items-center justify-between mb-5">

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            All Requests
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Manage submitted blood requests
          </p>
        </div>

      </div>


      {/* =========================
          EMPTY STATE
      ========================= */}
      {requests.length === 0 ? (

        <div className="bg-white border rounded-3xl p-12 text-center shadow-sm">

          <div className="text-6xl mb-5">
            📋
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            No Blood Requests
          </h2>

          <p className="text-gray-500 mt-2">
            There are currently no blood requests.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {requests.map((request) => {

            const isCritical =
              request.urgency === "Critical";

            const isUrgent =
              request.urgency === "Urgent";

            const isFulfilled =
              request.status === "Fulfilled";

            const isCancelled =
              request.status === "Cancelled";

            return (
              <div
                key={request.id}
                className={`bg-white border rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 ${
                  isCritical && !isFulfilled && !isCancelled
                    ? "border-red-300"
                    : ""
                }`}
              >

                {/* =========================
                    CARD TOP
                ========================= */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                  <div className="flex items-center gap-4">

                    {/* Blood Group */}
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-xl font-extrabold">
                      {request.bloodGroup || "?"}
                    </div>

                    <div>

                      <h3 className="text-xl font-bold text-gray-900">
                        {request.bloodGroup} Blood Required
                      </h3>

                      <p className="text-gray-500 mt-1">
                        📍 {request.city || "City not provided"}
                      </p>

                    </div>

                  </div>


                  {/* Status */}
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold self-start ${
                      request.status === "Pending"
                        ? "bg-orange-100 text-orange-700"
                        : request.status === "Fulfilled"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {request.status === "Pending"
                      ? "● Pending"
                      : request.status === "Fulfilled"
                      ? "✓ Fulfilled"
                      : "✕ Cancelled"}
                  </span>

                </div>


                {/* Divider */}
                <div className="border-t my-5"></div>


                {/* =========================
                    DETAILS
                ========================= */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                  {/* Units */}
                  <div className="bg-gray-50 rounded-xl p-4">

                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Required Units
                    </p>

                    <p className="text-xl font-bold text-gray-900 mt-1">
                      {request.units}
                    </p>

                  </div>


                  {/* City */}
                  <div className="bg-gray-50 rounded-xl p-4">

                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      City
                    </p>

                    <p className="text-lg font-bold text-gray-800 mt-1 truncate">
                      {request.city || "N/A"}
                    </p>

                  </div>


                  {/* Urgency */}
                  <div className="bg-gray-50 rounded-xl p-4">

                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Urgency
                    </p>

                    <p
                      className={`font-bold mt-1 ${
                        isCritical
                          ? "text-red-600"
                          : isUrgent
                          ? "text-orange-600"
                          : "text-blue-600"
                      }`}
                    >
                      {isCritical
                        ? "🔴 Critical"
                        : isUrgent
                        ? "🟠 Urgent"
                        : "🟢 Normal"}
                    </p>

                  </div>


                  {/* Requester */}
                  <div className="bg-gray-50 rounded-xl p-4">

                    <p className="text-xs text-gray-500 uppercase font-semibold">
                      Requester
                    </p>

                    <p className="text-sm font-bold text-gray-800 mt-1 truncate">
                      {request.requesterEmail ||
                        "Not provided"}
                    </p>

                  </div>

                </div>


                {/* =========================
                    REASON
                ========================= */}
                {request.reason && (
                  <div className="mt-4 bg-gray-50 rounded-xl p-4">

                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                      Reason
                    </p>

                    <p className="text-gray-700">
                      {request.reason}
                    </p>

                  </div>
                )}


                {/* =========================
                    ACTIONS
                ========================= */}
                {!isFulfilled && !isCancelled && (
                  <div className="flex flex-col sm:flex-row gap-3 mt-5">

                    <button
                      onClick={() =>
                        updateStatus(
                          request.id,
                          "Fulfilled"
                        )
                      }
                      disabled={updatingId === request.id}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-all duration-300 hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {updatingId === request.id ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="animate-spin">
                            ⟳
                          </span>
                          Updating...
                        </span>
                      ) : (
                        "✓ Mark as Fulfilled"
                      )}
                    </button>


                    <button
                      onClick={() =>
                        updateStatus(
                          request.id,
                          "Cancelled"
                        )
                      }
                      disabled={updatingId === request.id}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-bold transition-all duration-300 disabled:bg-gray-200 disabled:cursor-not-allowed"
                    >
                      ✕ Cancel Request
                    </button>

                  </div>
                )}

              </div>
            );
          })}

        </div>

      )}

    </div>
  );
}

export default Requests;
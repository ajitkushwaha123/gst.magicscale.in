"use client";

import { useEffect, useState } from "react";
import { Loader2, Users, Search, CheckCircle2, ChevronLeft, ChevronRight, FileCheck, FileX, CreditCard, FileText, X, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [data, setData] = useState({ items: [], totalRecords: 0, totalPages: 1, currentPage: 1 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [savingRemark, setSavingRemark] = useState(null);
  const [savingStatus, setSavingStatus] = useState(null);
  const [savingWaTag, setSavingWaTag] = useState(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // Debounced Search & Filters
  useEffect(() => {
    const handler = setTimeout(() => {
      if (currentPage !== 1) {
        setCurrentPage(1); // this will trigger the fetch above
      } else {
        fetchData();
      }
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm, statusFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/data?page=${currentPage}&limit=${itemsPerPage}&search=${encodeURIComponent(searchTerm)}&status=${encodeURIComponent(statusFilter)}`);
      if (res.ok) {
        const result = await res.json();
        setData(result.data);
      } else {
        toast.error("Failed to fetch data");
      }
    } catch (error) {
      toast.error("Error loading dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRemark = async (id, type, newRemark) => {
    setSavingRemark(id);
    try {
      const res = await fetch("/api/admin/remarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type, remarks: newRemark }),
      });

      if (res.ok) {
        toast.success("Remark saved!");
        setData((prev) => {
          const newData = { ...prev };
          const items = [...newData.items];
          const index = items.findIndex(
            (item) => (item.registrationId || item.leadId) === id
          );
          if (index !== -1) items[index].remarks = newRemark;
          newData.items = items;
          return newData;
        });
      } else {
        toast.error("Failed to save remark");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSavingRemark(null);
    }
  };

  const handleSaveStatus = async (id, type, newStatus) => {
    setSavingStatus(id);
    try {
      const res = await fetch("/api/admin/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type, status: newStatus }),
      });

      if (res.ok) {
        toast.success("Status updated!");
        setData((prev) => {
          const newData = { ...prev };
          const items = [...newData.items];
          const index = items.findIndex(
            (item) => (item.registrationId || item.leadId) === id
          );
          if (index !== -1) items[index].status = newStatus;
          newData.items = items;
          return newData;
        });
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSavingStatus(null);
    }
  };

  const handleWaTag = async (id, type, newVal) => {
    setSavingWaTag(id);
    try {
      const res = await fetch("/api/admin/wa-tag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type, waMessaged: newVal }),
      });
      if (res.ok) {
        toast.success(newVal ? "Marked as WA Sent!" : "WA tag removed");
        setData((prev) => {
          const newData = { ...prev };
          const items = [...newData.items];
          const index = items.findIndex(
            (item) => (item.registrationId || item.leadId) === id
          );
          if (index !== -1) items[index].waMessaged = newVal;
          newData.items = items;
          return newData;
        });
      } else {
        toast.error("Failed to update WA tag");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSavingWaTag(null);
    }
  };

  // Backend now handles filtering, sorting, and pagination!
  const paginatedData = data.items || [];
  const totalPages = data.totalPages || 1;
  const totalRecords = data.totalRecords || 0;

  // We keep a simple loading spinner overlay if navigating pages
  if (loading && paginatedData.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-zinc-500 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pb-12">
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-30">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20">
              <Users className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-extrabold text-zinc-900 tracking-tight">Lead Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex items-center group">
              <Search className="absolute left-3.5 h-4 w-4 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search leads & registrations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 py-2.5 bg-zinc-100 border border-transparent hover:bg-zinc-200/50 rounded-full text-sm font-medium text-zinc-900 placeholder:text-zinc-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all w-72 sm:w-80 shadow-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 p-1 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] h-[42px] bg-white border border-zinc-200 hover:bg-zinc-50 rounded-full font-medium text-sm text-zinc-700 shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-xl border-zinc-100 p-1 z-[100] bg-white">
                <SelectItem value="ALL" className="font-semibold text-zinc-700 cursor-pointer rounded-lg mb-1 focus:bg-zinc-100">All Status</SelectItem>
                <SelectItem value="NEW" className="font-semibold text-zinc-700 cursor-pointer rounded-lg mb-1 focus:bg-blue-50 focus:text-blue-700">NEW</SelectItem>
                <SelectItem value="CALLBACK" className="font-semibold text-zinc-700 cursor-pointer rounded-lg mb-1 focus:bg-purple-50 focus:text-purple-700">CALLBACK</SelectItem>
                <SelectItem value="CALL_DONE" className="font-semibold text-zinc-700 cursor-pointer rounded-lg mb-1 focus:bg-cyan-50 focus:text-cyan-700">CALL DONE</SelectItem>
                <SelectItem value="CONVERTED" className="font-semibold text-zinc-700 cursor-pointer rounded-lg mb-1 focus:bg-emerald-50 focus:text-emerald-700">CONVERTED</SelectItem>
                <SelectItem value="NOT_INTERESTED" className="font-semibold text-zinc-700 cursor-pointer rounded-lg focus:bg-rose-50 focus:text-rose-700">NOT INTERESTED</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900">All Leads & Registrations</h2>
            <p className="text-sm text-zinc-500 mt-1">Track customer progress from initial lead to payment success.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-zinc-200 text-sm font-semibold text-zinc-700">
            Total Records: <span className="text-blue-600">{totalRecords}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden flex flex-col relative">
          {/* Overlay spinner when loading next pages */}
          {loading && paginatedData.length > 0 && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-20 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600 drop-shadow-md" />
            </div>
          )}
          
          <div className="overflow-x-auto min-h-[500px]">
            <table className="w-full text-left text-sm text-zinc-600">
              <thead className="bg-zinc-50/80 text-xs uppercase text-zinc-500 border-b border-zinc-200 font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4 w-40">Date</th>
                  <th className="px-6 py-4 w-48">Name / Phone</th>
                  <th className="px-6 py-4">Documents</th>
                  <th className="px-6 py-4">Payment</th>
                  <th className="px-6 py-4 w-48">Status & Info</th>
                  <th className="px-6 py-4 w-1/4">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {paginatedData.map((item) => (
                  <TableRow
                    key={item.registrationId || item.leadId}
                    item={item}
                    savingRemark={savingRemark}
                    onSaveRemark={handleSaveRemark}
                    savingStatus={savingStatus}
                    onSaveStatus={handleSaveStatus}
                    savingWaTag={savingWaTag}
                    onWaTag={handleWaTag}
                  />
                ))}
                
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-16 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-zinc-100 mb-4">
                        <Search className="h-6 w-6 text-zinc-400" />
                      </div>
                      <h3 className="text-sm font-semibold text-zinc-900">No records found</h3>
                      <p className="text-sm text-zinc-500 mt-1">Try adjusting your search or check back later.</p>
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="bg-zinc-50/50 border-t border-zinc-200 px-6 py-4 flex items-center justify-between">
              <span className="text-sm text-zinc-500 font-medium">
                Showing <span className="text-zinc-900 font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-zinc-900 font-semibold">{Math.min(currentPage * itemsPerPage, totalRecords)}</span> of <span className="text-zinc-900 font-semibold">{totalRecords}</span> entries
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    // Simple pagination logic to avoid too many buttons
                    if (totalPages > 7 && (i !== 0 && i !== totalPages - 1 && Math.abs(currentPage - 1 - i) > 1)) {
                      if (i === 1 || i === totalPages - 2) return <span key={i} className="px-1 text-zinc-400">...</span>;
                      return null;
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${
                          currentPage === i + 1 
                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/30" 
                            : "text-zinc-600 hover:bg-zinc-100"
                        }`}
                      >
                        {i + 1}
                      </button>
                    )
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function TableRow({ item, savingRemark, onSaveRemark, savingStatus, onSaveStatus, savingWaTag, onWaTag }) {
  const [localRemark, setLocalRemark] = useState(item.remarks || "");
  const isChanged = localRemark !== (item.remarks || "");

  // Use the relevant ID and Type for saving remarks
  const targetId = item.registrationId || item.leadId;
  const targetType = item.registrationId ? "registration" : "lead";

  // Check if item is created within the last 24 hours
  const dateToUse = item.latestDate || item.createdAt;
  const isNew = new Date(dateToUse).getTime() > Date.now() - 24 * 60 * 60 * 1000;

  const handleSaveRemarkLocal = () => {
    if (isChanged) {
      onSaveRemark(targetId, targetType, localRemark);
    }
  };

  const handleStatusChange = (e) => {
    onSaveStatus(targetId, targetType, e.target.value);
  };

  const statusColors = {
    NEW: "bg-blue-500 text-white border-blue-600 hover:bg-blue-600 shadow-blue-500/30",
    CALLBACK: "bg-purple-500 text-white border-purple-600 hover:bg-purple-600 shadow-purple-500/30",
    CALL_DONE: "bg-cyan-500 text-white border-cyan-600 hover:bg-cyan-600 shadow-cyan-500/30",
    CONVERTED: "bg-emerald-500 text-white border-emerald-600 hover:bg-emerald-600 shadow-emerald-500/30",
    NOT_INTERESTED: "bg-rose-500 text-white border-rose-600 hover:bg-rose-600 shadow-rose-500/30",
  };

  return (
    <tr className={`transition-colors ${isNew ? 'bg-blue-50/30 hover:bg-blue-50/60' : 'hover:bg-zinc-50/80'}`}>
      <td className="px-6 py-5 whitespace-nowrap relative">
        {isNew && (
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1 h-8 bg-blue-500 rounded-r-full"></div>
        )}
        <div className="flex items-center gap-2">
          <div className="font-semibold text-zinc-900">
            {new Date(dateToUse).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          {isNew && <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">New</span>}
        </div>
        <div className="text-xs text-zinc-500 mt-1 font-medium">
          {new Date(dateToUse).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
        </div>
      </td>
      
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="font-bold text-zinc-900 text-base">{item.name}</div>
        <a href={`https://wa.me/91${item.phone?.replace(/\D/g, "")}?text=${encodeURIComponent("Hi sir apko food license banwana hai kya")}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-700 font-medium hover:underline mt-1 block">
          {item.phone}
        </a>
        {item.email && (
          <a href={`mailto:${item.email}`} className="text-zinc-500 hover:text-zinc-700 text-xs hover:underline mt-0.5 block truncate max-w-[180px]">
            {item.email}
          </a>
        )}
        <button
          onClick={() => onWaTag(targetId, targetType, !item.waMessaged)}
          disabled={savingWaTag === targetId}
          title={item.waMessaged ? "Click to remove WA tag" : "Mark as WA Messaged"}
          className={`mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
            item.waMessaged
              ? "bg-green-100 text-green-700 border-green-300 hover:bg-green-200"
              : "bg-zinc-100 text-zinc-500 border-zinc-200 hover:bg-zinc-200"
          } disabled:opacity-50`}
        >
          {savingWaTag === targetId ? (
            <Loader2 className="w-2.5 h-2.5 animate-spin" />
          ) : (
            <span>{item.waMessaged ? "✓" : "+"}</span>
          )}
          WA Sent
        </button>
      </td>

      <td className="px-6 py-5 whitespace-nowrap">
        {item.isRegistered ? (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs font-medium text-zinc-700">
              {item.docCount === 3 ? (
                <FileCheck className="w-4 h-4 text-green-600" />
              ) : (
                <FileText className="w-4 h-4 text-amber-600" />
              )}
              {item.docCount}/3 Uploaded
            </div>
            <div className="flex gap-2 mt-1">
              {item.profilePicUrl && <a href={item.profilePicUrl} target="_blank" rel="noreferrer" className="text-[10px] bg-blue-50 text-blue-600 border border-blue-200 px-1.5 py-0.5 rounded hover:bg-blue-100">Photo</a>}
              {item.aadharUrl && <a href={item.aadharUrl} target="_blank" rel="noreferrer" className="text-[10px] bg-blue-50 text-blue-600 border border-blue-200 px-1.5 py-0.5 rounded hover:bg-blue-100">Aadhar</a>}
              {item.panUrl && <a href={item.panUrl} target="_blank" rel="noreferrer" className="text-[10px] bg-blue-50 text-blue-600 border border-blue-200 px-1.5 py-0.5 rounded hover:bg-blue-100">PAN</a>}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-400 italic">
            <FileX className="w-4 h-4" />
            Not started
          </div>
        )}
      </td>
      
      <td className="px-6 py-5 whitespace-nowrap">
        {item.isRegistered ? (
          <div className="flex flex-col gap-1.5">
            <span
              className={`inline-flex w-fit px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${
                item.paymentStatus === "SUCCESS"
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : item.paymentStatus === "FAILED"
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : "bg-amber-100 text-amber-700 border border-amber-200"
              }`}
            >
              {item.paymentStatus || "PENDING"}
            </span>
            <div className="flex items-center gap-1 text-xs text-zinc-700 font-semibold mt-0.5">
              <CreditCard className="w-3.5 h-3.5 text-zinc-400" />
              ₹{item.advanceAmount} Adv.
            </div>
          </div>
        ) : (
          <span className="text-xs text-zinc-400 italic">-</span>
        )}
      </td>

      <td className="px-6 py-5 whitespace-nowrap">
        <div className="flex flex-col gap-2">
          <div className="relative group/select">
            <Select 
              value={item.status || "NEW"} 
              onValueChange={(val) => onSaveStatus(targetId, targetType, val)}
              disabled={savingStatus === targetId}
            >
              <SelectTrigger className={`w-full h-9 rounded-md border-0 text-[11px] font-extrabold tracking-wider uppercase transition-all duration-300 focus:ring-4 focus:ring-opacity-50 shadow-md [&>span]:text-white [&>svg]:text-white [&>svg]:drop-shadow-sm ${statusColors[item.status || "NEW"]} disabled:opacity-50`}>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="rounded-md shadow-xl border-zinc-100 p-1 z-[100] bg-white">
                <SelectItem value="NEW" className="font-semibold text-zinc-700 focus:bg-blue-50 focus:text-blue-700 cursor-pointer rounded-lg mb-1">NEW</SelectItem>
                <SelectItem value="CALLBACK" className="font-semibold text-zinc-700 focus:bg-purple-50 focus:text-purple-700 cursor-pointer rounded-lg mb-1">CALLBACK</SelectItem>
                <SelectItem value="CALL_DONE" className="font-semibold text-zinc-700 focus:bg-cyan-50 focus:text-cyan-700 cursor-pointer rounded-lg mb-1">CALL DONE</SelectItem>
                <SelectItem value="CONVERTED" className="font-semibold text-zinc-700 focus:bg-emerald-50 focus:text-emerald-700 cursor-pointer rounded-lg mb-1">CONVERTED</SelectItem>
                <SelectItem value="NOT_INTERESTED" className="font-semibold text-zinc-700 focus:bg-rose-50 focus:text-rose-700 cursor-pointer rounded-lg">NOT INTERESTED</SelectItem>
              </SelectContent>
            </Select>
            {savingStatus === targetId && (
              <Loader2 className="w-4 h-4 absolute right-8 top-1/2 -translate-y-1/2 animate-spin text-white drop-shadow-sm pointer-events-none" />
            )}
          </div>
          
          <div className="flex items-center gap-1.5 mt-1">
            {item.isRegistered ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                <CheckCircle2 className="w-3 h-3" /> Reg
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded">
                <Users className="w-3 h-3" /> Lead
              </span>
            )}
            <span className="text-xs text-zinc-500 truncate max-w-[100px]" title={item.businessActivity}>
              {item.businessActivity || "No business type"}
            </span>
          </div>
        </div>
      </td>

      <td className="px-6 py-5">
        <div className="flex flex-col gap-2 relative group">
          <textarea
            value={localRemark}
            onChange={(e) => setLocalRemark(e.target.value)}
            placeholder="Add a remark..."
            className={`w-full border rounded-xl px-3 py-2 text-sm text-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none min-h-[60px] ${isNew ? 'bg-white border-blue-100 shadow-sm' : 'bg-zinc-50 border-zinc-200 hover:bg-white'}`}
          />
          {isChanged && (
            <button
              onClick={handleSaveRemarkLocal}
              disabled={savingRemark === targetId}
              className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full shadow-lg shadow-blue-500/40 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all z-10 disabled:opacity-50 disabled:hover:scale-100"
              title="Save Remark"
            >
              {savingRemark === targetId ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

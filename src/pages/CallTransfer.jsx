import React, {
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
import toast from "react-hot-toast";

import TechnicianCard from "../components/TechnicianCard";
import TransferConditions from "../components/TransferConditions";

import {
  getTransferContactsApi,
  getCallTransferRulesApi,
} from "../libs/callTransfer.api";

import { AuthContext } from "../provider/AuthContext";

export default function CallTransfer() {
  const { role, getActiveStoreId, selectedStore } =
    useContext(AuthContext);

  // ✅ DEFAULT STORE ID = 1
  const activeStoreId = getActiveStoreId() || 1;

  const [contacts, setContacts] = useState([]);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false);

  const prevStoreRef = useRef(null);

  /* ================= STORE CHANGE DETECT ================= */
  useEffect(() => {
    if (!activeStoreId) return;

    if (
      prevStoreRef.current &&
      prevStoreRef.current !== activeStoreId
    ) {
      toast.loading("Loading call transfer settings...", {
        id: "calltransfer-store",
      });
    }

    prevStoreRef.current = activeStoreId;
  }, [activeStoreId]);

  /* ================= FETCH CONTACTS ================= */
  const fetchContacts = async () => {
    if (!activeStoreId) return;

    const res = await getTransferContactsApi({
      store: activeStoreId,
    });

    return Array.isArray(res.data) ? res.data : [];
  };

  /* ================= FETCH RULES ================= */
  const fetchRules = async () => {
    if (!activeStoreId) return;

    const res = await getCallTransferRulesApi({
      store: activeStoreId,
    });

    return Array.isArray(res.data) ? res.data : [];
  };

  /* ================= LOAD ALL ================= */
  const loadTransferData = async () => {
    try {
      setLoading(true);

      const [contactsData, rulesData] =
        await Promise.all([
          fetchContacts(),
          fetchRules(),
        ]);

      setContacts(contactsData || []);
      setRules(rulesData || []);

      toast.success(
        `Call transfer loaded for ${
          selectedStore?.name || "Store 1"
        }`,
        { id: "calltransfer-store" }
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to load call transfer data", {
        id: "calltransfer-store",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= INITIAL + STORE CHANGE ================= */
  useEffect(() => {
    if (!activeStoreId) return;

    setContacts([]);
    setRules([]);

    loadTransferData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStoreId]);

  return (
    <div className="space-y-8">
      {/* ================= TRANSFER CONTACT SECTION ================= */}
      <div className="bg-[#0F172B80] border-2 border-[#2B7FFF33] rounded-2xl overflow-hidden">
        <div className="p-8 border-b border-[#2B7FFF33]">
          <h1 className="text-2xl font-medium text-white mb-2">
            Call Transfer
          </h1>
          <p className="text-sm text-[#90A1B9]">
            Calls will be transferred based on selected
            conditions
          </p>
        </div>

        <div className="p-8 space-y-4">
          {loading && (
            <p className="text-sm text-[#90A1B9]">
              Loading transfer contacts...
            </p>
          )}

          {!loading && contacts.length === 0 && (
            <p className="text-sm text-[#90A1B9]">
              No transfer contacts found for this store.
            </p>
          )}

          {contacts.map((contact, index) => (
            <TechnicianCard
              key={contact.id}
              priority={index + 1}
              name={contact.name}
              phoneNumber={contact.phone_number}
              available={contact.is_active}
            />
          ))}
        </div>
      </div>

      {/* ================= TRANSFER CONDITIONS ================= */}
      <TransferConditions rules={rules} loading={loading} />
    </div>
  );
}

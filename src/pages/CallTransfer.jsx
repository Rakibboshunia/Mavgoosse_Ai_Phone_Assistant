import React, { useEffect, useState, useContext } from "react";
import TechnicianCard from "../components/TechnicianCard";
import TransferConditions from "../components/TransferConditions";
import {
  getTransferContactsApi,
  getCallTransferRulesApi,
} from "../libs/callTransfer.api";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthContext";

export default function CallTransfer() {
  const { role, getActiveStoreId } = useContext(AuthContext);

  const storeId = getActiveStoreId(); // 🔥 GLOBAL STORE ID

  const [contacts, setContacts] = useState([]);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH CONTACTS ================= */
  const fetchContacts = async () => {
    if (role === "SUPER_ADMIN" && !storeId) return;
    if (!storeId) return;

    try {
      setLoading(true);
      const res = await getTransferContactsApi({ store: storeId });
      setContacts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load transfer contacts");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FETCH RULES ================= */
  const fetchRules = async () => {
    if (role === "SUPER_ADMIN" && !storeId) return;
    if (!storeId) return;

    try {
      setLoading(true);
      const res = await getCallTransferRulesApi({ store: storeId });
      setRules(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load transfer rules");
    } finally {
      setLoading(false);
    }
  };

  /* ================= INITIAL + STORE CHANGE ================= */
  useEffect(() => {
    setContacts([]);
    setRules([]);

    fetchContacts();
    fetchRules();
  }, [storeId]);

  /* ================= EMPTY STATE ================= */
  if (role === "SUPER_ADMIN" && !storeId) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-[#90A1B9]">
        <p>Please select a store from the sidebar to manage call transfers.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ================= TRANSFER CONTACT SECTION ================= */}
      <div className="bg-[#0F172B80] border-2 border-[#2B7FFF33] rounded-2xl overflow-hidden">
        <div className="p-8 border-b border-[#2B7FFF33]">
          <h1 className="text-2xl font-medium text-white mb-2">
            Call Transfer
          </h1>
          <p className="text-sm text-[#90A1B9]">
            Calls will be transferred based on selected conditions
          </p>
        </div>

        <div className="p-8 space-y-4">
          {contacts.length === 0 && !loading && (
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
      <TransferConditions rules={rules} />
    </div>
  );
}

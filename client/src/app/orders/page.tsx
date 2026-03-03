"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface Order {
  _id: string;
  size: string;
  count: number;
  amount: number;
  currency: string;
  status: string;
  orderDate?: string;
  createdAt?: string;
}

export default function OrdersPage() {
  const { user, token, isLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!user || !token) {
      router.push("/merch");
      return;
    }

    const fetchOrders = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/orders/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Failed to load orders");
        }

        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err: any) {
        console.error("Failed to fetch orders:", err);
        setError(err.message || "Failed to load orders");
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [user, token, isLoading, router]);

  const formatDate = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: "url('/nfbackground.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }} className="p-4 sm:p-8 text-black">
      <div className="max-w-4xl mx-auto mt-12 mb-12 relative">
        {/* Title Banner */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10 w-[90%] sm:w-auto">
          <div className="bg-white border-4 border-black px-8 py-3 transform -rotate-2 shadow-comic-lg">
            <h1 className="text-4xl sm:text-5xl font-bangers tracking-wide text-comic-red text-shadow-comic">
              YOUR ORDERS
            </h1>
          </div>
        </div>

        <div className="bg-white border-4 border-black shadow-[12px_12px_0_0_#000] p-6 sm:p-10 pt-16 min-h-[500px]">
          {isLoading || loadingOrders ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="w-16 h-16 border-8 border-comic-blue border-t-comic-red rounded-full animate-spin"></div>
              <p className="font-bangers text-2xl tracking-wider animate-pulse">
                LOADING MISSION DATA...
              </p>
            </div>
          ) : error ? (
            <div className="bg-comic-red text-white p-6 border-4 border-black shadow-comic transform rotate-1">
              <p className="font-bangers text-2xl mb-2 text-shadow-comic">SYSTEM FAILURE!</p>
              <p className="font-roboto font-bold">{error}</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center">
              <div className="text-6xl mb-4">🤔</div>
              <p className="font-bangers text-3xl mb-4">NO MISSIONS ACCOMPLISHED YET!</p>
              <p className="font-roboto font-medium text-gray-600 mb-8">
                Your order history is as empty as deep space.
              </p>
              <button
                onClick={() => router.push("/merch")}
                className="inline-block px-8 py-3 border-4 border-black bg-comic-blue hover:bg-blue-400 text-white font-bangers text-2xl tracking-wider shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-y-[2px] hover:translate-x-[2px] transition-all"
              >
                GO TO MERCH
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <div
                  key={order._id}
                  className={`border-4 border-black p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-[6px_6px_0_0_#000] transition-transform hover:-translate-y-1 ${index % 2 === 0 ? "bg-cyan-50 rotate-[-0.5deg]" : "bg-pink-50 rotate-[0.5deg]"
                    }`}
                >
                  <div className="mb-4 sm:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-black text-white font-bangers px-3 py-1 text-xl border-2 border-black transform -skew-x-12">
                        #{index + 1}
                      </span>
                      <h3 className="font-bangers text-2xl sm:text-3xl">
                        NF Comic Tee
                      </h3>
                    </div>

                    <div className="font-roboto font-bold text-gray-800 space-y-1 ml-1 sm:ml-4">
                      <p>SIZE: <span className="bg-comic-yellow px-2 py-0.5 border-2 border-black">{order.size}</span></p>
                      <p>QTY: <span className="bg-white px-2 py-0.5 border-2 border-black">{order.count}</span></p>
                      <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                        <span className="inline-block w-2 h-2 bg-black rounded-full"></span>
                        {formatDate(order.orderDate || order.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row sm:flex-col items-end justify-between sm:justify-center border-t-4 border-black sm:border-t-0 sm:border-l-4 pt-4 sm:pt-0 sm:pl-6">
                    <div className="mb-2 text-left sm:text-right">
                      <span className="block font-roboto text-sm font-bold text-gray-500 uppercase tracking-widest">Total</span>
                      <span className="font-bangers text-3xl text-comic-red">
                        ₹{(order.amount / 100).toFixed(2)}
                      </span>
                    </div>

                    <div className={`mt-2 px-4 py-2 border-4 border-black font-bangers text-xl tracking-wider uppercase transform rotate-2 ${order.status.toLowerCase() === 'delivered' ? 'bg-green-400 text-black' :
                      order.status.toLowerCase() === 'processing' ? 'bg-yellow-400 text-black' :
                        'bg-white text-black'
                      }`}>
                      {order.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


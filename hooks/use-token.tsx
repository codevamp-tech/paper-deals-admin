import { jwtDecode } from "jwt-decode";

interface MyTokenPayload {
  data: {
    user_id: string;
    user_name: string;
    user_role: number;
    phone_no: string;
    approved: number;
  };
  exp?: number;
  iat?: number;
}

export function getUserFromToken() {
  if (typeof window === "undefined") return null; // ✅ Prevent SSR crash

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<MyTokenPayload>(token);
    return decoded.data; // { user_id, user_name, user_role, phone_no, approved }
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}

"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/authContext/AuthContext";
import { toast } from "react-toastify";

export default function Page() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      router.push("/");
      toast.error("Сторінка доступа лише адміністратору!");
    }
  }, [user]);

  return <></>;
}

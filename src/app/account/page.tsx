"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/authContext/AuthContext";
import { toast } from "react-toastify";

type Props = {};

export default function Page({}: Props) {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      router.push("/");
      toast.error(
        "Сторінка акаунту доступна лише зареєстрованим користувачам!"
      );
    }
  }, [user]);

  return <></>;
}

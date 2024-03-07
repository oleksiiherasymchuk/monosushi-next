"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useAuthContext } from "@/contexts/authContext/AuthContext";

type Props = {};

export default function Page({}: Props) {
  const { user } = useAuthContext()
  // const isAuth = useTypedSelector((state) => state.auth.isAuthenticated);
  // const user = useTypedSelector((state) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      router.push("/");
      // alert('Account page only for authored users')
    }
  }, [user]);

  return <></>;
}

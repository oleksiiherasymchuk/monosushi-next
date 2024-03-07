import { useEffect } from "react";
// import { NextSeo } from 'next-seo';
import { Metadata } from "next";

export const useMetadata = (metadata: Metadata) => {
  useEffect(() => {
    // NextSeo.setOptions(metadata);
  }, [metadata]);
};

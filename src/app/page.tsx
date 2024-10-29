"use client";
import dynamic from "next/dynamic";

const DynamicHomeScreen = dynamic(() => import("@/screens/homepage"), {
  ssr: false,
});

export default function Home() {
  return <DynamicHomeScreen />;
}

import dynamic from "next/dynamic";

const DynamicHomeScreen = dynamic(() => import("@/screens/homepage"));

export default function Home() {
  return <DynamicHomeScreen />;
}

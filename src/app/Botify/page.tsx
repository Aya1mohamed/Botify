"use client";
import React, { useState } from "react";
import SideBar2 from "@/components/SideBar2/SideBar2";
import IntegrationHeader from "@/components/IntegrationHeader/IntegrationHeader";
import IntegrationCardList from "@/components/IntegrationCardList/IntegrationCardList";

const tabs = [
  { key: "conversations", label: "Conversations" },
  { key: "integrations", label: "Integrations" },
  { key: "settings", label: "Settings" },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState("conversations");

  const renderContent = () => {
    switch (activeTab) {
      case "integrations":
        return (
          <>
            <IntegrationHeader />
            <IntegrationCardList />
          </>
        );
      case "settings":
        return <div>Settings content goes here</div>;
      default:
        return <div>Conversations content goes here</div>;
    }
  };

  return (
    <div className="flex min-h-screen">
      <SideBar2
        selected={activeTab}
        onSelect={(key: string) => setActiveTab(key)}
      />
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
}

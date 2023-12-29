"use client";

import { useAddEditLinkModal } from "@/components/AddLinkModal";

function DashboardPage() {
  const { AddEditLinkModal, AddEditLinkButton } = useAddEditLinkModal();
  return (
    <div>
      <AddEditLinkModal />
      <div className="flex h-36 items-center border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl text-gray-600">My Links</h1>
            <AddEditLinkButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

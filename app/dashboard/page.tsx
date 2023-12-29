"use client";

import { useAddEditLinkModal } from "@/components/AddLinkModal";
import { list } from "../actions";

async function DashboardPage() {

  const { AddEditLinkModal, AddEditLinkButton } = useAddEditLinkModal();

  const links = await list("clqq94ikj000010zsvs35pzwm");

  return (
    <div>
      <AddEditLinkModal />
      <div className="flex h-36 items-center border-b border-gray-200 bg-white">
        <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl text-gray-600">My Links</h1>
            <AddEditLinkButton />
            {links.data.map((link, idx) => (
              <div key={idx}>{link.clicks}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

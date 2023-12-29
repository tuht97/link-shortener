"use client";

import { useAddEditLinkModal } from "@/components/AddLinkModal";
import { list } from "../actions";
import Link from "next/link";
import { BarChart } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";

// eslint-disable-next-line @next/next/no-async-client-component
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
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-screen-xl px-2.5 lg:px-20">
        {links.data.map((link, idx) => (
          <div
            key={idx}
            className="border-gray-50 relative rounded-lg border-2 bg-white p-3 pr-1 shadow transition-all hover:shadow-md sm:p-4 m-3"
          >
            <div className="flex justify-between">
              <div className="flex">
                <div className="flex justify-center items-center mr-3">
                  <Avatar className="relative h-8 w-8">
                    <Image
                      src="https://picsum.photos/200/300"
                      fill
                      alt="test"
                      className="rounded-full object-cover"
                    />
                  </Avatar>
                </div>
                <div className="flex-col">
                  <Link
                    className="w-full max-w-[140px] truncate text-sm font-semibold text-blue-800 sm:max-w-[300px] sm:text-base md:max-w-[360px] xl:max-w-[500px]"
                    href={`http://localhost:3000/${link.slug}`}
                  >
                    {`http://localhost:3000/${link.slug}`}
                  </Link>
                  <div>{link.url}</div>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <div className="flex justify-center items-center">
                  <BarChart className="h-4 w-4" />
                  Clicks:&nbsp;
                </div>
                <div>{link.clicks}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;

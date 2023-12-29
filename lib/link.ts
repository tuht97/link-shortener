import prisma from "@/lib/prisma";

import moment from "moment";
import { hashPassword } from "./password";

interface CreateLinkDTO {
  userId: string;
  url: string;
  slug: string;
  androidTargeting?: string;
  iOSTargeting?: string;
  password?: string;
}

interface UpdateLinkDTO {
  url: string;
  androidTargeting?: string | null;
  iOSTargeting?: string | null;
  password?: string | null;
}

export const link = {
  create: async (input: CreateLinkDTO) => {
    const { url, slug, password } = input;
    // const myURL = require('node:url').parse(url);

    const existed_link_with_slug = await prisma.link.findUnique({
      where: {
        slug: slug,
      },
    });

    if (existed_link_with_slug) {
      return { error: true, message: "invalid slug", data: null };
    }

    if (password) {
      input["password"] = hashPassword(password);
    }

    let data = {
      ...input,
      domain: " ",
      key: " ",
    };

    const link = await prisma.link.create({ data });

    return { error: false, message: "success", data: link };
  },

  getAll: async ({ userId, search }: { userId: string; search?: string }) => {
    let filter: any = {
      userId: userId,
    };

    if (search) {
      filter["url"] = {
        search,
      };
    }

    const links = await prisma.link.findMany({
      where: filter,
    });

    return { error: false, message: "success", data: links };
  },

  increaseCount: async ({ linkId }: { linkId: string }) => {
    let link = await prisma.link.findUnique({
      where: {
        id: linkId,
      },
    });

    if (!link) {
      return { error: true, message: "not found", data: null };
    }

    if (
      !link.lastClicked ||
      moment(link.lastClicked).add(5, "minutes").isSameOrBefore(moment())
    ) {
      link = await prisma.link.update({
        where: {
          id: linkId,
        },
        data: {
          clicks: { increment: 1 },
          lastClicked: moment().toISOString(),
        },
      });
    }

    return { error: false, message: "success", data: link };
  },

  getOne: async ({ linkId }: { linkId: string }) => {
    const link = await prisma.link.findUnique({
      where: {
        id: linkId,
      },
    });

    if (!link) {
      return { error: true, message: "not found", data: null };
    }

    return { error: false, message: "success", data: link };
  },

  getBySlug: async ({ slug }: { slug: string }) => {
    const link = await prisma.link.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!link) {
      return { error: true, message: "not found", data: null };
    }

    return { error: false, message: "success", data: link };
  },

  update: async (linkId: string, input: UpdateLinkDTO) => {
    const { url, password } = input;
    // const myURL = require('node:url').parse(url);

    let link = await prisma.link.findUnique({
      where: {
        id: linkId,
      },
    });

    if (!link) {
      return { error: true, message: "not found", data: null };
    }

    if (password) {
      input["password"] = hashPassword(password);
    }

    link = await prisma.link.update({
      where: {
        id: linkId,
      },
      data: {
        ...input,
        domain: " ",
        key: " ",
      },
    });

    return { error: false, message: "success", data: link };
  },
};

import { link } from "@/lib/link";

export async function list(userId:string, search?:string) {
    return await link.getAll({userId,search});
}
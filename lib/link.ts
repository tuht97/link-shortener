import prisma from "@/lib/prisma";

import moment from 'moment';

export const link = {
    create: async ({ userId , url, slug }: {userId:string, url:string, slug:string}) => {
        
        const myURL = require('node:url').parse(url);
        
        const existed_link_with_slug = await prisma.link.findUnique({
            where: {
                slug: slug,
            },
        });
        
        if (existed_link_with_slug) {
            return {error: true, message:"invalid slug", data:null};
        }
               
        let data = {
            domain: myURL.host,
            key: myURL.pathname,
            url,
            slug,
            userId
        };

        const link = await prisma.link.create({data});

        return {error: false, message:"success", data:link};
    },

    getAll: async ({ userId, search }: {userId:string, search?: string}) => {        
        let filter : any =  {
            userId: userId,
        };

        if (search){
            filter["url"]= {
                search,
            }
        }

        const links = await prisma.link.findMany({
            where: filter
        });

        return {error: false, message:"success", data:links};
    },

    increaseCount: async ({ linkId }: {linkId:string}) => {
        let link = await prisma.link.findUnique({
            where: {
                id: linkId,
            },
        });

        if (!link.lastClicked || moment(link.lastClicked).add(5,"minutes").isSameOrBefore(moment()) ){
            link = await prisma.link.update({
                where: {
                    id: linkId,
                },
                data: {
                    clicks: {increment: 1},
                    lastClicked: moment()  
                },
            });
        }

        return {error: false, message: "success", data: link};
    },

    getOne: async ({ linkId }: {linkId: string}) => {        
        const link = await prisma.link.findUnique({
            where: {
                id: linkId,
            },
        });

        if (!link){  
            return {error: true, message:"not found", data: null};
        }

        return {error: false, message:"success", data: link};
    },
};

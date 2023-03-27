import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    // get notes from prisma
    const notes = await prisma.note.findMany({
        orderBy: {
            // sort by createdAt in descending order
            createdAt: "desc",
        },
    });

    // return notes as JSON
    res.status(200).json({ success: true, data: notes })

}
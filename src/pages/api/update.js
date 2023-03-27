import prisma from "@/lib/prisma";

export default async function handle(req, res) {
    const { id, title, content } = req.body;
    const note = await prisma.note.update({
        where: { id: Number(id) },
        data: { title, content },
    });
    res.status(200).json({success: true, data: note});
}
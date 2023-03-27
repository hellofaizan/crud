import prisma from "@/lib/prisma";

export default async function handle(req, res) {
    const { id } = req.body;
    const note = await prisma.note.delete({
        where: { id: Number(id) },
    });
    res.status(200).json({success: true, data: note});
}
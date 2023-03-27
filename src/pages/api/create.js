import prisma from '@/lib/prisma'

export default async function handler(req, res) {
  const { title, content } = req.body

  try {
    const result = await prisma.note.create({
      data: {
        title,
        content
      }
    })

    res.status(200).json({ success: true, data: result })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}

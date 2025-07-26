import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/db"
import { Document } from "@/models/Document"
import { getAuthUser } from "@/lib/getAuthUser"

export async function GET(req) {
  try {
    await connectToDB()
    const user = await getAuthUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const caseId = searchParams.get("caseId")
    const bookingId = searchParams.get("bookingId")
    const shared = searchParams.get("shared") === "true"
    const limit = parseInt(searchParams.get("limit")) || 20

    let query = { status: "active" }

    if (shared) {
      // Get documents shared with the user
      query["sharedWith.userId"] = user.id
    } else {
      // Get documents uploaded by the user
      query.uploadedBy = user.id
    }

    if (caseId) {
      query.caseId = caseId
    }

    if (bookingId) {
      query.bookingId = bookingId
    }

    const documents = await Document.find(query)
      .populate("uploadedBy", "firstName lastName")
      .populate("sharedWith.userId", "firstName lastName")
      .sort({ createdAt: -1 })
      .limit(limit)

    return NextResponse.json({
      success: true,
      documents
    })
  } catch (err) {
    console.error("Error fetching documents:", err)
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    await connectToDB()
    const user = await getAuthUser()
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { title, description, fileName, fileUrl, fileSize, fileType, caseId, bookingId, tags, sharedWith } = body

    if (!title || !fileName || !fileUrl || !fileSize || !fileType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (fileSize > maxSize) {
      return NextResponse.json({ error: "File size too large. Maximum size is 10MB" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ["pdf", "doc", "docx", "jpg", "jpeg", "png", "txt"]
    const fileExtension = fileType.toLowerCase()
    if (!allowedTypes.includes(fileExtension)) {
      return NextResponse.json({ error: "File type not allowed" }, { status: 400 })
    }

    const documentData = {
      title,
      description: description || "",
      fileName,
      fileUrl,
      fileSize,
      fileType: fileExtension,
      uploadedBy: user.id,
      tags: tags || []
    }

    if (caseId) {
      documentData.caseId = caseId
    }

    if (bookingId) {
      documentData.bookingId = bookingId
    }

    if (sharedWith && Array.isArray(sharedWith)) {
      documentData.sharedWith = sharedWith.map(share => ({
        userId: share.userId,
        permission: share.permission || "view"
      }))
    }

    const document = await Document.create(documentData)

    const populatedDocument = await Document.findById(document._id)
      .populate("uploadedBy", "firstName lastName")
      .populate("sharedWith.userId", "firstName lastName")

    return NextResponse.json({
      success: true,
      document: populatedDocument,
      message: "Document uploaded successfully"
    })
  } catch (err) {
    console.error("Error uploading document:", err)
    return NextResponse.json({ error: "Failed to upload document" }, { status: 500 })
  }
} 
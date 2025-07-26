"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import { useToast } from "@/components/ui/toast"

export default function ReviewForm({ lawyerId, onReviewSubmitted }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (rating === 0) {
      addToast("Please select a rating", "error")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lawyerId, rating, comment }),
      })

      const data = await res.json()

      if (res.ok) {
        addToast("Review submitted successfully!", "success")
        setRating(0)
        setComment("")
        if (onReviewSubmitted) {
          onReviewSubmitted()
        }
      } else {
        addToast(data.message || "Failed to submit review", "error")
      }
    } catch (err) {
      addToast("An error occurred. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Write a Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Rating</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`p-1 transition-colors ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                <Star className="h-6 w-6 fill-current" />
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : "Select a rating"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Comment (optional)</label>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this lawyer..."
            rows={3}
            maxLength={1000}
          />
          <p className="text-xs text-gray-500 mt-1">
            {comment.length}/1000 characters
          </p>
        </div>

        <Button type="submit" disabled={loading || rating === 0} className="w-full">
          {loading ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div>
  )
} 
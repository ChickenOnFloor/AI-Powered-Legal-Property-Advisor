"use client"

import { createContext, useContext, useState } from "react"
import { CheckCircle, XCircle, Info, X } from "lucide-react"

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = "info") => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 5000)
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function Toast({ id, message, type, onRemove }) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
  }

  const colors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  }

  const Icon = icons[type]

  return (
    <div className={`flex items-center space-x-3 p-4 rounded-lg border ${colors[type]} shadow-lg max-w-sm`}>
      <Icon className="h-5 w-5 flex-shrink-0" />
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={() => onRemove(id)}
        className="text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
} 
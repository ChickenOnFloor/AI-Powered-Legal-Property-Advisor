"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Smartphone,
  Download,
  Share2,
  Star,
  CheckCircle,
  ArrowRight,
  X,
  ExternalLink
} from "lucide-react"

export default function MobileApp() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if user is on mobile
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(mobile)
      
      // Show mobile app prompt for mobile users who haven't dismissed it
      if (mobile && !isDismissed && !localStorage.getItem('mobileAppDismissed')) {
        setIsVisible(true)
      }
    }

    // Check if app is installed
    const checkInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          window.navigator.standalone === true) {
        setIsInstalled(true)
        setIsVisible(false)
      }
    }

    checkMobile()
    checkInstalled()

    // Listen for display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)')
    mediaQuery.addListener(checkInstalled)

    return () => mediaQuery.removeListener(checkInstalled)
  }, [isDismissed])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem('mobileAppDismissed', 'true')
  }

  const handleInstall = () => {
    // Trigger PWA install prompt
    if ('serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window) {
      // The install prompt will be handled by the service worker
      window.dispatchEvent(new Event('beforeinstallprompt'))
    }
    
    // For now, just show a message
    alert('Install prompt will appear if available. You can also add to home screen manually.')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Legal Property Advisor',
          text: 'Get instant AI-powered legal guidance and connect with verified property lawyers.',
          url: window.location.href
        })
      } catch (error) {
        console.log('Share cancelled or failed')
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (!isVisible || isInstalled) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
        >
          <Card className="bg-white/95 backdrop-blur-md border-2 border-blue-200 shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Smartphone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">Legal Property Advisor</h3>
                      <Badge variant="secondary" className="text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        Free
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Install our app for a better experience
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>Offline support</span>
                      <span>•</span>
                      <span>Push notifications</span>
                      <span>•</span>
                      <span>Faster loading</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2 mt-4">
                <Button
                  onClick={handleInstall}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Install App
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="border-gray-300"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-3 text-xs text-gray-500 text-center">
                Tap "Install App" and then "Add to Home Screen"
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Mobile Navigation Component
export function MobileNavigation({ currentPath }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    setIsVisible(isMobile)
  }, [])

  const navItems = [
    { path: '/client/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/client/ai-chat', label: 'AI Chat', icon: '🤖' },
    { path: '/client/lawyers', label: 'Lawyers', icon: '👨‍💼' },
    { path: '/documents', label: 'Documents', icon: '📄' },
    { path: '/profile', label: 'Profile', icon: '👤' }
  ]

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 md:hidden"
    >
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant={currentPath === item.path ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center space-y-1 h-auto py-2 px-3"
            onClick={() => window.location.href = item.path}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </motion.div>
  )
}

// Mobile Header Component
export function MobileHeader({ title, onBack, actions }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-b transition-all duration-200 md:hidden ${
        isScrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
            </Button>
          )}
          <h1 className="font-semibold text-lg text-gray-900">{title}</h1>
        </div>
        
        {actions && (
          <div className="flex items-center space-x-2">
            {actions}
          </div>
        )}
      </div>
    </motion.header>
  )
}

// Mobile Pull to Refresh Component
export function MobilePullToRefresh({ onRefresh, children }) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [startY, setStartY] = useState(0)

  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY)
    }
  }

  const handleTouchMove = (e) => {
    if (window.scrollY === 0 && startY > 0) {
      const currentY = e.touches[0].clientY
      const distance = Math.max(0, currentY - startY)
      setPullDistance(Math.min(distance * 0.5, 100))
    }
  }

  const handleTouchEnd = async () => {
    if (pullDistance > 50) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
      }
    }
    setPullDistance(0)
    setStartY(0)
  }

  return (
    <div
      className="relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {pullDistance > 0 && (
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center py-4 z-10">
          <motion.div
            animate={{ rotate: isRefreshing ? 360 : 0 }}
            transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0 }}
            className="text-blue-600"
          >
            <ArrowRight className="h-6 w-6" />
          </motion.div>
        </div>
      )}
      
      <motion.div
        style={{ transform: `translateY(${pullDistance}px)` }}
        className="transition-transform duration-200"
      >
        {children}
      </motion.div>
    </div>
  )
} 
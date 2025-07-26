"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Settings,
  Monitor,
  Volume2,
  VolumeX,
  Check,
  X,
  RotateCcw,
  Save,
  Camera,
  Headphones,
  Wifi,
  WifiOff
} from "lucide-react"
import { useToast } from "@/components/ui/toast"

export default function VideoCallSettings({ onClose }) {
  const [devices, setDevices] = useState({
    cameras: [],
    microphones: [],
    speakers: []
  })
  const [selectedDevices, setSelectedDevices] = useState({
    camera: '',
    microphone: '',
    speaker: ''
  })
  const [settings, setSettings] = useState({
    videoEnabled: true,
    audioEnabled: true,
    videoQuality: '720p',
    audioVolume: 80,
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true
  })
  const [testMode, setTestMode] = useState({
    video: false,
    audio: false,
    speaker: false
  })
  const [testStream, setTestStream] = useState(null)
  const [audioLevel, setAudioLevel] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [hasChanges, setHasChanges] = useState(false)

  const testVideoRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const { addToast } = useToast()

  // Load saved settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('videoCallSettings')
    const savedDevices = localStorage.getItem('videoCallDevices')
    
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
    
    if (savedDevices) {
      setSelectedDevices(JSON.parse(savedDevices))
    }
  }, [])

  // Enumerate devices
  useEffect(() => {
    const enumerateDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        
        const cameras = devices.filter(device => device.kind === 'videoinput')
        const microphones = devices.filter(device => device.kind === 'audioinput')
        const speakers = devices.filter(device => device.kind === 'audiooutput')

        setDevices({ cameras, microphones, speakers })

        // Set default selections if not already set
        if (!selectedDevices.camera && cameras.length > 0) {
          setSelectedDevices(prev => ({ ...prev, camera: cameras[0].deviceId }))
        }
        if (!selectedDevices.microphone && microphones.length > 0) {
          setSelectedDevices(prev => ({ ...prev, microphone: microphones[0].deviceId }))
        }
        if (!selectedDevices.speaker && speakers.length > 0) {
          setSelectedDevices(prev => ({ ...prev, speaker: speakers[0].deviceId }))
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Error enumerating devices:', error)
        addToast("Unable to access device list", "error")
        setIsLoading(false)
      }
    }

    enumerateDevices()
  }, [])

  // Handle device changes
  const handleDeviceChange = (deviceType, deviceId) => {
    setSelectedDevices(prev => ({ ...prev, [deviceType]: deviceId }))
    setHasChanges(true)
  }

  // Handle setting changes
  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }))
    setHasChanges(true)
  }

  // Test video
  const toggleVideoTest = async () => {
    if (testMode.video) {
      if (testStream) {
        testStream.getTracks().forEach(track => track.stop())
        setTestStream(null)
      }
      setTestMode(prev => ({ ...prev, video: false }))
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: selectedDevices.camera ? { exact: selectedDevices.camera } : undefined }
        })
        
        setTestStream(stream)
        if (testVideoRef.current) {
          testVideoRef.current.srcObject = stream
        }
        setTestMode(prev => ({ ...prev, video: true }))
        addToast("Video test started", "success")
      } catch (error) {
        console.error('Error starting video test:', error)
        addToast("Failed to start video test", "error")
      }
    }
  }

  // Test microphone
  const toggleAudioTest = async () => {
    if (testMode.audio) {
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
      setTestMode(prev => ({ ...prev, audio: false }))
      setAudioLevel(0)
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: selectedDevices.microphone ? { exact: selectedDevices.microphone } : undefined,
            echoCancellation: settings.echoCancellation,
            noiseSuppression: settings.noiseSuppression,
            autoGainControl: settings.autoGainControl
          }
        })

        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const analyser = audioContext.createAnalyser()
        const source = audioContext.createMediaStreamSource(stream)

        source.connect(analyser)
        analyser.fftSize = 256
        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        audioContextRef.current = audioContext
        analyserRef.current = analyser

        const updateAudioLevel = () => {
          if (testMode.audio) {
            analyser.getByteFrequencyData(dataArray)
            const average = dataArray.reduce((a, b) => a + b) / bufferLength
            setAudioLevel(average)
            requestAnimationFrame(updateAudioLevel)
          }
        }

        updateAudioLevel()
        setTestMode(prev => ({ ...prev, audio: true }))
        addToast("Audio test started", "success")
      } catch (error) {
        console.error('Error starting audio test:', error)
        addToast("Failed to start audio test", "error")
      }
    }
  }

  // Test speaker
  const toggleSpeakerTest = () => {
    if (testMode.speaker) {
      setTestMode(prev => ({ ...prev, speaker: false }))
    } else {
      // Create a test tone
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(440, audioContext.currentTime) // A4 note
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 2)

      setTestMode(prev => ({ ...prev, speaker: true }))
      addToast("Speaker test started", "success")

      setTimeout(() => {
        setTestMode(prev => ({ ...prev, speaker: false }))
      }, 2000)
    }
  }

  // Save settings
  const saveSettings = () => {
    localStorage.setItem('videoCallSettings', JSON.stringify(settings))
    localStorage.setItem('videoCallDevices', JSON.stringify(selectedDevices))
    setHasChanges(false)
    addToast("Settings saved successfully", "success")
  }

  // Reset settings
  const resetSettings = () => {
    const defaultSettings = {
      videoEnabled: true,
      audioEnabled: true,
      videoQuality: '720p',
      audioVolume: 80,
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true
    }
    
    setSettings(defaultSettings)
    setHasChanges(true)
    addToast("Settings reset to defaults", "info")
  }

  // Get device name
  const getDeviceName = (device) => {
    return device.label || `${device.kind} ${device.deviceId.slice(0, 8)}`
  }

  // Get audio level color
  const getAudioLevelColor = (level) => {
    if (level < 30) return 'bg-red-500'
    if (level < 60) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-center">Loading devices...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <CardTitle>Video Call Settings</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Device Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Devices</h3>
            
            {/* Camera Selection */}
            <div className="space-y-2">
              <Label htmlFor="camera">Camera</Label>
              <Select
                value={selectedDevices.camera}
                onValueChange={(value) => handleDeviceChange('camera', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select camera" />
                </SelectTrigger>
                <SelectContent>
                  {devices.cameras.map((camera) => (
                    <SelectItem key={camera.deviceId} value={camera.deviceId}>
                      <div className="flex items-center space-x-2">
                        <Camera className="h-4 w-4" />
                        <span>{getDeviceName(camera)}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Microphone Selection */}
            <div className="space-y-2">
              <Label htmlFor="microphone">Microphone</Label>
              <Select
                value={selectedDevices.microphone}
                onValueChange={(value) => handleDeviceChange('microphone', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select microphone" />
                </SelectTrigger>
                <SelectContent>
                  {devices.microphones.map((mic) => (
                    <SelectItem key={mic.deviceId} value={mic.deviceId}>
                      <div className="flex items-center space-x-2">
                        <Mic className="h-4 w-4" />
                        <span>{getDeviceName(mic)}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Speaker Selection */}
            <div className="space-y-2">
              <Label htmlFor="speaker">Speaker</Label>
              <Select
                value={selectedDevices.speaker}
                onValueChange={(value) => handleDeviceChange('speaker', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select speaker" />
                </SelectTrigger>
                <SelectContent>
                  {devices.speakers.map((speaker) => (
                    <SelectItem key={speaker.deviceId} value={speaker.deviceId}>
                      <div className="flex items-center space-x-2">
                        <Headphones className="h-4 w-4" />
                        <span>{getDeviceName(speaker)}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Video Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Video Settings</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Enable Video</Label>
                <p className="text-sm text-gray-500">Show your camera during calls</p>
              </div>
              <Switch
                checked={settings.videoEnabled}
                onCheckedChange={(checked) => handleSettingChange('videoEnabled', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label>Video Quality</Label>
              <Select
                value={settings.videoQuality}
                onValueChange={(value) => handleSettingChange('videoQuality', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="480p">480p (Low)</SelectItem>
                  <SelectItem value="720p">720p (Medium)</SelectItem>
                  <SelectItem value="1080p">1080p (High)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Audio Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Audio Settings</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Enable Audio</Label>
                <p className="text-sm text-gray-500">Transmit your microphone</p>
              </div>
              <Switch
                checked={settings.audioEnabled}
                onCheckedChange={(checked) => handleSettingChange('audioEnabled', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label>Audio Volume: {settings.audioVolume}%</Label>
              <Slider
                value={[settings.audioVolume]}
                onValueChange={([value]) => handleSettingChange('audioVolume', value)}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Echo Cancellation</Label>
                <p className="text-sm text-gray-500">Reduce echo from speakers</p>
              </div>
              <Switch
                checked={settings.echoCancellation}
                onCheckedChange={(checked) => handleSettingChange('echoCancellation', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Noise Suppression</Label>
                <p className="text-sm text-gray-500">Reduce background noise</p>
              </div>
              <Switch
                checked={settings.noiseSuppression}
                onCheckedChange={(checked) => handleSettingChange('noiseSuppression', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Auto Gain Control</Label>
                <p className="text-sm text-gray-500">Automatically adjust microphone level</p>
              </div>
              <Switch
                checked={settings.autoGainControl}
                onCheckedChange={(checked) => handleSettingChange('autoGainControl', checked)}
              />
            </div>
          </div>

          <Separator />

          {/* Test Your Setup */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Test Your Setup</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Video Test */}
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Video className="h-4 w-4" />
                      <span className="font-medium">Video Test</span>
                    </div>
                    
                    {testMode.video && (
                      <div className="relative w-full h-32 bg-gray-900 rounded-lg overflow-hidden">
                        <video
                          ref={testVideoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <Button
                      onClick={toggleVideoTest}
                      variant={testMode.video ? "destructive" : "outline"}
                      size="sm"
                      className="w-full"
                    >
                      {testMode.video ? "Stop Test" : "Test Video"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Audio Test */}
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Mic className="h-4 w-4" />
                      <span className="font-medium">Microphone Test</span>
                    </div>
                    
                    {testMode.audio && (
                      <div className="space-y-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-100 ${getAudioLevelColor(audioLevel)}`}
                            style={{ width: `${(audioLevel / 255) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 text-center">
                          Audio Level: {Math.round((audioLevel / 255) * 100)}%
                        </p>
                      </div>
                    )}
                    
                    <Button
                      onClick={toggleAudioTest}
                      variant={testMode.audio ? "destructive" : "outline"}
                      size="sm"
                      className="w-full"
                    >
                      {testMode.audio ? "Stop Test" : "Test Microphone"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Speaker Test */}
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Headphones className="h-4 w-4" />
                      <span className="font-medium">Speaker Test</span>
                    </div>
                    
                    {testMode.speaker && (
                      <div className="flex items-center justify-center h-8">
                        <div className="animate-pulse text-blue-600">
                          <Volume2 className="h-6 w-6" />
                        </div>
                      </div>
                    )}
                    
                    <Button
                      onClick={toggleSpeakerTest}
                      variant={testMode.speaker ? "destructive" : "outline"}
                      size="sm"
                      className="w-full"
                    >
                      {testMode.speaker ? "Playing..." : "Test Speaker"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex space-x-2">
              <Button
                onClick={resetSettings}
                variant="outline"
                size="sm"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Defaults
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Button
                onClick={onClose}
                variant="outline"
                size="sm"
              >
                Cancel
              </Button>
              <Button
                onClick={saveSettings}
                disabled={!hasChanges}
                size="sm"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </motion.div>
    </div>
  )
} 
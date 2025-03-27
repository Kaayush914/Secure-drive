"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapIcon, AlertTriangle, Info } from "lucide-react"

export default function MapPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInitializedRef = useRef(false)

  useEffect(() => {
    // Only initialize the map if it hasn't been initialized yet
    if (typeof window !== "undefined" && !mapInitializedRef.current) {
      // Create a global window.initMap function that will be called by the map.js script
      ;(window as any).initMapFromReact = () => {
        if (mapContainerRef.current && typeof (window as any).initMap === "function") {
          ;(window as any).initMap()
          mapInitializedRef.current = true
        }
      }

      // Load the map script dynamically
      const script = document.createElement("script")
      script.src = "/map.js"
      script.async = true
      script.onload = (window as any).initMapFromReact
      document.body.appendChild(script)

      // Add the necessary Leaflet CSS
      const leafletCSS = document.createElement("link")
      leafletCSS.rel = "stylesheet"
      leafletCSS.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      document.head.appendChild(leafletCSS)

      // Add the Leaflet.heat plugin
      const heatScript = document.createElement("script")
      heatScript.src = "https://unpkg.com/leaflet.heat@0.2.0/dist/leaflet-heat.js"
      heatScript.async = true
      document.body.appendChild(heatScript)

      // Add Leaflet JS
      const leafletJS = document.createElement("script")
      leafletJS.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      leafletJS.async = true
      document.body.appendChild(leafletJS)
    }

    return () => {
      // Clean up the global function when the component unmounts
      if (typeof window !== "undefined") {
        delete (window as any).initMapFromReact
      }
    }
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Accident Map</h1>
        <p className="text-muted-foreground">View accident-prone areas and your location on the map</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>India Road Accident Heatmap</CardTitle>
          <CardDescription>Real-time visualization of accident-prone areas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Map container */}
            <div
              id="map"
              ref={mapContainerRef}
              className="w-full h-[600px] rounded-md border"
              style={{ zIndex: 0 }}
            ></div>

            {/* Custom controls that will be positioned over the map */}
            <div className="absolute top-4 right-4 z-10 bg-white p-2 rounded-md shadow-md">
              <Button size="sm" className="mb-2 w-full" onClick={() => (window as any).showMyLocation?.()}>
                <MapIcon className="mr-2 h-4 w-4" />
                My Location
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={() => (window as any).startLocationTracking?.()}
              >
                Track Location
              </Button>
            </div>

            {/* Safety tips */}
            <div className="mt-4 bg-amber-50 p-4 rounded-md border border-amber-200">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800">Safety Alert</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    The map shows accident-prone areas based on historical data. Use caution when driving through red
                    zones. Enable location tracking to receive real-time alerts when approaching high-risk areas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Use the Map</CardTitle>
          <CardDescription>Features and instructions for the accident map</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge className="bg-red-500">High Risk</Badge>
                <span>Areas with frequent accidents</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-yellow-500">Medium Risk</Badge>
                <span>Areas with occasional accidents</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-blue-500">Low Risk</Badge>
                <span>Areas with few accidents</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                <span className="text-sm">Click on markers to see accident details</span>
              </div>
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                <span className="text-sm">Use the filter buttons to view specific accident types</span>
              </div>
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                <span className="text-sm">Enable location tracking for real-time safety alerts</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


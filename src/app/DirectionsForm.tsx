'use client'

import { useState } from 'react'
import { MapPin, Navigation, AlertTriangle, ArrowRight, CornerDownRight, CornerUpRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Direction = {
  instruction: string;
  distance: string;
  icon: 'straight' | 'right' | 'left';
  isDangerous: boolean;
  alternateRoute?: string;
}

export default function DirectionsForm() {
  const [start, setStart] = useState('')
  const [destination, setDestination] = useState('')
  const [showDirections, setShowDirections] = useState(false)

  const directions: Direction[] = [
    { instruction: "Head north on Broadway", distance: "0.2 miles", icon: "straight", isDangerous: false },
    { instruction: "Turn right onto W 45th St", distance: "0.1 miles", icon: "right", isDangerous: true, alternateRoute: "Consider using W 46th St instead" },
    { instruction: "Turn left onto 7th Ave", distance: "0.3 miles", icon: "left", isDangerous: false },
    { instruction: "Continue straight on 7th Ave", distance: "0.4 miles", icon: "straight", isDangerous: true, alternateRoute: "Use 6th Ave for a safer route" },
    { instruction: "Arrive at your destination", distance: "", icon: "straight", isDangerous: false },
  ]

  const handleGetDirections = () => {
    setShowDirections(true)
  }

  const DirectionIcon = ({ icon }: { icon: Direction['icon'] }) => {
    switch (icon) {
      case 'straight':
        return <ArrowRight className="w-6 h-6" />
      case 'right':
        return <CornerDownRight className="w-6 h-6" />
      case 'left':
        return <CornerUpRight className="w-6 h-6" />
    }
  }

  return (
    <>
      {!showDirections ? (
        <Card className="mb-4 w-full">
          <CardHeader className="p-6">
            <CardTitle className="text-xl break-words">Pedestrian Location:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="text-blue-500 flex-shrink-0" />
                <Input
                  placeholder="Enter starting location"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="flex-grow"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Navigation className="text-green-500 flex-shrink-0" />
                <Input
                  placeholder="Enter destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="flex-grow"
                />
              </div>
              <Button onClick={handleGetDirections} className="w-full">
                Get Directions
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full">
          <CardHeader className="p-6">
            <CardTitle className="text-xl break-words">
              Directions from {start} to {destination}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-6">
              {directions.map((direction, index) => (
                <li key={index} className={`flex items-start space-x-4 ${direction.isDangerous ? 'text-red-500' : ''}`}>
                  <div className="flex-shrink-0 mt-1">
                    <DirectionIcon icon={direction.icon} />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{direction.instruction}</p>
                    {direction.distance && (
                      <Badge variant="secondary" className="mt-1">
                        {direction.distance}
                      </Badge>
                    )}
                    {direction.isDangerous && (
                      <div className="mt-2 text-sm flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1 flex-shrink-0" />
                        <span>Caution: High-risk area for pedestrians</span>
                      </div>
                    )}
                    {direction.alternateRoute && (
                      <p className="mt-1 text-sm text-green-600">
                        Safer option: {direction.alternateRoute}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            <Button onClick={() => setShowDirections(false)} className="w-full mt-6">
              Back to Search
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  )
}
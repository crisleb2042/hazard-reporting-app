import { Suspense } from 'react'
import DirectionsForm from './DirectionsForm'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PedestrianDirectionsPage() {
  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="w-full">
        <CardHeader className="p-6">
          <CardTitle className="text-xl break-words">Accident Prone Detection App</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <DirectionsForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}
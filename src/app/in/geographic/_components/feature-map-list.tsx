import { useCallback } from "react"
import { Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj'

import { TopLocationsLocationsItem } from "@/lib/api/generated/models"
import { FeatureProperties } from "./expense-map"
import { RFeature, ROverlay } from "rlayers"
import { FeatureTooltip } from "./feature-tooltip"


export function FeaturesList({ locations, selectedMerchant, onClick }: { locations: TopLocationsLocationsItem[], selectedMerchant: string | null, onClick: (merchant: string) => void }) {
  const handleFeatureClick = useCallback(
    (merchant: string) =>
      function (this: unknown) {
        onClick(merchant)
      },
    [onClick]
  )

  return (
    locations?.map((location) => {
      if (!location.location?.latitude || !location.location?.longitude) return null

      const merchant = location.merchant ?? ''

      // Geometry memoizada por coordenada — boa prática de performance RLayers
      const geometry = new Point(
        fromLonLat([location.location.longitude, location.location.latitude])
      )

      // Properties ficam no objeto OpenLayers Feature
      // e são lidas pelo sidebar via onVisibleFeaturesChange
      const properties: FeatureProperties = {
        merchant,
        totalAmount: location.totalAmount ?? 0,
        transactionCount: location.transactionCount ?? 0,
        averageAmount: location.averageAmount ?? 0,
        city: location.location.city,
        lat: location.location.latitude,
        lng: location.location.longitude,
      }

      return (
        <RFeature
          key={merchant}
          geometry={geometry}
          properties={properties as unknown as Record<string, unknown>}
          onClick={handleFeatureClick(merchant)}
        >
          <ROverlay>
            <FeatureTooltip
              properties={properties}
              isSelected={selectedMerchant === merchant}
            />
          </ROverlay>
        </RFeature>
      )
    }))

}
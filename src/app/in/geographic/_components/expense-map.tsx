'use client'

import type { Extent } from 'ol/extent'
import { containsCoordinate } from 'ol/extent'
import type MapBrowserEvent from 'ol/MapBrowserEvent'
import type OlMap from 'ol/Map'
import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import { useCallback, useEffect, useRef, useState } from 'react'

import { RControl, RLayerVector, RMap, ROSM, RStyle } from 'rlayers'

import type { TopLocationsLocationsItem } from '@/lib/api/generated/models'
import { BASE_LAT, BASE_LNG } from '@/lib/mocks/generators'
import { FeaturesList } from './feature-map-list'

// Centro padrão: Orleans, SC — fallback enquanto geolocalização não responde
const FALLBACK_CENTER = fromLonLat([BASE_LNG, BASE_LAT])
const DEFAULT_ZOOM = 13

// Tipagem das properties armazenadas diretamente no objeto OpenLayers Feature
export interface FeatureProperties {
  merchant: string
  totalAmount: number
  transactionCount: number
  averageAmount: number
  city?: string
  lat: number
  lng: number
}

interface ExpenseMapProps {
  locations?: TopLocationsLocationsItem[]
  className?: string
  // Callback disparado ao mover/dar zoom no mapa com as features do extent atual
  onVisibleFeaturesChange?: (features: FeatureProperties[]) => void
}




export function ExpenseMap({
  locations = [],
  className,
  onVisibleFeaturesChange,
}: ExpenseMapProps) {
  const mapRef = useRef<RMap | null>(null)
  const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null)

  const notifyVisibleFeatures = useCallback(
    (map: OlMap) => {
      if (!map || !onVisibleFeaturesChange) return

      const extent: Extent = map.getView().calculateExtent(map.getSize())

      const visible = locations
        .filter((loc) => {
          if (!loc.location?.latitude || !loc.location?.longitude) return false
          const coord = fromLonLat([loc.location.longitude, loc.location.latitude])
          return containsCoordinate(extent, coord)
        })
        .map<FeatureProperties>((loc) => ({
          merchant: loc.merchant ?? '',
          totalAmount: loc.totalAmount ?? 0,
          transactionCount: loc.transactionCount ?? 0,
          averageAmount: loc.averageAmount ?? 0,
          city: loc.location?.city,
          lat: loc.location!.latitude!,
          lng: loc.location!.longitude!,
        }))

      onVisibleFeaturesChange(visible)
    },
    [locations, onVisibleFeaturesChange]
  )

  useEffect(() => {
    const map = mapRef.current?.ol
    if (map) notifyVisibleFeatures(map)
  }, [locations, notifyVisibleFeatures])

  const handleMoveEnd = useCallback(
    function (this: unknown, e: MapBrowserEvent<PointerEvent | KeyboardEvent | WheelEvent>) {
      notifyVisibleFeatures(e.map)
    },
    [notifyVisibleFeatures]
  )

  const handleMapClick = useCallback(function (this: unknown, e: MapBrowserEvent<PointerEvent | KeyboardEvent | WheelEvent>) {
    const hit = e.map.hasFeatureAtPixel(e.pixel)
    if (!hit) setSelectedMerchant(null)
  }, [])

  const handleFeatureClick = useCallback(
    (merchant: string) =>
      function (this: unknown) {
        setSelectedMerchant((prev) => prev === merchant ? null : merchant)
      },
    []
  )

  return (
    <div className={`relative ${className}`}>
      <RMap
        ref={mapRef}
        width="100%"
        height="100%"
        initial={{ center: FALLBACK_CENTER, zoom: DEFAULT_ZOOM }}
        onMoveEnd={handleMoveEnd}
        onClick={handleMapClick}
        noDefaultControls
      >
        <ROSM />
        <RControl.RZoom />
        {/* <RControl.RAttribution /> */}

        <RLayerVector zIndex={10}>
          <RStyle.RStyle>
            <RStyle.RCircle radius={9}>
              <RStyle.RFill color="rgba(239, 68, 68, 0.85)" />
              <RStyle.RStroke color="#ffffff" width={2} />
            </RStyle.RCircle>
          </RStyle.RStyle>

          <FeaturesList locations={locations} selectedMerchant={selectedMerchant} onClick={handleFeatureClick} />
        </RLayerVector>
      </RMap>
    </div>
  )
}


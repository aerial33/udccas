'use client'

import * as d3 from 'd3'

import { useEffect, useRef, useState } from 'react'

import { CantonProperties } from '@/blocks/map/map-gironde'

// Définition des types
interface GeoFeature {
  type: 'Feature'
  id?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: { [key: string]: any }
  geometry: {
    type: 'Polygon'
    coordinates: number[][][]
  }
}

export interface GeoData {
  type: 'FeatureCollection'
  features: GeoFeature[]
}

interface TooltipData {
  x: number
  y: number
  content: string
}

interface GeoMapProps {
  geoData: GeoData
  width?: number
  height?: number
  className?: string
  idField?: string
  nameField?: string
  highlightedAreaId?: string | null
  onAreaClick?: (id: string, name: string, extraData?: CantonProperties) => void
  defaultFill?: string
  highlightFill?: string
  hoverFill?: string
  hoverHighlightFill?: string
}

/**
 * A generic GeoMap component using D3.js
 *
 * @param {Object} props Component props
 * @param {Object} props.geoData GeoJSON data to render
 * @param {number} [props.width=800] Width of the map
 * @param {number} [props.height=600] Height of the map
 * @param {string} [props.className=''] Additional CSS classes
 * @param {string} [props.idField='id'] Field name for area ID in properties
 * @param {string} [props.nameField='name'] Field name for area name in properties
 * @param {string|null} [props.highlightedAreaId=null] ID of area to highlight
 * @param {Function} [props.onAreaClick] Callback for area click (id, name)
 * @param {string} [props.defaultFill='#64748b'] Default fill color
 * @param {string} [props.highlightFill='#3b82f6'] Highlight fill color
 * @param {string} [props.hoverFill='#475569'] Hover fill color
 * @param {string} [props.hoverHighlightFill='#2563eb'] Hover highlight fill color
 */
const GeoMap = ({
  geoData,
  width = 800,
  height = 600,
  className = '',
  idField = 'id',
  nameField = 'name',
  highlightedAreaId = null,
  onAreaClick,
  defaultFill = '#64748b',
  highlightFill = '#3b82f6',
  hoverFill = '#475569',
  hoverHighlightFill = '#2563eb',
}: GeoMapProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null)

  useEffect(() => {
    if (!svgRef.current || !geoData) return

    // Clear any existing content
    d3.select(svgRef.current).selectAll('*').remove()

    // Create the SVG element
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('style', 'max-width: 100%; height: auto;')

    // Create a group for the map
    const g = svg.append('g')

    // Define projection
    const projection = d3.geoMercator().fitSize([width, height], geoData)

    // Create a path generator
    const path = d3.geoPath().projection(projection)

    // Draw areas
    g.selectAll('path')
      .data(geoData.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', (d: GeoFeature) => {
        const id = d.properties[idField] || d.id
        return id === highlightedAreaId ? highlightFill : defaultFill
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .attr('class', 'geographic-area')
      .attr('data-id', (d: GeoFeature) => d.properties[idField] || d.id)
      .attr('data-name', (d: GeoFeature) => d.properties[nameField])
      .on('mouseover', function (this: SVGPathElement, event: MouseEvent, d: GeoFeature) {
        const id = d.properties[idField] || d.id
        d3.select(this).attr('fill', id === highlightedAreaId ? hoverHighlightFill : hoverFill)

        const [x, y] = d3.pointer(event)
        setTooltipData({
          x,
          y,
          content: d.properties[nameField],
        })
      })
      .on('mouseout', function (this: SVGPathElement, event: MouseEvent, d: GeoFeature) {
        const id = d.properties[idField] || d.id
        d3.select(this).attr('fill', id === highlightedAreaId ? highlightFill : defaultFill)
        setTooltipData(null)
      })
      .on('click', (event: MouseEvent, d: GeoFeature) => {
        if (onAreaClick) {
          const id = d.properties[idField] || d.id
          const name = d.properties[nameField]
          onAreaClick(id, name, {
            code: d.properties[idField] || d.id,
            nom: d.properties[nameField],
            villes: d.properties.villes,
          })
        }
      })
  }, [
    geoData,
    width,
    height,
    highlightedAreaId,
    onAreaClick,
    idField,
    nameField,
    defaultFill,
    highlightFill,
    hoverFill,
    hoverHighlightFill,
  ])

  return (
    <div className={`relative ${className}`}>
      <svg ref={svgRef} />
      {tooltipData && (
        <div
          className="pointer-events-none absolute z-10 rounded bg-gray-900 px-2 py-1 text-sm text-white transition-all duration-300"
          style={{
            left: `${tooltipData.x + 10}px`,
            top: `${tooltipData.y - 20}px`,
          }}
        >
          {tooltipData.content}
        </div>
      )}
    </div>
  )
}

export default GeoMap

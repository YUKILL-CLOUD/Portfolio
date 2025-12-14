"use client"
import { useRef, useState, useEffect } from "react"

export function GridTrail() {
    const divRef = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [opacity, setOpacity] = useState(0)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!divRef.current) return

            const div = divRef.current
            const rect = div.getBoundingClientRect()

            // Check if mouse is inside the element
            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {
                setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
                setOpacity(1)
            } else {
                setOpacity(0)
            }
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    return (
        <div
            ref={divRef}
            className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        >
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`
                }}
            />
            <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
                style={{ maskImage: `radial-gradient(600px circle at ${position.x}px ${position.y}px, black, transparent)` }}
            />
        </div>
    )
}

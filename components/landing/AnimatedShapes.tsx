"use client"

import { motion } from "framer-motion"

const Shape = ({
    className,
    variants,
    rotation = 0,
    position,
    ...props
}: {
    className: string
    variants: any
    rotation?: number
    position?: any
    [key: string]: any
}) => (
    <motion.svg
        className={`absolute`}
        variants={variants}
        initial="initial"
        animate="animate"
        style={{
            ...position,
            transform: `rotate(${rotation}deg)`,
        }}
        {...props}
    >
        {props.children}
    </motion.svg>
)

export default function AnimatedShapes() {
    const shapeVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: (i: number) => ({
            opacity: 0.6,
            scale: 1,
            transition: {
                delay: i * 0.1,
                duration: 0.8,
                ease: "easeOut",
            },
        }),
    }

    const shapePositions = [
        { top: '10%', left: '5%', rotation: 45 },      // s1
        { top: '15%', right: '8%', rotation: -30 },    // s2  
        { bottom: '20%', left: '12%', rotation: 60 },   // s3
        { top: '35%', right: '15%', rotation: 90 },     // s4
        { bottom: '35%', right: '8%', rotation: -45 },  // s5
        { top: '45%', left: '20%', rotation: 30 },      // s6
        { bottom: '15%', right: '20%', rotation: -60 }, // s7
        { top: '60%', left: '8%', rotation: 120 },      // s8
        { bottom: '40%', left: '35%', rotation: -90 },  // s9
        { top: '70%', right: '30%', rotation: 75 },     // s10
        { bottom: '8%', left: '6%', rotation: -15 },    // s11
    ]

    const shapes = [
        {
            width: "27",
            height: "29",
            position: shapePositions[0],
            path: "M21.15625.60099c4.37954 3.67487 6.46544 9.40612 5.47254 15.03526-.9929 5.62915-4.91339 10.30141-10.2846 12.25672-5.37122 1.9553-11.3776.89631-15.75715-2.77856l2.05692-2.45134c3.50315 2.93948 8.3087 3.78663 12.60572 2.22284 4.297-1.5638 7.43381-5.30209 8.22768-9.80537.79387-4.50328-.8749-9.08872-4.37803-12.02821L21.15625.60099z",
            fill: "#FFD15C"
        },
        {
            width: "26",
            height: "26", 
            position: shapePositions[1],
            path: "M13 3.3541L2.42705 24.5h21.1459L13 3.3541z",
            stroke: "#FF4C60",
            strokeWidth: "3",
            fill: "none"
        },
        {
            width: "30",
            height: "25",
            position: shapePositions[2], 
            path: "M.1436 8.9282C3.00213 3.97706 8.2841.92763 14.00013.92796c5.71605.00032 10.9981 3.04992 13.85641 8 2.8583 4.95007 2.8584 11.0491-.00014 16.00024l-2.77128-1.6c2.28651-3.96036 2.28631-8.84002.00011-12.8002-2.2862-3.96017-6.5124-6.40017-11.08513-6.4-4.57271.00018-8.79872 2.43984-11.08524 6.4002l-2.77128-1.6z",
            fill: "#44D7B6"
        },
        {
            width: "27",
            height: "29",
            position: shapePositions[3],
            path: "M21.15625.60099c4.37954 3.67487 6.46544 9.40612 5.47254 15.03526-.9929 5.62915-4.91339 10.30141-10.2846 12.25672-5.37122 1.9553-11.3776.89631-15.75715-2.77856l2.05692-2.45134c3.50315 2.93948 8.3087 3.78663 12.60572 2.22284 4.297-1.5638 7.43381-5.30209 8.22768-9.80537.79387-4.50328-.8749-9.08872-4.37803-12.02821L21.15625.60099z",
            fill: "#FFD15C"
        },
        {
            width: "26",
            height: "26", 
            position: shapePositions[4],
            path: "M13 3.3541L2.42705 24.5h21.1459L13 3.3541z",
            stroke: "#FF4C60",
            strokeWidth: "3",
            fill: "none"
        },
        {
            width: "30",
            height: "25",
            position: shapePositions[5], 
            path: "M.1436 8.9282C3.00213 3.97706 8.2841.92763 14.00013.92796c5.71605.00032 10.9981 3.04992 13.85641 8 2.8583 4.95007 2.8584 11.0491-.00014 16.00024l-2.77128-1.6c2.28651-3.96036 2.28631-8.84002.00011-12.8002-2.2862-3.96017-6.5124-6.40017-11.08513-6.4-4.57271.00018-8.79872 2.43984-11.08524 6.4002l-2.77128-1.6z",
            fill: "#44D7B6"
        },
        {
            width: "27",
            height: "29",
            position: shapePositions[6],
            path: "M21.15625.60099c4.37954 3.67487 6.46544 9.40612 5.47254 15.03526-.9929 5.62915-4.91339 10.30141-10.2846 12.25672-5.37122 1.9553-11.3776.89631-15.75715-2.77856l2.05692-2.45134c3.50315 2.93948 8.3087 3.78663 12.60572 2.22284 4.297-1.5638 7.43381-5.30209 8.22768-9.80537.79387-4.50328-.8749-9.08872-4.37803-12.02821L21.15625.60099z",
            fill: "#FFD15C"
        },
        {
            width: "26",
            height: "26", 
            position: shapePositions[7],
            path: "M13 3.3541L2.42705 24.5h21.1459L13 3.3541z",
            stroke: "#FF4C60",
            strokeWidth: "3",
            fill: "none"
        },
        {
            width: "30",
            height: "25",
            position: shapePositions[8], 
            path: "M.1436 8.9282C3.00213 3.97706 8.2841.92763 14.00013.92796c5.71605.00032 10.9981 3.04992 13.85641 8 2.8583 4.95007 2.8584 11.0491-.00014 16.00024l-2.77128-1.6c2.28651-3.96036 2.28631-8.84002.00011-12.8002-2.2862-3.96017-6.5124-6.40017-11.08513-6.4-4.57271.00018-8.79872 2.43984-11.08524 6.4002l-2.77128-1.6z",
            fill: "#44D7B6"
        },
        {
            width: "27",
            height: "29",
            position: shapePositions[9],
            path: "M21.15625.60099c4.37954 3.67487 6.46544 9.40612 5.47254 15.03526-.9929 5.62915-4.91339 10.30141-10.2846 12.25672-5.37122 1.9553-11.3776.89631-15.75715-2.77856l2.05692-2.45134c3.50315 2.93948 8.3087 3.78663 12.60572 2.22284 4.297-1.5638 7.43381-5.30209 8.22768-9.80537.79387-4.50328-.8749-9.08872-4.37803-12.02821L21.15625.60099z",
            fill: "#FFD15C"
        },
        {
            width: "26",
            height: "26", 
            position: shapePositions[10],
            path: "M13 3.3541L2.42705 24.5h21.1459L13 3.3541z",
            stroke: "#FF4C60",
            strokeWidth: "3",
            fill: "none"
        }
    ]

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {shapes.map((shape, index) => (
                <motion.svg
                    key={index}
                    className="absolute"
                    width={shape.width}
                    height={shape.height}
                    variants={shapeVariants}
                    initial="initial"
                    animate="animate"
                    custom={index}
                    style={{
                        ...shape.position,
                        transform: `rotate(${shape.position.rotation}deg)`,
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d={shape.path}
                        fill={shape.fill}
                        stroke={shape.stroke}
                        strokeWidth={shape.strokeWidth}
                        fillRule="evenodd"
                    />
                </motion.svg>
            ))}
            
            {/* Add floating animation */}
            {shapes.map((_, index) => (
                <motion.div
                    key={`float-${index}`}
                    className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
                    style={{
                        top: `${Math.random() * 80 + 10}%`,
                        left: `${Math.random() * 80 + 10}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 2,
                    }}
                />
            ))}
        </div>
    )
}

import React from 'react'

import "./Hero.css"
function Hero() {

    const colors = {
        pathGray: 'rgba()',
    }

    const L1 = `
    M 130 50
    Q 100 35 70 50
    `;

    const L2 = `
    M 50 70
    Q 35 100 50 130 
    `;

    const L3 = `
    M 70 150
    Q 100 165 130 150
    `
    const L4 = `
    M 150 130
    Q 165 100 150 70
    `;

  return (
    <div className="hero-container">
        <div className="hero-left">
            <h1>AI Fitness you can use 
              <span className="slogan-gradient">anywhere.</span>
              </h1>
            <p>Privatized fitness is a thing of the past. Offer elite insight with ease <b>instantly.</b></p>
        </div>


        <div className="hero-right">
            <div className="lifecycle-wrapper">
                <svg viewBox='0 0 200 200' className="lifecycle">
                    <defs>
                        <marker 
                            id="arrow"
                            viewBox="0 0 10 10"
                            refX="4"
                            refY="5"
                            markerWidth="8"
                            markerHeight="8"
                            orient="auto-start-reverse"
                        >
                            <path
                                d="M 0 2 L 5 5 L 0 8"
                                stroke="lightgray"
                                strokeWidth="1"
                                fill="none"
                            />
                        </marker>

                        <linearGradient id="grayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{stopColor: "Gray", stopOpacity: "1"}}/>
                            <stop offset="100%" 
                            style = {{stopColor: "lightgray", stopOpacity: "1"}}
                            />
                        </linearGradient>
                    </defs>

                    
                    <path
                        d = {L1}
                        stroke = "lightgray"
                        strokeWidth="2"
                        markerEnd ="url(#arrow)"
                        fill="none"
                        className="top"
                    />
                    
                    <path
                        d = {L1}
                        stroke = "lightgray"
                        strokeWidth="2"
                        markerEnd ="url(#arrow)"
                        fill="none"
                        className="top-k1"
                    />

                    <path
                        d = {L1}
                        stroke = "rgba(90, 150, 255, 1)"
                        strokeWidth="1.8"
                        markerEnd ="url(#arrow)"
                        fill="none"
                        className="top-k2"

                    />
                    <path
                        d = {L1}
                        stroke = "lightgray"
                        strokeWidth="2"
                        markerEnd ="url(#arrow)"
                        fill="none"
                        className="top-k3"
                    />



                    

                    <path
                        d = {L2}
                        stroke = "lightgray"
                        strokeWidth="2"
                        markerEnd ="url(#arrow)"
                        fill="none"
                        className="left"
                    />
                    <path
                        d = {L2}
                        stroke = "lightgray"
                        strokeWidth="2"
                        markerEnd ="url(#arrow)"
                        fill="none"
                        className="left-k1"
                    />
                    <path
                        d = {L2}
                        stroke = "rgba(90, 150, 255, 1)"
                        strokeWidth="1.8"
                        markerEnd ="url(#arrow)"
                        fill="none"
                        className="left-k2"
                    />
                    <path
                        d = {L2}
                        stroke = "lightgray"
                        strokeWidth="2"
                        markerEnd ="url(#arrow)"
                        fill="none"
                        className="left-k3"
                    />

                    
                    <path
                        d = {L3}
                        stroke = "lightgray"
                        strokeWidth="2"
                        markerEnd ="url(#arrow)"
                        fill="none"
                        className="bottom"
                    />

                    <path
                        d = {L3}
                        stroke = "lightgray"
                        strokeWidth="2"
                        markerEnd ="url(#arrow)"
                        fill="none"
                        className="bottom-k1"
                    />
                    <path
                        d = {L3}
                        stroke = "rgba(90, 150, 255, 1)"
                        strokeWidth="1.8"
                        markerEnd ="url(#arrow)"
                        fill="none"
                        className="bottom-k2"
                    />
                    <path
                        d = {L3}
                        stroke = "lightgray"
                        strokeWidth="2"
                        markerEnd ="url(#arrow)"
                        fill="none"
                        className="bottom-k3"
                    />

                    
                    <path
                        d = {L4}
                        stroke = "lightgray"
                        strokeWidth="2"
                        markerEnd ="url(#arrow)"
                        fill="none"
                        className="right"
                    />

                    <path
                        d = {L4}
                        stroke = "lightgray"
                        strokeWidth="2"
                        markerEnd ="url(#arrow)"
                        fill="none"
                        className="right-k1"
                    />
                    <path
                        d = {L4}
                        stroke = "rgba(90, 150, 255, 1)"
                        strokeWidth="1.8"
                        markerEnd ="url(#arrow)"
                        fill="none"
                        className="right-k2"
                    />
                    <path
                        d = {L4}
                        stroke = "lightgray"
                        strokeWidth="2"
                        markerEnd ="url(#arrow)"
                        fill="none"
                        className="right-k3"
                    />

                    
                </svg>
            </div>
        </div>
    </div>
  )
}

export default Hero

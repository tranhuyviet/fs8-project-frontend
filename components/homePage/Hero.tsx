import React from 'react'
import Image from 'next/image'

const Hero = () => {
    return (
        <section className="shadow-md">
            {/* <img src="/images/merry.webp" alt="hero" className="w-full h-screen bg-fixed" /> */}
            {/* <div className="bg-hero-home h-[calc(100vh-64px)] object-cover object-center bg-center bg-cover bg-fixed bg-no-repeat flex justify-center items-center"> */}
            <div className="relative md:bg-hero-home h-[calc(100vh-64px)] object-cover object-center bg-center bg-cover bg-fixed bg-no-repeat flex justify-center items-center">
                <img src="/images/merry.webp" alt="hero" className="md:hidden absolute inset-0 w-screen h-[calc(100vh-64px)] object-cover object-top" />
                <div className="text-center md:-mt-44">
                    <h1 className="font-rochester text-8xl text-white md:text-heroTitle drop-shadhow-2xl animate-pulse">Merry Chrismas</h1>
                    <p className="font-satisfy text-4xl underline mt-16 md:text-heroSubtitle text-red-200 drop-shadow-2xl animate-bounce">Team Integrify</p>
                </div>
            </div>
        </section>
    )
}

export default Hero

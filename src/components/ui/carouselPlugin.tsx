"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Button } from "./button"
import { ProfileCard } from "./ProfileCard"

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <section className="bg-primary p-6">
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs mx-auto relative p-1 bg-primary text-white"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
             <ProfileCard/>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-2 text-accent" />
      <CarouselNext className="mr-2 text-accent" />
    </Carousel>
  <div className="flex justify-center mt-6">
  <Button className="bg-accent text-white px-6 py-2 text-lg font-semibold">
    Découvrir les profils
  </Button>
</div>
    </section>
  )
}

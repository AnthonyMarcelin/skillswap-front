"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "./button";
import { ProfileCard } from "../ProfileCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

   const [users, setUsers] = useState([]);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/users");
          setUsers(response.data.data);
          console.log("Fetched users:", response.data.data);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchUsers();
    }, []);


  return (
    <section className="bg-primary p-6">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xs mx-auto relative p-1 bg-primary text-white"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Array.isArray(users) && users.map((user:any, index) => (
            <CarouselItem key={user.id || index} className="flex justify-center">
              <div className="p-1">
                <ProfileCard user={user} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-2 text-accent" />
        <CarouselNext className="mr-2 text-accent" />
      </Carousel>
      <div className="flex justify-center mt-6">
        <Link to="/search" className="no-underline">
          <Button className="bg-accent hover:bg-secondary text-white px-6 py-2 text-lg font-semibold">
            Découvrir les profils
          </Button>
        </Link>
      </div>
    </section>
  );
}

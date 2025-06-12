import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "./ui/button";

type ProfileCardProps = {
  firstname: string;
  lastname: string;
  profile_photo: string;
  city: string;
  description: string;
  skills: string[];
};

export function ProfileCard({user} : { user: ProfileCardProps }) {

// TODO: Loading

  return (
    <Card className=" w-70 h-full mx-auto bg-accent">
      <CardContent className="flex flex-col items-stretch gap-4">
        <div className="flex-shrink-0 h-30">
          <img
            src={user.profile_photo}
            alt={user.firstname}
            className="object-cover rounded h-full w-full"
          />
        </div>
        <div className="flex flex-col justify-between flex-1">
          <CardHeader className="px-0 pb-2">
            <CardTitle>{user.firstname}</CardTitle>
            <CardDescription>{user.city}</CardDescription>
            <div className="flex w-full h-10 gap-2">
              {user.skills.map((skill) => (
                <Button key={skill} className="h-6 bg-secondary">
                  {skill.name}
                </Button>
                ))  
            }
            </div>
          </CardHeader>
          <CardContent className="px-0 pt-0">
            <div className="text-white text-sm">
            {user.description}
            </div>
          </CardContent>
          <CardFooter className="px-0 pt-2">Footer</CardFooter>
        </div>
      </CardContent>
    </Card>
  );
}

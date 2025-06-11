import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "./ui/button";

// type ProfileCardProps = {
//   image: string;
//   title: string;
//   description?: string;
//   content?: React.ReactNode;
//   footer?: React.ReactNode;
// };

// futures props de ProfileCard{ image, title, description, content, footer }: ProfileCardProps

export function ProfileCard() {
  return (
    <Card className="max-w-xl mx-auto bg-accent">
      <CardContent className="flex flex-col items-stretch gap-4">
        <div className="flex-shrink-0 h-full">
          <img src="../../fakhri-labib-ZhBGD4vykCU-unsplash.jpg" alt="" className="object-cover rounded-l-xl h-full w-full" />
        </div>
        <div className="flex flex-col justify-between flex-1">
          <CardHeader className="px-0 pb-2">
            <CardTitle>John Doe</CardTitle>
            <CardDescription>Paris</CardDescription>
            <div className="flex gap-2">
            <Button className="w-18 h-6 bg-secondary">Tag</Button>
            <Button className="w-18 h-6 bg-secondary">Tag</Button>
            <Button className="w-18 h-6 bg-secondary">Tag</Button>
            </div>
          </CardHeader>
          <CardContent className="px-0 pt-0">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque saepe repellat velit ullam! Iste similique ex nobis, alias dolores dicta odit reiciendis.</CardContent>
          <CardFooter className="px-0 pt-2">Footer</CardFooter>
        </div>
      </CardContent>
    </Card>
  );
}
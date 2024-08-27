import Card from "../components/Card";
import { ICard } from "../types";

const cards: ICard[] = [
  {
    date: "2023-08-27",
    title: "Understanding TypeScript Generics",
    tags: ["TypeScript", "Generics"],
  },
  {
    date: "2023-08-15",
    title: "Next.js Routing Techniques",
    tags: ["Next.js", "Routing"],
  },
  {
    date: "2023-07-30",
    title: "State Management with Redux",
    tags: ["Redux", "State Management"],
  },
  {
    date: "2023-07-10",
    title: "Exploring CSS Grid",
    tags: ["CSS", "Grid"],
  },
  {
    date: "2023-06-25",
    title: "Deploying Next.js on Vercel",
    tags: ["Next.js", "Deployment"],
  },
  {
    date: "2023-06-01",
    title: "Mastering JavaScript Closures",
    tags: ["JavaScript", "Closures"],
  },
];

export default function HomePage() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </div>
  );
}

// components/Card.tsx
import { FC } from "react";
import { ICard } from "../types";

interface CardProps {
  card: ICard;
}

const Card: FC<CardProps> = ({ card }) => {
  return (
    <article className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
      <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
        <time dateTime={card.date} className="block text-xs text-gray-500">
          {new Date(card.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </time>

        <a href="#">
          <h3 className="mt-0.5 text-lg font-medium text-gray-900">
            {card.title}
          </h3>
        </a>

        <div className="mt-4 flex flex-wrap gap-1">
          {card.tags.map((tag, index) => (
            <span
              key={index}
              className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default Card;

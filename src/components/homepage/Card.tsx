import Image from "next/image";
import { CardData } from "@/types/card-data";

type CardProps = {
  card: CardData;
  isFlipped: boolean;
  onClick: () => void;
};

const Card = ({ card, isFlipped, onClick }: CardProps) => {
  return (
    <div className="w-40 h-56 m-2 perspective cursor-pointer" onClick={onClick}>
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Card Back */}
        <div className="absolute w-full h-full backface-hidden bg-gray-200 flex items-center justify-center rounded-xl">
          <Image
            src="/images/cardback.png"
            alt="Card back"
            width={200}
            height={200}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Card Front */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-xl">
          <Image
            src={card.image}
            alt="Card front"
            width={200}
            height={200}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;

import Image from "next/image";
import { CardData } from "@/types/card-data";

type CardProps = {
  // image: string;
  card: CardData;
  isFlipped: boolean;
  onClick: () => void;
};

const Card = ({ card, isFlipped, onClick }: CardProps) => {
  return (
    <div className="w-40 h-56 m-2  perspective" onClick={onClick}>
      <div
        className={`relative w-full h-full transition-transform duration-500 ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <div className="absolute w-full h-full backface-hidden bg-gray-200 flex items-center justify-center">
          {/* Card Back */}
        </div>
        <div className="absolute w-full h-full backface-hidden  rotate-y-180 bg-white">
          {isFlipped ? (
            <Image
              src={card.image}
              alt="Card front"
              width={200}
              height={200}
              className="w-full h-full rounded-xl  object-cover"
            />
          ) : (
            <Image
              src='/images/cardback.png'
              alt="Card front"
              width={200}
              height={200}
              className="w-full h-full  object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;






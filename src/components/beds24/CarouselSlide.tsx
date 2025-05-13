
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CarouselSlideProps {
  image: string;
  alt: string;
  text: string;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({
  image,
  alt,
  text,
  onNext,
  onPrev,
  isFirst,
  isLast
}) => {
  return (
    <Card className="border rounded-lg overflow-hidden">
      <div className="p-6 flex flex-col items-center">
        <div className="mb-6 h-[400px] flex items-center justify-center w-full">
          <img 
            src={image} 
            alt={alt} 
            className="max-h-[400px] w-auto max-w-full rounded-lg object-contain" 
          />
        </div>
        <div className="text-center mb-6">
          <p className="whitespace-pre-line">{text}</p>
        </div>
        <div className="flex gap-4">
          {!isFirst && (
            <Button variant="outline" onClick={onPrev}>
              Étape précédente
            </Button>
          )}
          {!isLast && (
            <Button variant="outline" onClick={onNext}>
              Étape suivante
            </Button>
          )}
          {isLast && (
            <Button variant="default" onClick={onNext}>
              Compléter le formulaire
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CarouselSlide;

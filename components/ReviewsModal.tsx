import React, { useEffect, useRef } from 'react';
import StarRating from './StarRating';
import { XMarkIcon } from './icons/XMarkIcon';
import { ChatBubbleOvalLeftEllipsisIcon } from './icons/ChatBubbleOvalLeftEllipsisIcon';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    author: 'CodeWizard22',
    rating: 5,
    text: 'Absolutely phenomenal. The AI code generation is scary good and has saved me countless hours.',
    date: '3 days ago',
  },
  {
    id: 2,
    author: 'DevOpsDan',
    rating: 5,
    text: 'The one-click deployment is a lifesaver. Setting up CI/CD pipelines has never been easier. A true game-changer for our workflow.',
    date: '1 week ago',
  },
  {
    id: 3,
    author: 'UX_Queen',
    rating: 4,
    text: 'Great for rapid prototyping. The collaboration tools are solid, though I wish there were more integrations with design tools.',
    date: '2 weeks ago',
  },
];


interface ReviewsModalProps {
  onClose: () => void;
}

const ReviewsModal: React.FC<ReviewsModalProps> = ({ onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    useFocusTrap(modalRef, true);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

  return (
    <div ref={modalRef} className="fixed inset-0 bg-dark-bg/80 backdrop-blur-lg z-50 flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="reviews-title">
      <div className="bg-card-bg border border-border-color rounded-2xl w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl shadow-primary-blue/10">
        <header className="flex items-center justify-between p-4 border-b border-border-color flex-shrink-0">
          <div className="flex items-center gap-3">
            <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-primary-blue" />
            <h2 id="reviews-title" className="text-xl font-bold text-white font-heading">User Reviews</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-md transition-colors" aria-label="Close reviews modal">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-grow p-6 overflow-y-auto">
            <div className="space-y-6">
                {reviews.map(review => (
                    <div key={review.id} className="bg-dark-bg p-4 rounded-lg border border-border-color">
                        <div className="flex justify-between items-start">
                           <div>
                            <p className="font-bold text-white">{review.author}</p>
                            <p className="text-xs text-slate-400">{review.date}</p>
                           </div>
                            <StarRating rating={review.rating} />
                        </div>
                        <p className="text-slate-300 mt-3">{review.text}</p>
                    </div>
                ))}
            </div>
        </main>
      </div>
    </div>
  );
};

export default ReviewsModal;
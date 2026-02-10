import { ArrowRight, Star, Download, CirclePlus, Plus, X } from 'lucide-react';
import { Project } from '@/types';
import { useState } from 'react';

type CardProps = {
  app: Project;
  closeDetails: () => void;
};

export default function ImageShower({app, closeDetails}: CardProps) {
    const [active, setActive] = useState(0);
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-lg px-4 md:px-30  z-60">
      <button className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center  cursor-pointer duration-500 rounded-full shadow-lg z-60" onClick={closeDetails}  >
        <X className="w-6 h-6 text-white" />
      </button>
        <div>
            <img src={app.images[active]} alt="" />
            <p className="text-gray-500 text-sm mt-2 text-end">{active+1}/{app.images.length}</p>
        </div>
        <div className='absolute top-0 left-0 bottom-0 right-0 flex justify-between items-center px-8'>
            <button className="w-12 h-12 flex items-center justify-center bg-white hover:bg-gray-200 duration-500 cursor-pointer rounded-full shadow-lg">
                <ArrowRight className="w-6 h-6 text-black rotate-180" onClick={() => setActive((active - 1 + app.images.length) % app.images.length)} />
            </button>
            <button className="w-12 h-12 flex items-center justify-center bg-white hover:bg-gray-200 duration-500 cursor-pointer rounded-full shadow-lg">
                <ArrowRight className="w-6 h-6 text-black" onClick={() => setActive((active + 1) % app.images.length)} />
            </button>
        </div>

    </div>
  );
}

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Star, Download, CirclePlus, Plus } from 'lucide-react';
import { Project } from '@/types';

type CardProps = {
  app: Project;
  showDetails: () => void;
  showImages: () => void;
};


export default function DigitalAppsHero({ app, showDetails, showImages }: CardProps) {
  return (
    <div className="">

      {/* Bottom Card */}
      <div className="">
        <div className="bg-white rounded-xl p-3 shadow-2xl">
          <div className='relative group overflow-hidden'>
            <div className=' overflow-hidden rounded-xl'>
              <img src={app.coverImage} alt="" className="group-hover:scale-110 duration-500" />
            </div>
            <div className='absolute rounded-xl opacity-0 group-hover:opacity-100 duration-500 top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/30'>
              <button className='cursor-pointer bg-white w-12 h-12 rounded-full flex items-center justify-center' onClick={showImages}>
                <Plus className="w-8 h-8 text-black" />
              </button>
            </div>
          </div>
          <div className='flex items-center justify-between mt-4'>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{app.title}</h3>
              <div className='text-sm text-gray-500'>
                {app.stack.map((tech, i) => (
                  <span key={i} className="text-gray-600 mb-4">{i == app.stack.length - 1 ? tech : tech + ",\u00A0"}</span>
                ))}
              </div>
            </div>
            <button className="w-10 cursor-pointer h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center ml-auto transition-all hover:scale-110 shadow-lg" onClick={showDetails}>
              <ArrowRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>


    </div>
  );
}

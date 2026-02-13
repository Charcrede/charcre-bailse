import { ArrowRight, Star, Download, CirclePlus, Plus, X } from 'lucide-react';
import { Project } from '@/types';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

type CardProps = {
    app: Project;
    closeDetails: () => void;
};

export default function ProjectDetails({ app, closeDetails }: CardProps) {
    const [active, setActive] = useState(0);
    const [images, setImages] = useState(app.images.slice(0, 3));
    const { locale } = useParams<{ locale: 'fr' | 'en' }>();
    const t = useTranslations('Projects');
    const swapWithMain = (index: number) => {
        if (index === 0) return;

        setImages((prev) => {
            const next = [...prev];
            [next[0], next[index]] = [next[index], next[0]];
            return next;
        });
    };
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-lg px-4 md:px-30  z-60">
            <button className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center  cursor-pointer duration-500 rounded-full shadow-lg z-60" onClick={closeDetails}  >
                <X className="w-6 h-6 text-white" />
            </button>
            <div className='bg-gray-200 p-6 flex flex-col md:flex-row gap-8 text-black'>
                <div className="w-full md:w-1/2 grid grid-cols-2 gap-2">
                    {images.map((image, index) => (
                        <img
                            key={image}
                            src={image}
                            alt=""
                            onClick={() => swapWithMain(index)}
                            className={`cursor-pointer object-cover transition-all duration-300 hover:scale-[1.02] ${index === 0 ? 'col-span-2' : 'col-span-1'}`}
                        />
                    ))}
                </div>


                <div className="w-full md:w-1/2 flex flex-col gap-3 md:gap-8">
                    <h2 className="text-3xl font-bold ">{app.title}</h2>
                    <p className="text-gray-600 text-sm md:text-xl">{app.shortDescription[locale]}</p>
                    <div className='text-gray-600 text-sm md:text-xl md:w-2/3'>
                        <p className='flex justify-between mb-3'><span>{t('type_word')} : </span> {t(`type.${app.type}`)}</p>
                        <p className='flex justify-between mb-3'><span>{t('tech_stack')} : </span> {app.stack.join(', ')}</p>
                        <p className='flex justify-between mb-3'><span>{t('status_word')} : </span> {t(`status.${app.status}`)}</p>
                        <p className='flex justify-between mb-3'><span>{t('view_project')} : </span> <a target='_blank' href={app.link} className="text-blue-500 hover:underline duration-300">{app.link}</a></p>
                    </div>
                </div>

            </div>
        </div>
    );

}

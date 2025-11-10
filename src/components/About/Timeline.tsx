// src/components/ui/Timeline.tsx
import { cn } from '@/utilities/ui'

export interface TimelineItem {
  date: string
  title: string
  description: string
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className = '' }: TimelineProps) {
  return (
    <ul
      className={cn('timeline !m-0 !w-full !list-none !p-0 md:table lg:table xl:table', className)}
    >
      {items.map((item, idx) => {
        const isLeft = idx % 2 === 0
        return (
          <li
            key={idx}
            className="relative !pl-8 md:table-row md:p-0 lg:table-row lg:p-0 xl:table-row xl:p-0"
          >
            <div className="timeline-info meta !text-flamingo-light !text-normal !mb-2 font-bold !tracking-[0.02rem] whitespace-nowrap uppercase md:table-cell md:!pr-6 md:text-right md:align-top lg:table-cell lg:!pr-6 lg:text-right lg:align-top xl:table-cell xl:!pr-6 xl:text-right xl:align-top">
              {item.date}
            </div>
            <div className="!text-primary before:bg-flamingo-dark absolute inset-y-0 left-0 w-[0.6rem] before:absolute before:top-[0.2rem] before:-left-0.5 before:block before:h-[0.8rem] before:w-[0.8rem] before:rounded-[100%] before:content-[''] after:absolute after:top-4 after:bottom-0 after:left-1 after:block after:w-px after:bg-[rgba(164,174,198,.2)] after:content-[''] md:relative md:table-cell md:align-top lg:relative lg:table-cell lg:align-top xl:relative xl:table-cell xl:align-top"></div>
            <div
              className={cn(
                'align-top md:!pl-6 lg:!pl-6 xl:!pl-6',
                idx === items.length - 1 ? '!pb-0' : 'pb-8',
              )}
            >
              <h3 className="mb-4 text-2xl font-semibold md:!mt-[-0.25rem] lg:!mt-[-0.25rem]">
                {item.title}
              </h3>
              <p className="text-muted-foreground !m-0 text-lg">{item.description}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export function TimeColor({ items, className = '' }: TimelineProps) {
  return (
    <ul
      className={cn('timeline !m-0 !w-full !list-none !p-0 md:table lg:table xl:table', className)}
    >
      {items.map((item, idx) => {
        return (
          <li
            key={idx}
            className="relative border !pl-8 md:table-row md:p-0 lg:table-row lg:p-0 xl:table-row xl:p-0"
          >
            <div className="meta !text-flamingo-light !text-normal !mb-2 rounded-full text-center font-bold !tracking-[0.02rem] whitespace-nowrap uppercase md:!pr-6 md:text-right md:align-top lg:!pr-6 lg:text-right lg:align-top xl:!pr-6 xl:text-right xl:align-top">
              {item.date}
            </div>
            <div className="!text-primary before:bg-flamingo-dark after:bg-flamingo absolute inset-y-0 left-0 w-[0.7rem] before:absolute before:top-[0.2rem] before:-left-0.5 before:block before:h-[0.8rem] before:w-[0.8rem] before:rounded-[100%] before:content-[''] after:absolute after:top-4 after:bottom-0 after:left-1 after:block after:w-px after:content-[''] md:relative md:table-cell md:align-top lg:relative lg:table-cell lg:align-top xl:relative xl:table-cell xl:align-top"></div>
            <div
              className={cn(
                'border-primary mb-4 rounded-2xl border p-2 align-top',
                idx === items.length - 1 ? '!pb-0' : 'pb-4',
              )}
            >
              <h3 className="mb-4 text-2xl font-semibold md:!mt-[-0.25rem] lg:!mt-[-0.25rem]">
                {item.title}
              </h3>
              <p className="text-muted-foreground !m-0 text-lg">{item.description}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export const TimelineItem = ({
  date,
  title,
  description,
  isEven,
}: {
  date: string
  title: string
  description: string
  isEven: boolean
}) => {
  return (
    <div
      className={`relative mb-10 flex ${isEven ? 'ml-auto pr-8' : 'mr-auto pl-8'}`}
      style={{ width: 'calc(50% - 20px)' }}
    >
      <div className="relative w-full rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-4 text-xl font-medium text-blue-800">{title}</h3>
        <p className="text-gray-600">{description}</p>

        {/* Le triangle qui pointe vers la ligne centrale */}
        <div
          className={`absolute top-5 ${isEven ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'}`}
          style={{
            width: 0,
            height: 0,
            borderTop: '15px solid transparent',
            borderBottom: '15px solid transparent',
            [isEven ? 'borderRight' : 'borderLeft']: '15px solid white',
          }}
        ></div>
      </div>

      {/* Date */}
      <div
        className={`absolute top-5 rounded-full bg-blue-800 px-4 py-2 text-sm font-semibold text-white ${isEven ? 'left-0 -translate-x-32' : 'right-0 translate-x-32'}`}
      >
        {date}
      </div>

      {/* Point sur la ligne */}
      <div
        className={`absolute top-5 h-4 w-4 rounded-full border-2 border-blue-800 bg-red-600 ${isEven ? 'left-0 -translate-x-9' : 'right-0 translate-x-9'}`}
      ></div>
    </div>
  )
}

// Composant principal Timeline
export const TimelineTwo = ({ items }: { items: TimelineItem[] }) => {
  return (
    <div className="relative mx-auto max-w-4xl py-10">
      {/* La ligne verticale centrale */}
      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-blue-800"></div>

      {/* Les éléments de la timeline */}
      <div className="relative">
        {items.map((item, index) => (
          <TimelineItem
            key={index}
            date={item.date}
            title={item.title}
            description={item.description}
            isEven={index % 2 !== 0}
          />
        ))}
      </div>
    </div>
  )
}

// Composant d'exemple avec titre de section
// const TimelineExample = () => {
//   return (
//     <div className="py-20 bg-blue-50">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl font-semibold text-blue-800 mb-4 relative inline-block">
//             Notre Histoire
//             <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-16 h-1 bg-red-600"></span>
//           </h2>
//           <p className="max-w-2xl mx-auto text-lg text-gray-600">
//             Découvrez les étapes clés du développement du Réseau Public Départemental d'Aide à Domicile de la Gironde depuis sa création
//           </p>
//         </div>

//         <Timeline items={timelineData} />
//       </div>
//     </div>
//   );
// };

// Composant pour une utilisation dans une application plus large
// export const ResponsiveTimeline = ({ items, title, subtitle }: { items: TimelineItem[], title: string, subtitle: string }) => {
//   return (
//     <div className="py-16 bg-blue-50 md:py-20">
//       <div className="container mx-auto px-4">
//         {(title || subtitle) && (
//           <div className="text-center mb-12 md:mb-16">
//             {title && (
//               <h2 className="text-2xl md:text-3xl font-semibold text-blue-800 mb-4 relative inline-block">
//                 {title}
//                 <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-12 md:w-16 h-1 bg-red-600"></span>
//               </h2>
//             )}
//             {subtitle && (
//               <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600">
//                 {subtitle}
//               </p>
//             )}
//           </div>
//         )}

//         {/* Version desktop - standard */}
//         <div className="hidden md:block">
//           <Timeline items={items} />
//         </div>

//         {/* Version mobile - adaptée */}
//         <div className="md:hidden">
//           <div className="relative pl-8">
//             {/* Ligne verticale gauche pour mobile */}
//             <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-blue-800"></div>

//             {items.map((item, index) => (
//               <div key={index} className="relative mb-10 pl-6">
//                 {/* Point sur la ligne */}
//                 <div className="absolute top-5 left-0 -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full border-2 border-blue-800"></div>

//                 {/* Date - positionnée au début pour mobile */}
//                 <div className="inline-block bg-blue-800 text-white py-1 px-3 rounded-full text-sm font-semibold mb-3">
//                   {item.date}
//                 </div>

//                 <div className="bg-white rounded-lg shadow-md p-5 w-full">
//                   <h3 className="text-lg mb-3 font-medium text-blue-800">{item.title}</h3>
//                   <p className="text-gray-600 text-sm">{item.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

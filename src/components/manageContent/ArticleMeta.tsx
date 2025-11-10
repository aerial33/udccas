import { Share2 } from 'lucide-react'

import React from 'react'

import SocialsShare from '@/graphics/SocialsShare/SocialsShare'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface ArticleMetaProps {
  author: { name: string; avatar?: string }
  date: string
  readTime?: string
  likes?: number
  comments?: number
}

const ArticleMeta: React.FC<ArticleMetaProps> = ({ author, date, readTime, likes, comments }) => {
  return (
    <div className="flex w-full flex-col justify-between space-y-5 sm:flex-row sm:items-end sm:space-y-0 sm:space-x-5 rtl:space-x-reverse">
      {/* Auteur et infos */}
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{author.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold">{author.name}</div>
          <div className="text-muted-foreground text-sm">
            {date}{readTime && ` · ${readTime}`}
          </div>
        </div>
      </div>
      {/* Actions */}
      <div className="flex items-center space-x-2">
        <Share2 />
        <div className="ml-2">
          <SocialsShare
            className="flex space-x-1"
            itemClass="w-8 h-8 text-base hover:bg-neutral-100"
          />
        </div>
      </div>
    </div>
  )
}

export default ArticleMeta

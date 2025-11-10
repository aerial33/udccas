import React from 'react'

import { SearchWidget } from './SearchWidget'

export type SidebarWidgetsProps = {
  aboutTitle?: string
  aboutContent?: string
  popularPosts?: Array<{
    id: string
    title: string
    slug: string
    image?: string
    date: string
    commentsCount: number
  }>
  categories?: Array<{
    id: string
    name: string
    count: number
  }>
}

export const SidebarWidgets: React.FC<SidebarWidgetsProps> = ({
  aboutTitle = 'À propos de nous',
  aboutContent = 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum. Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus.',
  popularPosts = [],
  categories = [],
}) => {
  return (
    <aside className="sidebar !mt-8 w-full max-w-full flex-[0_0_auto] self-start !px-[15px] lg:sticky lg:top-7 lg:!mt-6 lg:w-4/12 lg:!px-[20px] xl:!mt-6 xl:w-4/12 xl:!px-[35px]">
      <SearchWidget />

      {/* À propos */}
      {/* <div className="widget mt-8 rounded-3xl bg-neutral-100 px-6 py-6 md:py-8">
        <h4 className="!mb-3 text-2xl font-bold text-gray-700">{aboutTitle}</h4>
        <p className="lineheigth-tight text-sm">{aboutContent}</p>
      </div> */}

      {/* Articles Populaires */}
      {popularPosts.length > 0 && (
        <div className="widget mt-8 rounded-3xl bg-neutral-100 px-6 py-6 md:py-8">
          <h4 className="!mb-3 text-2xl font-bold">Articles populaires</h4>
          <ul className="m-0 p-0 after:invisible after:clear-both after:block after:h-0 after:content-['']">
            {popularPosts.map((post, index) => (
              <li
                key={post.id}
                className={`clear-both block overflow-hidden ${index > 0 ? '!mt-4' : ''}`}
              >
                {post.image && (
                  <figure className="float-left !h-[4.5rem] w-14 !rounded-[.4rem]">
                    <a href={`/posts/${post.slug}`}>
                      <img className="!rounded-[.4rem]" src={post.image} alt={post.title} />
                    </a>
                  </figure>
                )}
                <div className="!relative !mb-0 !ml-[4.25rem]">
                  <h6 className="!mb-2">
                    <a
                      className="!text-[#343f52] hover:!text-[#3f78e0]"
                      href={`/posts/${post.slug}`}
                    >
                      {post.title}
                    </a>
                  </h6>
                  <ul className="m-0 list-none p-0 !text-[0.7rem] !text-[#aab0bc]">
                    <li className="post-date inline-block">
                      <i className="uil uil-calendar-alt pr-[0.2rem] align-[-.05rem] before:content-['\e9ba']"></i>
                      <span>{post.date}</span>
                    </li>
                    <li className="post-comments inline-block before:m-[0_.6rem_0] before:inline-block before:h-[0.2rem] before:w-[0.2rem] before:rounded-[100%] before:bg-[#aab0bc] before:align-[.15rem] before:opacity-50 before:content-['']">
                      <a
                        className="!text-[#aab0bc] hover:!border-[#3f78e0] hover:!text-[#3f78e0]"
                        href="#"
                      >
                        <i className="uil uil-comment pr-[0.2rem] align-[-.05rem] before:content-['\ea54']"></i>
                        {post.commentsCount}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <div className="widget mt-8 rounded-3xl bg-neutral-100 px-6 py-6 md:py-8">
          <h4 className="!mb-3 text-2xl font-bold">Categories</h4>
          <ul className="bullet-primary list-none pl-0 !text-inherit">
            {categories.map((category, index) => (
              <li
                key={category.id}
                className={`before:font-SansSerif relative !pl-[1.5rem] before:absolute before:top-[-0.15rem] before:left-0 before:text-[1rem] before:content-['✔️'] ${
                  index > 0 ? '!mt-[.35rem]' : ''
                }`}
              >
                <a className="!text-muted-foreground hover:!text-gray-870" href="#">
                  {category.name} ({category.count})
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { LazyImage } from '../components/LazyImage';

export default function LazyLoading() {
  const { data, isLoading } = useQuery({
    queryKey: ['images'],
    queryFn: async () => {
      console.log('gg');
      return await fetch(
        'https://api.unsplash.com/photos/?client_id=eCHTzJW5xdIBit89UzzN2lq49JhIqk1QmYPjY8THffg&per_page=50'
      ).then((result) => result.json());
    },
  });

  if (isLoading) {
    <div>Loading...</div>;
  }

  console.log(data);

  // return (
  //   <div>
  //     {data.map((d) => (
  //       <img key={d.id} src={d.urls.full} alt='' />
  //     ))}
  //   </div>
  // );
  return (
    <div>
      {data?.map((d) => (
        <LazyImage
          loading='lazy'
          key={d.id}
          src={d.urls.full}
          alt=''
          width={500}
          height={500}
        />
        // <LazyImage
        //   loading='lazy'
        //   key={d.id}
        //   src={d.urls.full}
        //   alt=''
        //   width={500}
        //   height={500}
        // />
      ))}
    </div>
  );
}

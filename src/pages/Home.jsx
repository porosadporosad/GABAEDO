import React, { useState } from 'react';
import Banner from '../components/Banner';
import PostList from '../components/PostList';

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState('');

  return (
    <div>
      <Banner onSearch={setSearchKeyword} />
      <PostList keyword={searchKeyword} />
    </div>
  );
}

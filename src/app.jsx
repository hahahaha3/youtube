import React, { useCallback, useEffect, useState } from 'react';
import styles from './app.module.css';
import SearchHeader from './components/search_header/search_header';
import VideoList from './components/video_list/video_list';
import VideoDetail from './components/video_detail/video_detail';

function App({youtube}) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const selectVideo = (video) => {
    setSelectedVideo(video);
  };

  // 로딩스피너를 만들기
  // 실패했다면 에러 state를 만들어서 보여주기
  const search = useCallback(query => { 
    setSelectedVideo(null);
    youtube
      .search(query)
      .then(videos => setVideos(videos));
  }, []);
  
  useEffect(() => {
    youtube
      .mostPopular()
      .then(videos => setVideos(videos));
    }, [youtube]);
  return (
    <div className={styles.app}>
    <SearchHeader onSearch={search}/>
    <section className={styles.content}>
      {selectedVideo && (
        <div className={styles.detail}>
          <VideoDetail video={selectedVideo} />
        </div>
      )}
      <div className={styles.list}>
        <VideoList videos={videos} onVideoClick={selectVideo} display={setSelectedVideo ? 'list' : 'grid'} />
      </div>
    </section>
    </div>
  );
}

export default App;

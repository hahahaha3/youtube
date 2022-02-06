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

  // useCallback은 조심해서 사용해야함. 한번 만들면 메모리상에 계속 보관하기 때문에 메모리에 많은 영향이 갈 수 있음. 써야될때만 쓰는 것이 좋음
  // 자식 컴포넌트에 props로 전달할 때 계속 새로운 콜백을 전달하면 자식 컴포넌트가 다시 re-render가 발생할 수 있으니까 그럴때 useCallback을 사용함
  
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

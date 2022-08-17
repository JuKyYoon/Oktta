import React, { useEffect, useState } from 'react';
import { getRecordings } from '@/services/roomService';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import '@/styles/recording.scss';
import { useParams } from 'react-router';

const Recording = () => {
  const { id } = useParams();
  // 녹화된 영상 정보
  const [recordings, setRecordings] = useState([]);

  // 녹화된 영상 불러오기
  const getRecordingsList = async (idx) => {
    const result = await getRecordings(idx);
    console.log(result);
    
    if (result?.data?.message === 'success') {
        setRecordings([...result.data.videos]);
    }
  };

  useEffect(() => {
    getRecordingsList(id);
  }, []);

  return (
    <>
      <div className='body'>
        <h1>녹화영상 목록</h1>
        {recordings.length === 0 ? (
          <h3>녹화된 영상이 없습니다.</h3>
        ) : (
          <List>
            {recordings.map((recording) => (
              <ListItem key={recording.idx}>
                <a href={recording} target='_blank'>
                  <ListItemIcon>
                    <VideocamIcon />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </a>
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </>
  );
};

export default Recording;

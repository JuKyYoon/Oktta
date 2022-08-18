import React, { useEffect, useState } from 'react';
import { getRecordings } from '@/services/roomService';
import { Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import '@/styles/recording.scss';
import { useParams } from 'react-router';
import {Link} from 'react-router-dom'

const Recording = () => {
  const { id } = useParams();
  // 녹화된 영상 정보
  const [recordings, setRecordings] = useState([]);

  // 녹화된 영상 불러오기
  const getRecordingsList = async (idx) => {
    const result = await getRecordings(idx);
    
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
            {recordings.map((recording, index) => (
              <ListItem key={recording.idx}>
                <a href={recording} target='_blank'>
                  <ListItemIcon>
                    <VideocamIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${index+1}번 영상`} />
                </a>
              </ListItem>
            ))}
          </List>
          
        )}
            <Link to={`/room/${id}`} style={{ textDecoration: 'none' }}>
              <Button
                className='detail-button'
                variant='outlined'
                color='veryperi'>
                돌아가기
              </Button>
            </Link>
      </div>
    </>
  );
};

export default Recording;

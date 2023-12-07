import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from './MyButton';

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  // 상세페이지 이동
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  // 수정페이지 이동
  const edit = () => {
    navigate(`edit/${id}`);
  };

  return (
    <div className='DiaryItem'>
      <div
        onClick={goDetail}
        className={[
          'emotion_img_wrapper',
          `emotion_img_wrapper${emotion}`,
        ].join(' ')}
      >
        <img src={`../public/assets/emotion${emotion}.png`} />
      </div>
      <div onClick={goDetail} className='info_wrapper'>
        <div className='diary_date'>{strDate}</div>
        <div className='diary_content_preview'>{content.slice(0, 25)}</div>
      </div>
      <div className='btn_wrapper'>
        <MyButton onClick={edit} text={'수정하기'} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
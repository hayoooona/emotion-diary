import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import DiaryEditor from '../components/DiaryEditor';

const Edit = () => {
  // query string
  // const [searchParams, setSearchParams] = useSearchParams();

  // const id = searchParams.get('id');
  // console.log(id);

  // const mode = searchParams.get('mode');
  // console.log(mode);

  const navigate = useNavigate();
  const { id } = useParams();
  const [originData, setOriginData] = useState();

  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert('없는 일기입니다.');
        navigate('/', { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
      {/* <h1>Edit</h1>
        <p>이곳은 일기 수정페이지 입니다.</p>
        <button onClick={() => setSearchParams({ who: 'yoona' })}>
          QS 바꾸기
        </button>
        <button
          onClick={() => {
            navigate('/home');
          }}
        >
          HOME으로 가기
        </button>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          뒤로가기
        </button> */}
    </div>
  );
};

export default Edit;

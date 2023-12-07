const MyButton = ({ text, type, onClick }) => {
  // 다른 무작위 클래스가 생성되는것 방지
  const btnType = ['positive', 'negative'].includes(type) ? type : 'default';

  return (
    <button
      className={['MyButton', `MyButton_${btnType}`].join(' ')}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: 'default',
};

export default MyButton;

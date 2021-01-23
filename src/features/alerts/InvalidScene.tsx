import Alert from '../../components/alert/Alert';

const InvalidSceneError = () => {
  return (
    <Alert
      error={'Scene does not exist!'}
      message={'Do you want to create a new scene?'}
      buttons={[
        {
          color: 'green',
          text: 'Yes',
          disabled: false,
          onClick: () => alert('hi')
        }
      ]}
    />
  );
};

export default InvalidSceneError;

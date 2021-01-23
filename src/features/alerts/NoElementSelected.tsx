import Alert from '../../components/alert/Alert';

const NoElementSelected = () => {
  return (
    <Alert
      error={'No element selected!'}
      message={'Select an element before performing that action...'}
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

export default NoElementSelected;

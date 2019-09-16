import GenerateButton from '../code/button'; // func

const COMPONENTS_GENERATE_FUNCTION = type => {
  const config = {
    button: GenerateButton,
  };

  return config[type]; // return func
};

export default COMPONENTS_GENERATE_FUNCTION;

import renderButton from './button';
import renderInput from './input';

const generateCode = type => {
  const config = {
    Button: renderButton,
    Input: renderInput
  };

  return config[type]; // return func
};

export default generateCode;
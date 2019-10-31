const VisButton = {
  type: 'Button',
  props: {
    type: 'primary',
    text: '按钮文字',
  },
  config: {
    type: {
      label: '主题',
      enum: [
        'primary',
        'default',
        'dashed',
        'danger'
      ],
    },
    text: {
      label: '文案'
    },
    icon: {
      label: '图标'
    },
  },
};

export default VisButton;

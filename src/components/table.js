const VisTable = {
  type: 'Table',
  props: {
    bordered: false,
    columns: [],
    dataSource: []
  },
  config: {
    bordered: {
      label: '展示边框',
      enum: [
        true,
        false
      ],
    }
  }
};

export default VisTable;

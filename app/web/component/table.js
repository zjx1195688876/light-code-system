const VisTable = {
  type: 'Table',
  props: {
    bordered: true,
    columns: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      }
    ],
    dataSource: [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      }
    ]
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

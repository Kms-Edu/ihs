import { DataTable } from 'antd-data-table'
import axios from 'axios'
import { DatePicker } from 'antd';

function onChange(date, dateString) {
  console.log(date, dateString);
}
const searchFields = [
  {
    label: 'ID',
    name: 'id',
    type: 'input',
    payload: {
      props: {
        placeholder: 'placeholder'
      }
    }
  },
  {
    label: 'Select',
    name: 'select',
    type: 'select',
    payload: {
      options: [
        { key: '1', label: 'one', value: '1' },
        { key: '2', label: 'two', value: '2' },
        { key: '3', label: 'three', value: '3' }
      ]
    }
  }
]

const columns = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id'
  }, {
    key: 'title',
    title: 'Title',
    dataIndex: 'title'
  }
]

const expands = [
  {
    title: 'Body',
    dataIndex: 'body',
    render (value) {
      return value && `${value.substr(0, 100)} ...`
    }
  },
  {
    title: 'User ID',
    dataIndex: 'userId'
  }
]

const onSearch = async ({ page, pageSize, values }) => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/posts', {
    params: {
      _page: page,
      _limit: pageSize,
      ...values
    }
  })
  return {
    dataSource: res.data,
    total: Number(res.headers['x-total-count'])
  }
}

const Demo = () => {
  return (
    <>
    <DatePicker onChange={onChange} />
    <DataTable
      rowKey={record => record.id}
      searchFields={searchFields}
      initialColumns={columns}
      initialExpands={expands}
      onSearch={onSearch}
      loadDataImmediately={true}
    />
    </>
  )
}

export default Demo

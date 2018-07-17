import { Table, Tooltip } from 'antd';

interface IColunm {
  title: string;
  dataIndex: keyof ITableDataMeta;
  key: string;
  render?: (p: any) => JSX.Element;
}

const columns: IColunm[] = [
  {
    title: 'Prop name',
    dataIndex: 'propName',
    key: 'propName',
    render: text => <span className="propname-text">{text}</span>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: text => <span className="type-text">{text}</span>,
  },
  {
    title: 'Required',
    dataIndex: 'required',
    key: 'required',
  },
  {
    title: 'Default value',
    dataIndex: 'defaultValue',
    key: 'defaultValue'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  }
];

export interface ITableDataMeta {
  key: string;
  propName: string;
  type: string;
  required: string;
  defaultValue?: any;
  description?: string;
}

interface IPropsTableProps {
  data: ITableDataMeta[];
}

interface IPropsTableState {
  showTable: boolean;
}

class PropsTable extends React.Component<IPropsTableProps, IPropsTableState> {
  constructor (props: any) {
    super(props);
    this.state = {
      showTable: true,
    };
  }

  private toggleTable = () => {
    this.setState(state => ({
      showTable: !state.showTable
    }));
  }

  public render () {
    const { data } = this.props;
    const { showTable } = this.state;

    return (
      <div className="dictc-propstable-wrapper">
        <Tooltip title={showTable ? 'Hide table' : 'Show table'}>
          <h3
            className="propstable-title"
            onClick={this.toggleTable}
          >
            PROPS OF COMPONENT
          </h3>
        </Tooltip>
        {
          showTable ?
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
          /> :
          <p>...</p>
        }

      </div>
    );
  }
}

export default PropsTable;

import { Table, Tooltip } from 'antd';
import parsePropTypes from 'parse-prop-types';

const stringifyValue = (value: any) => {
  switch (typeof value) {
    case 'function':
      return value.toString();
    case 'undefined':
      return 'undefined';
    default:
      return JSON.stringify(value);
  }
};

// const formatType = (type: any) => {
//   let typeName: string = '';
//   typeName += type.name;
//   if (type.value) {

//   }
// };

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
  required: string | boolean;
  defaultValue?: any;
  description?: string;
}

interface IParsedMetadata {
  required: boolean;
  defaultValue?: {
    value: any;
  };
  type: {
    name: string;
    value: any;
  }
}

interface IPropsTableProps {
  data?: ITableDataMeta[];
  component?: React.Component;
  parsedData?: {[propName: string]: IParsedMetadata};
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

  private formatOriginalParsedData = () => {
    const { parsedData } = this.props;
    if (parsedData === undefined) {
      console.error('error: Props table cannot read parsed data. Check your dictc config file');

      return [];
    }
    const data: ITableDataMeta[] = [];
    for (const prop in parsedData) {
      if (parsedData.hasOwnProperty(prop)) {
        const metadata: ITableDataMeta = {
          key: prop,
          propName: prop,
          type: parsedData[prop].type.name + (parsedData[prop].type.value ? JSON.stringify(parsedData[prop].type.value) : ''),
          required: JSON.stringify(parsedData[prop].required),
          defaultValue: parsedData[prop].defaultValue ? stringifyValue((parsedData[prop].defaultValue as any).value) : '',
          description: 'nothing',
        };
        data.push(metadata);
      }
    }

    return data;
  }

  // TODO: I hope this works
  private parseFromComponent = () => {
    const { component } = this.props;
    if (component === undefined) {
      console.error('error: Props table cannot read component. Check your dictc config file');

      return [];
    }
    const parsedProps = parsePropTypes(component);
    const data:ITableDataMeta[] = [];
    for (const prop in parsedProps) {
      if (parsedProps.hasOwnProperty(prop)) {
        const metadata: ITableDataMeta = {
          key: prop,
          propName: prop,
          type: parsedProps[prop].type.name + parsedProps[prop].type.value ? JSON.stringify(parsedProps[prop].type.value) : '',
          required: parsedProps[prop].required,
          defaultValue: parsedProps[prop].defaultValue ? parsedProps[prop].defaultValue.value : '',
          description: 'nothing',
        };
        data.push(metadata);
      }
    }

    return data;
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
            dataSource={this.formatOriginalParsedData()}
            pagination={false}
          /> :
          <p>...</p>
        }

      </div>
    );
  }
}

export default PropsTable;

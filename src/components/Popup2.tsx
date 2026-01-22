

interface TableHeaderItem{
    title:string   
}

interface TableDataItem{
    name: string,
    age: number,
    occupation: string,
}

interface PopupProps{
    tableHeader: TableHeaderItem[],
    tableData: TableDataItem[],
}

// const tableHeader = [
//   {title: 'Name'},
//   {title: 'Age'},
//   {title: 'Occupation'},
// ];

// const tableData = [
//   {name: 'Alice', age: 30, occupation: 'Engineer'},
//   {name: 'Bob', age: 25, occupation: 'Designer'},
//   {name: 'Charlie', age: 35, occupation: 'Teacher'},
// ];


export default function Popup2(props: PopupProps) {
    const { tableHeader, tableData } = props;
    return (
        <>
        {/* 给 table、th 添加内联样式，设置边框 + 边框合并 */}
        <table 
            style={{ 
            border: '1px solid #ccc', // 表格外边框：1px 灰色实线
            borderCollapse: 'collapse', // 合并单元格边框（避免重复边框）
            // width: '100%', // 可选：让表格占满宽度
            }}
        >
            <thead>
                <tr>
                    {
                        tableHeader.map(
                            (header:any,index:number) =>(
                                <th 
                                key={index}
                                style={{ 
                                        border: '1px solid #ccc', // 表头单元格边框
                                        padding: '8px 12px', // 可选：添加内边距，文字不挤
                                        backgroundColor: '#f5f5f5', // 可选：表头背景色
                                        }}
                                >
                                    {header.title}
                                </th>
                            )
                        )
                    }
                </tr>
            </thead>

            <tbody>
                {
                    tableData.map(
                        (row:any,rowIndex:number) =>(
                            <tr key={rowIndex}>
                                <td style={{ border: '1px solid #ccc', padding: '8px 12px' }}>{row.name}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px 12px' }}>{row.age}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px 12px' }}>{row.occupation}</td>
                            </tr>
                        )
                    )
                }
            </tbody>
            
        </table>    
        </>
    )
}
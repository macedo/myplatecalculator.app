import { FC } from "react";
import { useTable } from "react-table";

type props = {
  columns: any,
  data: any,
}

const Table: FC<props> = ({columns, data}) => {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({columns, data});

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          // eslint-disable-next-line react/jsx-key
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              // eslint-disable-next-line react/jsx-key
              <th {...column.getHeaderProps()}>
               {
                 column.render('Header')
               }
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);

          return (
            // eslint-disable-next-line react/jsx-key
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <td {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
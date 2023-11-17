import React from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Checkbox,
  Spinner,
  Flex,
  Input,
} from "@chakra-ui/react";
import Button from "./base/button";

function useSkipper() {
  const shouldSkipRef = React.useRef(true);
  const shouldSkip = shouldSkipRef.current;

  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);
  React.useEffect(() => {
    shouldSkipRef.current = true;
  });
  return [shouldSkip, skip];
}

function Column({
  getValue,
  row: { index },
  column: { id },
  table,
}) {
  const initialValue = getValue();
  const [value, setValue] = React.useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(index, id, value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
}

const defaultColumn = {
  cell: Column,
};

export default function Table({
  columns = [],
  data = [],
  editable,
  updateData = () => {},
  getSelectedRows = () => {},
  selectedRows = {},
  loading,
  isSelectable,
}) {
  const [rowSelection, setRowSelection] = React.useState(selectedRows);

  let tableFactory = () => [...columns];

  if (isSelectable) {
    tableFactory = () => [
      {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      ...columns,
    ];
  }

  columns = tableFactory()

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const handleRowSelect = (toggleSelected) => {
    const rowIds = Object.keys(toggleSelected());
    let selectedData = data.filter((_, i) => rowIds.includes(i.toString()));
    getSelectedRows({ data: selectedData, rows: toggleSelected() });
    setRowSelection(toggleSelected);
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      pageSize: 100,
    },
    defaultColumn: editable ? defaultColumn : null,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    enableRowSelection: true,
    onRowSelectionChange: handleRowSelect,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        skipAutoResetPageIndex();
        updateData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    debugTable: false,
  });

  return (
    <>
      <TableContainer w="100%">
        {loading && data.length === 0 ? (
          <Flex w="full" h="500px" justifyContent="center" alignItems="center">
            <Spinner size="lg" />
          </Flex>
        ) : (
          <ChakraTable>
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id} bg="brand.400">
                  {headerGroup.headers.map((header) => {
                    return (
                      <Th
                        key={header.id}
                        colSpan={header.colSpan}
                        color="white"
                      >
                        {header.isPlaceholder ? null : (
                          <>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </>
                        )}
                      </Th>
                    );
                  })}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row, i) => {
                return (
                  <Tr
                    key={row.id}
                    borderColor="gray.200"
                    borderBottomWidth="2px"
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </ChakraTable>
        )}

        <Flex justifyContent="space-between" alignItems="center" px="22px">
          {table.getPageCount() > 0 && (
            <Flex gap="1">
              Page
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </Flex>
          )}

          {!(!table.getCanPreviousPage() && !table.getCanNextPage()) && (
            <Flex justifyContent="end" mt="20px" gap="10px">
              <Button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                fontWeight="600"
              >
                Prev
              </Button>
              <Button
                fontWeight="600"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </Flex>
          )}
        </Flex>
      </TableContainer>
    </>
  );
}

function IndeterminateCheckbox({ indeterminate, className = "", ...rest }) {
  const ref = React.useRef();

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);
  return (
    <Checkbox isChecked={rest.checked} type="checkbox" ref={ref} {...rest} />
  );
}


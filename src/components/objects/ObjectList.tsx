import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MoreHorizontal, Download, ChevronDown, Check } from 'lucide-react';

interface Column {
  key: string;
  title: string;
  render?: (item: any) => React.ReactNode;
}

interface ObjectListProps {
  title: string;
  data: any[];
  columns: Column[];
  basePath: string;
  isLoading?: boolean;
}

const ObjectList: React.FC<ObjectListProps> = ({ title, data, columns, basePath, isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(columns.map(col => col.key));
  const [showColumnSelector, setShowColumnSelector] = useState(false);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredData = sortedData.filter(item => {
    if (!searchTerm) return true;
    
    return Object.values(item).some(value => 
      value && typeof value === 'string' && 
      value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const toggleRowSelection = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleAllSelection = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredData.map(item => item.id));
    }
  };

  const toggleColumnVisibility = (columnKey: string) => {
    if (visibleColumns.includes(columnKey)) {
      setVisibleColumns(visibleColumns.filter(key => key !== columnKey));
    } else {
      setVisibleColumns([...visibleColumns, columnKey]);
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="rounded-md border border-slate-300 pl-9 pr-4 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <button 
            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            onClick={() => setShowColumnSelector(!showColumnSelector)}
          >
            <Filter className="mr-2 h-4 w-4 text-slate-500" />
            Columns
          </button>
          
          {showColumnSelector && (
            <div className="absolute right-48 mt-36 z-10 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 animate-fade-in">
              <div className="p-2">
                {columns.map(column => (
                  <label key={column.key} className="flex items-center px-3 py-2 text-sm hover:bg-slate-100 rounded-md">
                    <input
                      type="checkbox"
                      checked={visibleColumns.includes(column.key)}
                      onChange={() => toggleColumnVisibility(column.key)}
                      className="mr-2 h-4 w-4 rounded border-slate-300 text-primary-600"
                    />
                    {column.title}
                  </label>
                ))}
              </div>
            </div>
          )}
          
          <button className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Download className="mr-2 h-4 w-4 text-slate-500" />
            Export
          </button>
        </div>
      </div>
      
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="w-12 px-3 py-3">
                  <input
                    type="checkbox"
                    checked={filteredData.length > 0 && selectedRows.length === filteredData.length}
                    onChange={toggleAllSelection}
                    className="h-4 w-4 rounded border-slate-300 text-primary-600"
                  />
                </th>
                {columns.filter(col => visibleColumns.includes(col.key)).map(column => (
                  <th
                    key={column.key}
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
                  >
                    <button
                      className="group inline-flex items-center"
                      onClick={() => handleSort(column.key)}
                    >
                      {column.title}
                      <ChevronDown 
                        className={`ml-1 h-4 w-4 flex-shrink-0 text-slate-400 group-hover:text-slate-500 
                        ${sortColumn === column.key && sortDirection === 'desc' ? 'rotate-180' : ''} 
                        ${sortColumn === column.key ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} 
                      />
                    </button>
                  </th>
                ))}
                <th scope="col" className="relative px-3 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={visibleColumns.length + 2} className="px-6 py-4 text-center text-sm text-slate-500">
                    <div className="flex justify-center py-8">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-primary-600"></div>
                    </div>
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map(item => (
                  <tr 
                    key={item.id} 
                    className={`hover:bg-slate-50 ${selectedRows.includes(item.id) ? 'bg-primary-50' : ''}`}
                  >
                    <td className="px-3 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => toggleRowSelection(item.id)}
                        className="h-4 w-4 rounded border-slate-300 text-primary-600"
                      />
                    </td>
                    {columns.filter(col => visibleColumns.includes(col.key)).map(column => (
                      <td 
                        key={`${item.id}-${column.key}`} 
                        className="px-3 py-4 whitespace-nowrap text-sm text-slate-800"
                      >
                        <Link to={`${basePath}/${item.id}`} className="hover:text-primary-600">
                          {column.render ? column.render(item) : item[column.key]}
                        </Link>
                      </td>
                    ))}
                    <td className="px-3 py-4 whitespace-nowrap text-right text-sm">
                      <div className="relative">
                        <button
                          onClick={() => setShowMenu(showMenu === item.id ? null : item.id)}
                          className="inline-flex items-center rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-500"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                        
                        {showMenu === item.id && (
                          <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-fade-in">
                            <Link
                              to={`${basePath}/${item.id}`}
                              className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                              onClick={() => setShowMenu(null)}
                            >
                              View Details
                            </Link>
                            <button
                              className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                              onClick={() => setShowMenu(null)}
                            >
                              Edit
                            </button>
                            <button
                              className="block w-full px-4 py-2 text-left text-sm text-error-600 hover:bg-slate-100"
                              onClick={() => setShowMenu(null)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={visibleColumns.length + 2} className="px-6 py-4 text-center text-sm text-slate-500">
                    No results found. Try adjusting your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex items-center justify-between border-t px-4 py-3">
        <div className="flex items-center">
          <p className="text-sm text-slate-700">
            <span className="font-medium">{filteredData.length}</span> results
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            disabled={true}
          >
            Previous
          </button>
          <button
            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            disabled={true}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ObjectList;
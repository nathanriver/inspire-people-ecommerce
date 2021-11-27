import React from "react";

const Table = ({ children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="shadow table-auto w-full border rounded divide-y">
        {children}
      </table>
    </div>
  );
};

export default Table;

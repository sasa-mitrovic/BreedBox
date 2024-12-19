import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../client";
import { Button, Paper, Table } from "@mantine/core";
import { format, toZonedTime } from "date-fns-tz";
import AddEntryModal from "./AddEntryModal";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { FaSortUp, FaSortDown } from 'react-icons/fa';

interface NestboxData {
  Action: string;
  CreatedDate: string;
  Notes: string;
}

function Nestbox() {
  const { BuildingNumber, NestBoxNumber } = useParams<{
    BuildingNumber: string;
    NestBoxNumber: string;
  }>();
  const [data, setData] = useState<NestboxData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addEntryModalOpen, addEntryModal] = useDisclosure();
  const [sortConfig, setSortConfig] = useState<{ key: keyof NestboxData; direction: 'ascending' | 'descending' }>({
    key: 'CreatedDate',
    direction: 'descending',
  });
  const navigate = useNavigate();
  const refreshData = () => fetchData();
  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("NestBoxHistory")
        .select("Action, CreatedDate, Notes")
        .eq("Building", BuildingNumber)
        .eq("Nestbox", NestBoxNumber)
        .order("CreatedDate", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setData(data);
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [BuildingNumber, NestBoxNumber]);


  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key: keyof NestboxData) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }; 

  const getSortIcon = (key: string) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
    }
    
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Paper shadow="lg" style={{ marginTop: 20, padding: 20, border : '10px outset #888' }}>
      <h1>Building Number: {BuildingNumber}</h1>
      <h1>Nest Box Number: {NestBoxNumber}</h1>
      {data.length > 0 ? (
        <div className="scrollable-table">
        <Table stickyHeader>
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="cursor-pointer" onClick={() => requestSort('Action')}>
                Action {getSortIcon('Action')}
              </Table.Th>
              <Table.Th className="cursor-pointer" onClick={() => requestSort('CreatedDate')}>
                Created Date {getSortIcon('CreatedDate')}
              </Table.Th>
              <Table.Th className="cursor-pointer" onClick={() => requestSort('Notes')}>
                Notes {getSortIcon('Notes')}
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {sortedData.map((item, index) => (
              <Table.Tr key={index}>
                <Table.Td>{item.Action}</Table.Td>
                <Table.Td>{format(toZonedTime(item.CreatedDate, "America/New_York"), "MM-dd-yyyy hh:mm a")}</Table.Td>
                <Table.Td>{item.Notes}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
      ) : (
        <p>No data available</p>
      )}
      <Button onClick={() => navigate("/")}>Go Home</Button>
      <Button onClick={addEntryModal.open}>Add Entry</Button>
      <AddEntryModal opened={addEntryModalOpen} onClose={addEntryModal.close} onSubmit={refreshData}/>
    </Paper>
  );
}

export default Nestbox;


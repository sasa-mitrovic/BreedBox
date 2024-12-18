import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './client';
import { Table } from '@mantine/core';
import { format, toZonedTime } from 'date-fns-tz';

interface NestboxData {
  Action: string;
  CreatedDate: string;
  Notes: string;
}

function Nestbox() {
  const { BuildingNumber, NestBoxNumber } = useParams<{ BuildingNumber: string; NestBoxNumber: string }>();
  const [data, setData] = useState<NestboxData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('NestBoxHistory')
          .select('Action, CreatedDate, Notes')
          .eq('Building', BuildingNumber)
          .eq('Nestbox', NestBoxNumber)
          .order('CreatedDate', { ascending: false });


        if (error) {
          setError(error.message);
        } else {
          const formattedData = data.map((item: NestboxData) => {
            const zonedDate = toZonedTime(item.CreatedDate, 'America/New_York');
            return {
              ...item,
              CreatedDate: format(zonedDate, 'MM-dd-yyyy hh:mm a'),
            };
          });
          setData(formattedData);
        }
      } catch (error) {
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [BuildingNumber, NestBoxNumber]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Nestbox</h1>
      <p>Building Number: {BuildingNumber}</p>
      <p>Nest Box Number: {NestBoxNumber}</p>
      {data.length > 0 ? (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Action</Table.Th>
              <Table.Th>Created Date</Table.Th>
              <Table.Th>Notes</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((item, index) => (
              <Table.Tr key={index}>
                <Table.Td>{item.Action}</Table.Td>
                <Table.Td>{item.CreatedDate}</Table.Td>
                <Table.Td>{item.Notes}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default Nestbox;
// filepath: /c:/Projects/breed-box/src/AddEntryModal.tsx
import React, { useState } from 'react';
import { Modal, Button, TextInput, Textarea } from '@mantine/core';
import { supabase } from './client';
import { toZonedTime } from 'date-fns-tz';

interface AddEntryModalProps {
  opened: boolean;
  onClose: () => void;
}

const AddEntryModal: React.FC<AddEntryModalProps> = ({ 
  opened, 
  onClose, 
}) => {
  const [buildingNumber, setBuildingNumber] = useState('');
  const [nestboxNumber, setNestboxNumber] = useState('');
  const [action, setAction] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.from('NestBoxHistory').insert([
      {
        Building: buildingNumber,
        Nestbox: nestboxNumber,
        Action: action,
        Notes: notes,
        CreatedDate: toZonedTime(new Date(), 'America/New_York').toLocaleString(),
      },
    ]);
    
    if (error) {
      setError(error.message);
    } else {
      onClose();
    }
    
    setLoading(false);
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Entry" centered>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Building"
          value={buildingNumber}
          onChange={(e) => setBuildingNumber(e.currentTarget.value)}
          required
        />
        <TextInput
          label="Nestbox"
          value={nestboxNumber}
          onChange={(e) => setNestboxNumber(e.currentTarget.value)}
          required
        />
        <TextInput
          label="Action"
          value={action}
          onChange={(e) => setAction(e.currentTarget.value)}
          required
        />
        <Textarea
          label="Notes"
          value={notes}
          onChange={(e) => setNotes(e.currentTarget.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit" loading={loading}>
          Add Entry
        </Button>
      </form>
    </Modal>
  );
};

export default AddEntryModal;
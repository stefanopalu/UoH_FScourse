import { useState } from 'react';
import { NewEntry } from '../types';

interface NewEntryFormProps {
    onEntryCreate: (entryData: NewEntry) => void;
}

const NewEntryForm = ({ onEntryCreate }: NewEntryFormProps) => {
    const [date, setDate] = useState("");
    const [weather, setWeather] = useState("");
    const [visibility, setVisibility] = useState("");
    const [comment, setComment] = useState("");

    const entryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();
        onEntryCreate({ date, weather, visibility, comment });
        setDate('');
        setWeather('');
        setVisibility('');
        setComment('');
      };

    return (
    <div>
        <form onSubmit={entryCreation}>
       <div>
         date
         <input
           type="text"
           value={date}
           onChange={({ target }) => setDate(target.value)}
         />
       </div>
       <div>
         visibility
         <input
           type="text"
           value={visibility}
           onChange={({ target }) => setVisibility(target.value)}
         />
       </div>
       <div>
         weather
         <input
           type="text"
           value={weather}
           onChange={({ target }) => setWeather(target.value)}
         />
       </div>
       <div>
         comment
         <input
           type="text"
           value={ comment}
           onChange={({ target }) => setComment(target.value)}
         />
       </div>
       <button type="submit">add</button>
     </form>
    </div>
    );
};

export default NewEntryForm
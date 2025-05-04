import { useState } from 'react';
import { NewEntry, Visibility, Weather } from '../types';

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
        <fieldset>
        <legend>date</legend>
            <input
                type="date"
                value={date}
                onChange={({ target }) => setDate(target.value)}
            />
        </fieldset>
        <fieldset>
        <legend>visibility</legend>
         {Object.values(Visibility).map((value)=> (
            <label key={value}>
              <input
                type="radio"
                value={value}
                checked={visibility === value}
                onChange={({ target }) => setVisibility(target.value)}
              />
              {value.charAt(0) + value.slice(1)}
            </label>
         ))}
       </fieldset>
       <fieldset>
         <legend>weather</legend>
         {Object.values(Weather).map((value)=> (
         <label key={value}>
         <input
           type="radio"
           value={value}
           checked={weather === value}
           onChange={({ target }) => setWeather(target.value)}
         />
         {value.charAt(0) + value.slice(1)}
         </label>
         ))}
       </fieldset>
       <fieldset>
         <legend>comment</legend>
         <input
           type="text"
           value={ comment}
           onChange={({ target }) => setComment(target.value)}
         />
       </fieldset>
       <button type="submit">add</button>
     </form>
    </div>
    );
};

export default NewEntryForm
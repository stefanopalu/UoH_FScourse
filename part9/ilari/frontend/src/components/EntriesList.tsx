import { Entry } from '../types'

interface EntriesListProps {
    entries: Entry[];
}

const EntriesList = ({ entries }: EntriesListProps) => {
    return (
    <div>
        {entries.map((entry, index) => (
            <div key={index}>
                <h4>{entry.date}</h4>
                <p>visibility: {entry.visibility}</p>
                <p>weather: {entry.weather}</p>
            </div>
        ))}
    </div>
    );
};

export default EntriesList
import { CoursePart } from "./types";
import Part from "./part";

interface ContentProps {
    parts: CoursePart[];
}

const Content = ({ parts }: ContentProps) => {
    return (
    <div>
        {parts.map(part  => (
            <Part key={part.name} part={part} />
        ))}
    </div>
    );
};

export default Content
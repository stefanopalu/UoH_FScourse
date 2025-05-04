import { CoursePart } from "./types";

interface PartProps {
    part: CoursePart;
}

const Part = ({ part }: PartProps) => {
    switch (part.kind) {
        case "basic":
            return (
                <div>
                    <h5>{part.name} {part.exerciseCount}</h5>
                    <p>{part.description}</p>
                </div>
            )
        case "group":
            return (
                <div>
                    <h5>{part.name} {part.exerciseCount}</h5>
                    <p>project exercises {part.groupProjectCount}</p>
                </div>
            )
        case "background":
            return (
                <div>
                    <h5>{part.name} {part.exerciseCount}</h5>
                    <p>{part.description}</p>
                    <p>submit to {part.backgroundMaterial}</p>
                </div>
            )
        case "special":
            return (
                <div>
                    <h5>{part.name} {part.exerciseCount}</h5>
                    <p>{part.description}</p>
                    <p>required skills: {part.requirements.join(", ")}</p>
                </div>
            )

    default:
        const assertNever = (value: never): never => {
            throw new Error(
                `Unhandled discriminated union member: ${JSON.stringify(value)}`
            )
        }
        return assertNever(part)
    }
}

export default Part;
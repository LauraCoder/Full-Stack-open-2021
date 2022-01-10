import React from 'react';
import { assertNever } from '../utils';
import { PartProps } from '../types';

const Part = ({ part }: PartProps) => {
  switch(part.type) {
    case "normal":
      return (
        <>
          <p>
            <strong>
              {part.name} {part.exerciseCount} 
            </strong><br />
            <em>
              {part.description}
            </em>
          </p>
        </>
      )
    case "groupProject":
      return (
        <>
          <p>
            <strong>
              {part.name} {part.exerciseCount} 
            </strong><br />
            project exercises {part.groupProjectCount}
          </p>
        </>
      )
    case "submission":
      return (
        <>
          <p>
            <strong>
              {part.name} {part.exerciseCount} 
            </strong><br />
            <em>
              {part.description}
            </em><br />
            submit to {part.exerciseSubmissionLink}
          </p>
        </>
      )
      case "special":
        return (
          <>
            <p>
              <strong>
                {part.name} {part.exerciseCount} 
              </strong><br />
              <em>
                {part.description}
              </em><br />
              required skills: {part.requirements.join(',')}
            </p>
          </>
        )
    default:
      return assertNever(part);
  }
};

export default Part;
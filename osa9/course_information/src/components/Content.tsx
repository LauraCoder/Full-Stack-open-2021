import React from 'react'
import Part from './Part';
import { CoursePartsProps } from '../types';

const Content = ({ courseParts }: CoursePartsProps) => {   
  return (
    <>
      {courseParts.map(part =>
        <Part key={part.name} part={part} />
      )}
    </>
  );
};

export default Content;
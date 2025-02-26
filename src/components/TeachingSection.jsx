import React from 'react';
import { GraduationCap, FileCheck } from 'lucide-react';
import { academicData } from '../data/academicData';

const TeachingSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <GraduationCap className="w-6 h-6" />
          Teaching Experience
        </h2>
        <div className="space-y-4">
          {academicData.teaching.courses.map((course, index) => (
            <div 
              key={index} 
              className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 card-hover"
            >
              <h3 className="font-medium text-gray-900">{course.course}</h3>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">{course.institution}</p>
                <p className="text-sm text-gray-600">{course.period} • {course.credits} ECTS</p>
                <p className="text-sm text-gray-500">{course.type} course • {course.level}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <FileCheck className="w-6 h-6" />
          Thesis Supervision
        </h2>
        <div className="space-y-4">
          {academicData.teaching.supervision.map((thesis, index) => (
            <div 
              key={index} 
              className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 card-hover"
            >
              <h3 className="font-medium text-gray-900">{thesis.title}</h3>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">Student: {thesis.student}</p>
                <p className="text-sm text-gray-600">{thesis.type} • Grade: {thesis.grade}</p>
                <p className="text-sm text-gray-500">{thesis.institution} - {thesis.campus} • {thesis.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeachingSection;
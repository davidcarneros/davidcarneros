import React from 'react';
import { GraduationCap, FileCheck } from 'lucide-react';
import { academicData } from '../data/academicData';

const TeachingSection = () => {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
          <div className="p-2 bg-primary-500/10 rounded-lg">
            <GraduationCap className="w-6 h-6 text-primary-500" />
          </div>
          Teaching Experience
        </h2>
        <div className="space-y-6">
          {academicData.teaching.courses.map((course, index) => (
            <div
              key={index}
              className="group p-6 bg-dark-surface rounded-xl border border-dark-border hover:border-primary-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(14,165,233,0.1)]"
            >
              <h3 className="font-medium text-xl text-gray-100 group-hover:text-primary-400 transition-colors">{course.course}</h3>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                  {course.institution}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{course.period}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                  <span>{course.credits} ECTS</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                  <span className="px-2 py-0.5 rounded-full bg-dark-bg border border-dark-border">{course.type} course</span>
                  <span className="px-2 py-0.5 rounded-full bg-dark-bg border border-dark-border">{course.level}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <FileCheck className="w-6 h-6 text-purple-500" />
          </div>
          Thesis Supervision
        </h2>
        <div className="space-y-6">
          {academicData.teaching.supervision.map((thesis, index) => (
            <div
              key={index}
              className="group p-6 bg-dark-surface rounded-xl border border-dark-border hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]"
            >
              <h3 className="font-medium text-xl text-gray-100 group-hover:text-purple-400 transition-colors">{thesis.title}</h3>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-400">Student: <span className="text-gray-200">{thesis.student}</span></p>
                <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">{thesis.type}</span>
                  <span>Grade: {thesis.grade}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                  <span>{thesis.institution} - {thesis.campus}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                  <span>{thesis.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeachingSection;
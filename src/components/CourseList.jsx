import React from "react";

const CourseList = ({ courses }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold text-indigo-600 mb-4">Your Courses</h3>
      {courses.length === 0 ? (
        <p className="text-gray-500">No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white p-4 rounded-lg shadow-md text-center"
            >
              <h4 className="font-bold text-lg">{course.name}</h4>
              <p className="text-gray-500">{course.description}</p>
              <p className="font-bold text-indigo-600">
                Purchased on: {new Date(course.purchase_date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;

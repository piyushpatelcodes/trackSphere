import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

type Intern = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  college?: string;
  course?: string;
  skills: string[];
  startDate: Date;
  endDate?: Date;
  projectAssigned?: string[];
};

type ModalProps = {
  isOpen: boolean;
  internData: Intern;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (updatedData: any) => void;
};

const UPDATE_INTERN = gql`
  mutation updateIntern($id: String!, $updateInternInput: UpdateInternInput!) {
    updateIntern(id: $id, updateInternInput: $updateInternInput) {
      id
      name
      email
      phone
      college
      course
      skills
      startDate
      endDate
      projectAssigned
    }
  }
`;



const UpdateInternModal: React.FC<ModalProps> = ({ isOpen, internData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<{
    id:string;
    name: string;
    email: string;
    phone: string;
    college: string;
    course: string;
    skills: string[];
    startDate: string; 
    endDate: string;   
    projectAssigned: string[];
  }>({
    id:"",
    name: '',
    email: '',
    phone: '',
    college: '',
    course: '',
    skills: [],
    startDate: '',
    endDate: '',
    projectAssigned: [],
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [updateIntern] = useMutation<any>(UPDATE_INTERN);

  useEffect(() => {
    if (internData) {
      setFormData({
        id: internData.id,
        name: internData.name,
        email: internData.email,
        phone: internData.phone || '',
        college: internData.college || '',
        course: internData.course || '',
        skills: internData.skills || [],
        startDate: internData.startDate ? internData.startDate.toString() : '', 
        endDate: internData.endDate ? internData.endDate.toString() : '', 
        projectAssigned: internData.projectAssigned || [],
      });
    }
  }, [internData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data } = await updateIntern({
        variables: {
          id: formData.id, // Send intern ID
          updateInternInput: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            college: formData.college,
            course: formData.course,
            skills: formData.skills,
            startDate: formData.startDate,
            endDate: formData.endDate,
            // projectAssigned: formData.projectAssigned,
          },
        },
      });

      console.log('Updated intern:', data?.updateIntern);
      onSubmit(data?.updateIntern);
      onClose();  
    } catch (error) {
      console.error('Error updating intern:', error);
    }};

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-transparent  p-6 rounded-xl w-full max-w-md space-y-6 shadow-lg border border-gray-800 backdrop-blur-3xl">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Update Intern</h3>
          <button onClick={onClose}>
            <FaTimes className="text-lg text-gray-500 hover:text-gray-900" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">College</label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Course</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Skills</label>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-xs font-medium text-white bg-purple-600 rounded-full px-3 py-1"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Projects</label>
            <div className="flex flex-wrap gap-2">
              {formData.projectAssigned.map((project, index) => (
                <span
                  key={index}
                  className="text-xs font-medium text-white bg-teal-600 rounded-full px-3 py-1"
                >
                  {project}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-transparent border border-gray-600 rounded-md focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="text-sm cursor-pointer text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 cursor-pointer text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Update Info
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateInternModal;

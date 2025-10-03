import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { FiSearch, FiHome, FiInfo, FiLogOut } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa";
import { IoLogoFirebase } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import PendingProjects from "../components/PendingProjects";
import UpdateInternModal from "../components/UpdateModal";

type GetAllInternsQuery = {
  getAllInterns: Intern[];
};

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

const GET_INTERNS = gql`
  query {
    getAllInterns {
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

const Analytics: React.FC = () => {
  const { loading, error, data } = useQuery<GetAllInternsQuery>(GET_INTERNS);
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [internData, setInternData] = useState<Intern | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredInterns, setFilteredInterns] = useState<Intern[]>([]);

  useEffect(() => {
    if (data && data?.getAllInterns?.length > 0) {
      setSelectedIntern(data.getAllInterns[0]);
      setSelectedIndex(0);
      setFilteredInterns(
        data.getAllInterns.filter((intern) =>
          intern.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [data, searchQuery]);
  if (loading)
    return (
      <div className="text-white bg-gray-700 w-full h-[1000vh]">Loading...</div>
    );
  if (error) return <div>Error fetching data: {error.message}</div>;
  console.log("🚀 ~ Analytics ~ data:", data);

  const handleInternSelect = (intern: Intern, index: number) => {
    setSelectedIntern(intern);
    setSelectedIndex(index);
  };

  const openModal = () => {
    setInternData(selectedIntern);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (updatedData: Intern) => {
    console.log("Updated intern data:", updatedData);
  };

  return (
    <div className="h-screen w-screen bg-gray-900 text-white flex flex-col scrollbar-hide">
      {/* Top Nav */}
      <header className="flex items-center justify-between px-8 py-4 bg-gray-800 shadow-md">
        <div className="flex items-center gap-4">
          <span className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#ffac33] to-[#ff7b00] flex items-center justify-center">
            <IoLogoFirebase className="text-2xl text-white" />
          </span>
          <span className="font-medium text-sm text-gray-400">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}{" "}
            ·
            {new Date().toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-gray-400 text-xl">
            <FiSearch />
          </button>
          <div className="flex items-center gap-3">
            <img
              src="https://media.licdn.com/dms/image/v2/D4D03AQHF9wF76AXhRQ/profile-displayphoto-shrink_400_400/B4DZQ3eVd8G0Ag-/0/1736097487411?e=1762387200&v=beta&t=ByalvGveNwfZouMV0Ylp1xGQIaOJ-cOV3DwwUPsk6AM"
              alt="Piyush Patel"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-300">
              Piyush Patel
            </span>
          </div>
          <button className="text-gray-400 text-xl">
            <BsThreeDots />
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-24 bg-gray-800 flex flex-col items-center py-8 px-2 shadow-lg">
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="w-15 h-15 cursor-pointer transition-all duration-300 flex items-center justify-center rounded-lg bg-gradient-to-tr from-[#ffac33] to-[#ff7b00] text-white hover:text-gray-300/50 shadow-md mb-6"
          >
            <FiHome size={20} />
          </button>

          <button className="relative group w-15 h-15 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 bg-gray-700 text-gray-300 hover:bg-gray-600 mb-auto">
            <FiInfo size={20} />
            <div className="absolute  pointer-events-none top-0 right-0 w-72 px-6 py-3 rounded-md translate-x-74 bg-black text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Zoom Out from Screen to Enhance the Experience.
            </div>
          </button>

          <button className=" w-15 h-15 flex items-center justify-center rounded-lg  bg-gray-700 text-gray-300 hover:bg-red-600/50 cursor-pointer transition-all duration-300 mb-4">
            <FiLogOut size={20} />
          </button>
        </aside>

        <section className="w-80 bg-gray-700/80 rounded-md py-5 px-4">
          <div className="flex items-center justify-between mb-6">
            <span className="font-semibold text-xl text-white">People</span>
            <select className="bg-transparent text-gray-400 text-sm border-none">
              <option>All</option>
            </select>
          </div>
          <div className="relative mb-6">
            <FiSearch className="absolute left-4 top-3 text-gray-400" />
            <input
              className="pl-10 pr-4 py-2 w-full rounded-md bg-gray-700 text-white text-sm shadow-lg border-none focus:ring focus:ring-orange-200"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* People list */}
          <div className="flex flex-col space-y-3 overflow-y-auto max-h-[85%] scrollbar-hide">
            {filteredInterns?.map((person: Intern, idx: number) => (
              <button
                key={person.id}
                onClick={() => handleInternSelect(person, idx)}
                className={` flex items-center gap-3 px-4 py-3 rounded-lg group transition bg-gray-600/50 cursor-pointer hover:bg-gray-700 ${
                  person.name === selectedIntern?.name
                    ? "bg-gray-700 border-l-4 border-[#ffac33] shadow-md"
                    : ""
                }`}
              >
                <img
                  src={`https://randomuser.me/api/portraits/men/${idx}.jpg`}
                  alt={person.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 text-left text-sm   text-white">
                  <span className="font-bold  ">{person.name}</span>
                  <br></br>
                  <span className="text-amber-500/50">{person.email}</span>
                </div>
              </button>
            ))}

            <div className="absolute bottom-0  left-0 right-0 h-20 bg-gradient-to-t from-blue-500/20 via-transparent to-transparent pointer-events-none"></div>
          </div>
        </section>

        {/* Main Area */}
        <main className="flex-1 p-8 bg-gray-900 scrollbar-hide overflow-y-auto">
          <div className="flex items-center gap-8 mb-8">
            <img
              src={`https://randomuser.me/api/portraits/men/${selectedIndex}.jpg`}
              className="w-24 h-24 rounded-full object-cover shadow-xl"
              alt="User"
            />
            <div className="flex flex-col flex-1 gap-2">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-xl text-white">
                  {selectedIntern?.name}
                </span>
                <span className="text-green-500 text-xs font-semibold">
                  Online
                </span>
              </div>
              <span className="text-xs text-gray-400">
                Since:{" "}
                {selectedIntern?.startDate &&
                  new Date(selectedIntern.startDate).toLocaleDateString()}
              </span>

              <span className="text-xs text-gray-400">
                To:{" "}
                {selectedIntern?.endDate &&
                  new Date(selectedIntern.endDate).toLocaleDateString()}
              </span>

              <span className="text-xs text-gray-400">
                Course: {selectedIntern?.course} Intern
              </span>
              <div className="flex flex-wrap gap-2 ">
                Skills:
                {selectedIntern?.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs max-w-48 font-medium text-purple-400 bg-purple-800/60 rounded-full px-3 py-1 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-purple-700 shadow-md hover:shadow-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-400">
                Performance:{" "}
                <span className="font-semibold text-gray-200">4.3</span>
              </span>
              <span className="text-sm text-gray-400">
                Intern rating:{" "}
                <span className="font-semibold text-gray-200">4.9</span>
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={openModal}
                className="bg-[#fca869] hover:bg-[#fd8c2e] rounded-lg shadow text-white font-semibold py-2 px-4"
              >
                Update Info
              </button>
              {isModalOpen && internData && (
                <UpdateInternModal
                  isOpen={isModalOpen}
                  internData={internData}
                  onClose={closeModal}
                  onSubmit={handleSubmit}
                />
              )}
              <button className="bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold py-2 px-4">
                Book a meeting
              </button>
            </div>
          </div>

          {/* Chart Overview */}
          <div className="bg-gray-800 rounded-xl shadow-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-white text-lg">
                Performance Overview
              </span>
              <select className="bg-gray-800 text-gray-400 text-xs border border-gray-600 rounded-md px-3 py-1">
                <option>This week</option>
                <option>This month</option>
                <option>This year</option>
              </select>
            </div>
            <div className="bg-gray-800 rounded-xl shadow-xl p-6 mb-8">
              <PendingProjects
                projects={selectedIntern?.projectAssigned ?? []}
              />
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-gray-800 rounded-xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-white text-lg">
                Recent Reviews
              </span>
              <button className="text-sm text-[#ffac33] hover:underline">
                View all
              </button>
            </div>
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <img
                  src="https://randomuser.me/api/portraits/women/45.jpg"
                  alt="Reviewer"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-white text-sm">
                      Sarah Jones
                    </span>
                    <span className="text-xs text-yellow-400 flex items-center">
                      <FaRegStar />
                      5.0
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Excellent service, highly recommend!
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <img
                  src="https://randomuser.me/api/portraits/men/33.jpg"
                  alt="Reviewer"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-white text-sm">
                      Mark Thompson
                    </span>
                    <span className="text-xs text-yellow-400 flex items-center">
                      <FaRegStar />
                      4.8
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Great experience, very professional.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;

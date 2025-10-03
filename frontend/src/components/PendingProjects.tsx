import React from "react";

const randomSkill = () => {
  const skills = ["React", "UI/UX", "API", "DevOps", "Testing", "NodeJS"];
  return skills[Math.floor(Math.random() * skills.length)];
};
const randomDates = (): [string, string] => {
  const start = new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000);
  const end = new Date(start.getTime() + (Math.floor(Math.random() * 20) + 1) * 86400000);
  return [start.toISOString().slice(0, 10), end.toISOString().slice(0, 10)];
};
const randomProg = () => {
  return Math.random() < 0.4 ? 100 : Math.floor(Math.random() * 100);
};
const getStatus = (val: number) =>
  val === 100 ? "Completed" : val > 0 ? "In Progress" : "Pending";

const statusColor: Record<string, string> = {
  Completed: "bg-green-100 text-green-700 border-green-200",
  "In Progress": "bg-yellow-100 text-yellow-700 border-yellow-200",
  Pending: "bg-gray-100 text-gray-700 border-gray-200",
};

type TableProps = {
  projects: string[];
};

const ProjectTable: React.FC<TableProps> = ({ projects }) => {
  const tableData = React.useMemo(() => {
    return projects?.map((name) => {
      const [start, end] = randomDates();
      const skill = randomSkill();
      const progress = randomProg();
      return {
        name,
        start,
        end,
        skill,
        progress,
        status: getStatus(progress),
      };
    });
  }, [projects]);

  return (
    <div className="overflow-x-auto w-full mx-auto mt-10">
      <table className="min-w-full text-sm rounded-xl shadow-lg overflow-hidden bg-white">
        <thead>
          <tr className="bg-gradient-to-r from-amber-200 to-orange-100">
            <th className="px-4 py-3 text-left font-bold tracking-tight text-orange-800">Project Name</th>
            <th className="px-4 py-3 text-left font-semibold text-orange-700">Start Date</th>
            <th className="px-4 py-3 text-left font-semibold text-orange-700">End Date</th>
            <th className="px-4 py-3 text-left font-semibold text-orange-700">Skill Required</th>
            <th className="px-4 py-3 text-left font-semibold text-orange-700">Progress</th>
            <th className="px-4 py-3 text-left font-semibold text-orange-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((row, idx) => (
            <tr className="even:bg-orange-50" key={idx}>
              <td className="px-4 py-3 font-medium text-gray-900">{row.name}</td>
              <td className="px-4 py-3 text-gray-700">{row.start}</td>
              <td className="px-4 py-3 text-gray-700">{row.end}</td>
              <td className="px-4 py-3">
                <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold bg-orange-100 text-orange-700">
                  {row.skill}
                </span>
              </td>
              <td className="px-4 py-3 w-48">
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className={`h-full ${
                        row.progress === 100
                          ? "bg-gradient-to-r from-green-400 to-green-500"
                          : row.progress > 0
                          ? "bg-gradient-to-r from-yellow-300 to-orange-400"
                          : "bg-gray-400"
                      }`}
                      style={{ width: `${row.progress}%` }}
                    ></div>
                  </div>
                  <span className="tabular-nums text-xs font-semibold text-gray-800">{row.progress}%</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className={`inline-block px-3 py-1 rounded-full border text-xs font-bold capitalize ${statusColor[row.status]}`}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
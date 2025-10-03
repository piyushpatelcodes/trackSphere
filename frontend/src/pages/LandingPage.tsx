import React from 'react'
import { FiSearch, FiMail } from "react-icons/fi";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { IoLogoFirebase } from "react-icons/io5";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr overflow-hidden from-[#0f1021] via-[#3c2a20] to-[#ffac33] flex flex-col items-center pb-20">
      <header className="flex items-center justify-between w-full px-8 py-5 bg-[#211c1c]/60 backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-4">
          <span className="w-14 h-14 rounded-xl bg-gradient-to-tr from-[#ffac33] to-[#ff7b00] flex items-center justify-center shadow-xl">
            <IoLogoFirebase className="text-3xl text-white drop-shadow-2xl" />
          </span>
          <span className="font-semibold text-lg text-orange-200 tracking-tight drop-shadow">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}{" "}
            ·{" "}
            {new Date().toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-orange-100 text-2xl p-2 rounded-full hover:bg-orange-900/20 transition duration-200">
            <FiSearch />
          </button>
          <div className="flex items-center gap-3">
            <img
              src="https://media.licdn.com/dms/image/v2/D4D03AQHF9wF76AXhRQ/profile-displayphoto-shrink_400_400/B4DZQ3eVd8G0Ag-/0/1736097487411?e=1762387200&v=beta&t=ByalvGveNwfZouMV0Ylp1xGQIaOJ-cOV3DwwUPsk6AM"
              alt="Piyush Patel"
              className="w-10 h-10 rounded-full object-cover border-2 border-orange-400 shadow"
            />
            <span className="text-md font-semibold text-orange-200">Piyush Patel</span>
          </div>
          <button className="text-orange-100 text-2xl p-2 rounded-full hover:bg-orange-900/30 transition duration-200">
            <BsThreeDots />
          </button>
        </div>
      </header>

      <section className="flex flex-col items-center mt-20 mb-12 text-center px-3">
      <div className="flex flex-col items-center gap-8 text-center px-10 pb-10">
          <div className="flex py-2 px-4 bg-white/10 rounded-full border border-white/30 text-white items-center gap-3 text-sm w-max uppercase tracking-wider">
            <span>✨</span>
            <span>We are launching soon — get early access!</span>
          </div>

          <h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
            Take Control of Your <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent font-mono italic">
              Interns
            </span> &{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent font-serif italic">
              Growth
            </span>
          </h1>

          <p className="max-w-3xl text-white/80  text-lg leading-relaxed">
Track Progress, Manage Projects, Collaborate with Interns, and Stay Consistent <br />
  Achieve Your Goals with Efficiency.          </p>

          <div className="flex gap-6">
            <button onClick={()=>{window.location.href='/analytics'}} className="bg-gradient-to-r cursor-pointer from-blue-400 to-cyan-400 text-white px-6 py-3 rounded-lg font-semibold text-base shadow-lg hover:brightness-110 transition">
              Start Tracking
            </button>
            <button className="bg-white px-6 py-3 rounded-lg font-semibold text-base text-neutral-800 hover:brightness-95 transition">
              Explore Plans
            </button>
          </div>
        </div>

      </section>

      <img src="/demo.png" alt="demo img" className='rounded-xl border-2 border-gray-500/40 w-[80%] h-8xl hover:blur-xl transition-all duration-600 ease-in-out' />
       <footer className="bg-[#211c1c] text-white py-8 mt-16 translate-y-56 rounded-xl border-1 cursor-pointer hover:-translate-y-0 transition-all duration-500 ease-in-out border-white/20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-2xl font-semibold text-orange-300 mb-3">Piyush Patel</h3>
            <p className="text-sm text-gray-400 max-w-xs">
              Passionate developer focused on creating impactful solutions. Always learning and exploring new technologies. Let's collaborate!
            </p>
          </div>

          <div className="flex gap-6 justify-center md:justify-start">
            <a href="https://github.com/piyushpatelcodes" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-600">
              <FaGithub className="text-3xl" />
            </a>
            <a href="https://www.linkedin.com/in/piyushpatelcodes" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-600">
              <FaLinkedin className="text-3xl" />
            </a>
            <a href="mailto:piyushpatelcodes@example.com" className="text-orange-400 hover:text-orange-600">
              <FiMail className="text-3xl" />
            </a>
          </div>
        </div>

        <div className="flex justify-between items-center border-t border-gray-600 pt-4">
          <ul className="text-sm text-gray-400 flex gap-6">
            <li><a href="/" className="hover:text-orange-300">About</a></li>
            <li><a href="https://piyushpatelcodes.notion.site/274227876587806681e4de4ba96ae232?v=2742278765878060ba16000ccc52ab0e" className="hover:text-orange-300">Projects</a></li>
            <li><a href="/" className="hover:text-orange-300">Blog</a></li>
            <li><a href="/" className="hover:text-orange-300">Contact</a></li>
          </ul>
          <span className="text-gray-400 text-sm">© {new Date().getFullYear()} Piyush Patel. All rights reserved.</span>
        </div>
      </div>
    </footer>

 
    </div>
  );
};

export default LandingPage;

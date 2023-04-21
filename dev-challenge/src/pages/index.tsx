import { useEffect, useState } from 'react'; // import react hooks
import Link from 'next/link';

export default function Home() {

const [projects, setProjects] = useState([]);

// Hook used to fetch data from the sql database
useEffect(() => {
  async function getProjects() {
    const response = await fetch('/api/projects'); // fetch all projects using API request
    const projectsData = await response.json(); // fetch project's info
    setProjects(projectsData); // set 'projects' variable with data
  }
  getProjects();
}, []);

return (
  <main className="flex min-h-screen flex-col items-center p-24">
    <div className = "title-bubble">
      <h1>
        projects 🚀
      </h1>
    </div>
    <div className = "content-bubble">
      <table className = "project-table">
        <thead>
          <tr>
            <th className = "name">Project Name</th>
            <th className= "url">Project Page URL</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.project_id}>
              <td className = "project-name">{project.project_name}</td>
              <td>
                <Link className = "hover-info" href="/projects/[id]" as={`/projects/${project.project_id}`}>
                  More Info
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>  
  </main>
)
}
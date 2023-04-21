import { useEffect, useState } from 'react'; // import react hooks
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Project () {
    const router = useRouter();
    const { id } = router.query; // Retrieve the router
    const [projects, setProjects] = useState([]);

    // Hook used to fetch data from the sql database
    useEffect(() => {

        // If there is no ID, return
        if(!id) {
            return;
        }
        async function getProject() {
            const response = await fetch(`/api/projects/${id}`); // fetch project using API request
            const projectsData = await response.json(); // fetch project's info
            setProjects(projectsData); // set 'projects' variable with data
        }
        getProject();   
    }, [id]);


    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            {projects.map((project) => (
                <div className = "container">
                    <div className = "title-bubble info">
                        <h1>
                            {project.project_name} ⚙️ 
                        </h1>
                    </div>
                    <div className = "content-bubble info">
                        <div className = "wrapper">
                            <h2 className = "founder">
                                Founder:
                            </h2>
                            <h3>
                                {project.project_founder}
                            </h3>
                            <h2 className = "desc">
                                Description: 
                            </h2>
                            <h3>
                                {project.project_description}
                            </h3>
                        </div>
                    </div>
                </div>
            ))}
        </main>
    )
}
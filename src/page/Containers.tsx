import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface profectInterface {
    _id: string
}

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleToggle = () => {
    setIsDisabled(!isDisabled);
  };

  // State to manage list of projects
  const [projects, setProjects] = useState<profectInterface[]>([]);

  // Function to fetch projects from the API
  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/container/list`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      console.log(data);
      setProjects(data); // Assuming the response contains an array of project names
    } catch (error) {
      console.error("Error fetching projects:", error);
      // Handle error (e.g., show error message to the user)
    }
  };

  // Function to handle adding new project
  const handleAddProject = async () => {
    handleToggle();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/container/new`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
          }
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add project");
      }
      const data = await response.json();
      console.log(data);
      fetchProjects();
      // Redirect to the home page or any other page after successful project creation
      navigate(`/id/${data._id.toString()}`); // Replace '/home' with the desired URL
    } catch (error) {
      console.error("Error adding project:", error);
      // Handle error
    } finally{
      handleToggle();
    }
  };

  // Fetch projects when the component mounts
  useEffect(() => {
    fetchProjects();
  }, []); // Empty dependency array to only run once on mount

  return (
    <div className="container mt-5">
      <h2>Add New Project</h2>
      <button className="btn btn-primary mb-3" onClick={handleAddProject} disabled={isDisabled}>
        Add Project
      </button>
      {!isDisabled?``:`   Loading....`}
      <h2>List of Projects</h2>
      <ul className="list-group">
        {projects.map((project, index) => (
          <Link key={index} to={`/id/${project._id}`} className="list-group-item">
            {project._id}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetchData from '../utils/fetchData';
import Star from '../components/Star'; // Import the Star component
import '../styles/Portfolio.css';

const Portfolio = () => {
  const { name } = useParams(); // Use the name from the route parameter
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const getFileUrl = `https://starchart-988582688687.us-central1.run.app/getFile?fileName=${name}.json`;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchData(getFileUrl);
        setProfile(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message);
      }
    };

    fetchProfile();
  }, [getFileUrl]);

  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!profile) return <div>Loading...</div>;

  const starCount = 100; // Number of stars to render

  return (
    <div className="portfolio">
      {/* Render the stars */}
      {Array.from({ length: starCount }).map((_, index) => (
        <Star key={index} />
      ))}

      <header>
        <h1>{profile.name || 'Name: N/A'}</h1>
        <p className='about-text'>{profile.about || 'About: N/A'}</p>
      </header>
      <main>
        <section>
          <h2>Skills</h2>
          <ul>
            {profile.skills && profile.skills.length > 0
              ? profile.skills.map((skill, index) => <li key={index}>{skill}</li>)
              : <li>N/A</li>}
          </ul>
        </section>
        <section>
          <h2>Experience</h2>
          {profile.experience && profile.experience.length > 0 ? (
            profile.experience.map((job, index) => (
              <div key={index}>
                <h3>{job.title || 'Title: N/A'}</h3>
                <p>{job.company || 'Company: N/A'}</p>
                <p>{job.description || 'Description: N/A'}</p>
                <p>{job.duration || 'Duration: N/A'}</p>
                <p>{job.location || 'Location: N/A'}</p>
              </div>
            ))
          ) : (
            <p>N/A</p>
          )}
        </section>
        <section>
          <h2>Education</h2>
          {profile.education && profile.education.length > 0 ? (
            profile.education.map((edu, index) => (
              <div key={index}>
                <p>{edu.institution || 'Institution: N/A'}</p>
                <p>{edu.degree || 'Degree: N/A'}</p>
                <p>{edu.duration || 'Duration: N/A'}</p>
              </div>
            ))
          ) : (
            <p>N/A</p>
          )}
        </section>
        <section>
          <h2>Awards</h2>
          {profile.awards && profile.awards.length > 0 ? (
            profile.awards.map((award, index) => (
              <div key={index}>
                <p>{award.title || 'Title: N/A'}</p>
                <p>{award.issuer || 'Issuer: N/A'}</p>
                <p>{award.date || 'Date: N/A'}</p>
                <p>{award.description || 'Description: N/A'}</p>
              </div>
            ))
          ) : (
            <p>N/A</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Portfolio;

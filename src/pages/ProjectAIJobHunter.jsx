import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProjectAIJobHunter = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-32 pb-20 bg-gray-950 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-8 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Portfolio
                </Link>

                <article className="prose prose-invert prose-indigo lg:prose-xl max-w-none">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 mb-8">
                        AI Job Hunter: AI-Powered Job Portal
                    </h1>

                    <img
                        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop"
                        alt="AI Job Hunter Dashboard"
                        className="w-full h-80 object-cover rounded-2xl mb-12 shadow-2xl shadow-indigo-500/10 border border-gray-800"
                    />

                    <div className="text-gray-300 leading-relaxed space-y-8">
                        <p className="text-xl text-gray-400 font-medium">
                            AI Job Hunter is a full-stack job portal and Applicant Tracking System built using the MERN stack. The system connects employers and job seekers, allowing employers to post jobs and track applicants, while job seekers can search and apply for jobs.
                        </p>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">Tech Stack & Architecture</h2>
                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-colors">
                                    <h3 className="text-indigo-400 font-bold text-lg mb-2">Frontend</h3>
                                    <p className="text-sm text-gray-400 mb-2">Built with React for a dynamic and responsive user interface.</p>
                                    <ul className="text-sm list-disc list-inside text-gray-300">
                                        <li>React.js</li>
                                        <li>Redux Toolkit for efficient state management</li>
                                        <li>Tailwind CSS for modern styling</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-colors">
                                    <h3 className="text-purple-400 font-bold text-lg mb-2">Backend & Database</h3>
                                    <p className="text-sm text-gray-400 mb-2">Node.js and Express powering a secure and scalable API.</p>
                                    <ul className="text-sm list-disc list-inside text-gray-300">
                                        <li>Node.js / Express.js REST API</li>
                                        <li>MongoDB with Mongoose schemas (optimized for semi-structured job data)</li>
                                        <li>Cloudinary for file storage (resumes, avatars)</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="mb-4">
                                The core entities in the system are <strong>User</strong>, <strong>Job</strong>, and <strong>Application</strong>. A user can either be an Employer or a Job Seeker. An employer can create multiple jobs, and each job can have multiple applications. A job seeker can apply to multiple jobs. These relationships are handled using MongoDB references and optimized queries.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">Authentication & Security</h2>
                            <p className="mb-4">
                                Authentication is implemented using JWT with both access and refresh tokens. The access token is short-lived for security, and the refresh token is long-lived to maintain sessions without forcing frequent logins.
                            </p>
                            <p className="mb-4">
                                Both tokens are stored in <strong>HTTP-only cookies</strong> to prevent XSS-based token theft. Middleware verifies the token on protected routes and enforces role-based access control, ensuring that only employers can post jobs and only job seekers can apply.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">AI-Powered Features</h2>
                            <p className="mb-4">
                                One of the key features of the system is AI-powered job description generation. When an employer provides a job title and required skills, the backend constructs a structured prompt and sends it to the <strong>OpenAI API</strong>. The response is returned as formatted HTML content.
                            </p>
                            <p className="mb-4">
                                Since external API responses should always be treated as untrusted input, I sanitize the generated HTML using <code>DOMPurify</code> and <code>jsdom</code> before storing it in the database to prevent XSS attacks. I also implemented a quota system to limit the number of AI generations per user, which can support monetization in the future.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">Advanced MongoDB Aggregation & Search</h2>
                            <p className="mb-4">
                                For job search, I built a dynamic MongoDB query builder that supports case-insensitive regex search on job titles, date-based filters such as last 24 hours or last week using <code>$gte</code> and <code>$lt</code> operators, and salary range filtering with proper overlap logic using <code>$or</code> conditions. This ensures that partially overlapping salary ranges are also included in the results.
                            </p>
                            <p className="mb-4">
                                To build the employer dashboard, I used <strong>MongoDB aggregation pipelines</strong>. I used <code>$match</code> to fetch jobs belonging to a specific employer, <code>$unwind</code> to process applicants individually, and <code>$project</code> to shape the response. To prevent potential N+1 query issues where applicant details are fetched inside a loop, I plan to refactor the aggregation using <code>$lookup</code> so that user details are fetched in a single database query.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">File Uploads & Scalability Planning</h2>
                            <p className="mb-6">
                                For file uploads such as resumes and profile pictures, I used <strong>Multer</strong> to handle multipart data and uploaded files to <strong>Cloudinary</strong> for storage and CDN delivery. File type validation and required field validation are implemented before upload to enhance security.
                            </p>

                            <div className="bg-gray-900/40 p-6 rounded-xl border border-gray-800">
                                <h3 className="text-cyan-400 font-bold text-lg mb-3">Future Scalability Improvements</h3>
                                <ul className="space-y-2 list-disc list-inside text-gray-300">
                                    <li>Introduce <strong>Redis caching</strong> for frequently searched jobs.</li>
                                    <li>Replace regex search with a dedicated search engine like <strong>Elasticsearch</strong>.</li>
                                    <li>Separate the AI service into a standalone <strong>microservice</strong>.</li>
                                    <li>Introduce proactive <strong>rate limiting and monitoring</strong>.</li>
                                </ul>
                            </div>
                        </section>

                        <div className="mt-12 bg-gray-900/40 border border-gray-800 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <h3 className="text-white font-semibold text-lg">Project Summary</h3>
                                <p className="text-gray-400 text-sm mt-1">
                                    Overall, the focus of this project was building a secure, scalable backend architecture with AI integration, proper authentication, efficient querying, and awareness of performance bottlenecks.
                                </p>
                            </div>
                        </div>

                    </div>


                    <div className="mt-8 bg-gray-900/40 border border-gray-800 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="text-white font-semibold text-lg">Project Source Code</h3>
                            <p className="text-gray-400 text-sm mt-1">
                                Check out the full implementation on GitHub.
                            </p>
                        </div>

                        <a
                            href="https://github.com/ashishadarsh1308/AI-Powered-Job-Porta"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-600/30 hover:-translate-y-1"
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.39c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.74-1.34-1.74-1.09-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.82 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.94 0-1.31.47-2.39 1.23-3.23-.12-.3-.53-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.61-2.8 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.58A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            View on GitHub
                        </a>
                    </div>

                </article>
            </div>
        </div>
    );
};

export default ProjectAIJobHunter;

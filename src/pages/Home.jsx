import Hero from '../components/Hero';
import Education from '../components/Education';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Skills from '../components/Skills';

const Home = () => {
    return (
        <main className="pt-20">
            <Hero />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Contact />
        </main>
    );
};

export default Home;

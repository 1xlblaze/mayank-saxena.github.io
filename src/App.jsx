import React from 'react';

export default function App() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="min-h-screen bg-gray-100 flex flex-col justify-center items-center text-center p-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Mayank Saxena</h1>
        <p className="text-lg md:text-2xl mb-6">Backend Engineer • Golang • Kubernetes • GCP • Kafka • PostgreSQL</p>
        <div className="space-x-4">
          <a href="#about" className="px-4 py-2 border rounded-full text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition">About Me</a>
          <a href="#contact" className="px-4 py-2 border rounded-full text-gray-600 border-gray-600 hover:bg-gray-600 hover:text-white transition">Contact</a>
          <a href="/MayankSaxena2025.pdf" download className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">Download Resume</a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p>
            I’m a Backend Engineer at IndiaMart, specializing in scalable microservices with Golang, PostgreSQL, and Kubernetes on GCP. I love optimizing performance, reducing infra cost, and scaling systems.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">Buylead Display Optimization</h3>
              <p>Reduced infra cost by ₹24.7 L/year using PostgreSQL pgx pooling & AMP integration.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">Kafka Migration</h3>
              <p>Replaced RabbitMQ with Kafka to handle high-throughput viewport logs efficiently.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">gRPC Integration</h3>
              <p>Migrated internal APIs to gRPC, improving service communication performance and speed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {["Golang", "Kubernetes", "PostgreSQL", "Kafka", "gRPC", "GCP", "Docker", "AMP", "pgx", "Python", "PHP"].map(skill => (
              <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{skill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Achievements</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Best Performer of the Year 2023, IndiaMart</li>
            <li>Reduced infrastructure costs by 35%</li>
            <li>Improved API response time by 44%</li>
            <li>Handled over 55 million hits/week for buyleads</li>
            <li>Increased AMP email click-through rate by 27%</li>
          </ul>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Contact</h2>
          <p>Email: <a href="mailto:mayankidmsaxena@gmail.com" className="text-blue-600 hover:underline">mayankidmsaxena@gmail.com</a></p>
          <div className="mt-4 space-x-4">
            <a href="https://github.com/mannusaxena" className="text-gray-800 hover:text-black">GitHub</a>
            <a href="https://linkedin.com/in/mayank-saxena" className="text-blue-700 hover:underline">LinkedIn</a>
          </div>
        </div>
      </section>

      <footer className="py-6 text-center bg-gray-900 text-white">
        <p className="text-sm">&copy; 2025 Mayank Saxena. All rights reserved.</p>
      </footer>
    </div>
  );
}
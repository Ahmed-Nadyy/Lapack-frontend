import React from 'react';
import { FaPhone, FaEnvelope, FaLinkedin, FaGithub,FaFacebook } from 'react-icons/fa';

export default function ContactUs() {
    const engineers = [
        {
            name: 'Ahmed Nady',
            phone: '+20 1023536355',
            email: 'dev.ahmed.nady@gmail.com',
            linkedin: 'https://linkedin.com/in/ahmed-nadyy',
            github: 'https://www.facebook.com/profile.php?id=100009827228094'
        },
        {
            name: 'Khier-Allah',
            phone: '+20 1061797272',
            email: 'dev.ahmed.nady@gmail.com',
            linkedin: 'https://linkedin.com/in/ahmed-nadyy',
            github: 'https://www.facebook.com/profile.php?id=100009827228094'
        }
    ];

    return (
        <div className="min-h-screen pt-32 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">Contact Us</h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Have questions about our laptops or need technical support? Our engineering team is here to help!
                </p>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {engineers.map((engineer, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-2xl font-semibold mb-4 text-gray-900">{engineer.name}</h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 text-gray-700">
                                    <FaPhone className="text-blue-600" />
                                    <a href={`tel:${engineer.phone}`} className="hover:text-blue-600 transition-colors">
                                        {engineer.phone}
                                    </a>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-700">
                                    <FaEnvelope className="text-blue-600" />
                                    <a href={`mailto:${engineer.email}`} className="hover:text-blue-600 transition-colors">
                                        {engineer.email}
                                    </a>
                                </div>
                                <div className="flex items-center space-x-4 mt-4">
                                    <a
                                        href={engineer.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-blue-600 transition-colors"
                                    >
                                        <FaLinkedin size={24} />
                                    </a>
                                    <a
                                        href={engineer.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                        <FaFacebook size={24} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Target, Lightbulb, Heart, Users } from 'lucide-react'

export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Intro Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Profile Image Placeholder */}
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-8 flex items-center justify-center shadow-lg">
                        <span className="text-5xl">👩‍⚕️</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        About Me
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        I'm a 2nd year Pharm D student passionate about healthcare education
                        and structured learning. My goal is to make complex pharmaceutical concepts
                        accessible and understandable for everyone.
                    </p>
                </motion.div>
            </section>

            {/* Education Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                        Education
                    </h2>

                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-l-4 border-blue-600">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <GraduationCap className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        Doctor of Pharmacy (Pharm D)
                                    </h3>
                                    <p className="text-lg text-gray-600 mb-1">[College Name], [City]</p>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                        <span>Year: 2nd Year</span>
                                        <span>•</span>
                                        <span>Expected Graduation: [Year]</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                Pursuing comprehensive pharmaceutical education with focus on clinical pharmacy,
                                pharmacology, medicinal chemistry, and patient care. Building a strong foundation
                                in both theoretical knowledge and practical application.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* What I'm Currently Working On */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                        What I'm Currently Working On
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {[
                            {
                                icon: <Target className="w-6 h-6" />,
                                title: "Building High-Quality Notes",
                                description: "Creating comprehensive, well-structured study materials that break down complex pharmaceutical concepts into digestible content.",
                                color: "blue"
                            },
                            {
                                icon: <Users className="w-6 h-6" />,
                                title: "Helping Juniors",
                                description: "Mentoring junior students, sharing study strategies, and providing guidance through challenging pharmacy coursework.",
                                color: "green"
                            },
                            {
                                icon: <Lightbulb className="w-6 h-6" />,
                                title: "Learning Pharmacology Deeply",
                                description: "Diving deep into drug mechanisms, interactions, and therapeutic applications to build a solid clinical foundation.",
                                color: "amber"
                            },
                            {
                                icon: <Heart className="w-6 h-6" />,
                                title: "Improving Study Systems",
                                description: "Developing efficient learning methods and organizational systems to maximize retention and understanding.",
                                color: "purple"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all"
                            >
                                <div className={`w-12 h-12 bg-${item.color}-100 rounded-full flex items-center justify-center mb-4 text-${item.color}-600`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* My Learning Philosophy */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
                        My Learning Philosophy
                    </h2>

                    <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 md:p-12 border border-blue-100">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                    Consistency Over Intensity
                                </h3>
                                <p className="text-gray-700 leading-relaxed ml-4">
                                    I believe in showing up every day, even if it's just for 30 minutes.
                                    Small, consistent efforts compound into deep understanding over time.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                                    Concept Clarity First
                                </h3>
                                <p className="text-gray-700 leading-relaxed ml-4">
                                    Memorization is temporary, but understanding is permanent. I focus on
                                    grasping the "why" behind every concept before moving to the "what."
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                    Real-World Application
                                </h3>
                                <p className="text-gray-700 leading-relaxed ml-4">
                                    Pharmacy isn't just about passing exams—it's about patient care.
                                    I always try to connect what I learn to real clinical scenarios and practical use cases.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}

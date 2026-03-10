import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProjectVisualCrypto = () => {
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
                    <div className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 mb-4">
                            Cryptographically Secure Digital Watermarking
                        </h1>
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold tracking-wide">
                            Sept 2024 – Oct 2024
                        </div>
                    </div>

                    <img
                        src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1200&auto=format&fit=crop"
                        alt="Cryptography and Security Visualization"
                        className="w-full h-80 object-cover rounded-2xl mb-12 shadow-2xl shadow-indigo-500/10 border border-gray-800"
                    />

                    <div className="text-gray-300 leading-relaxed space-y-8">

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">Abstract</h2>
                            <p className="mb-4">
                                The aim of this case study is to demonstrate a digital watermarking scheme using visual cryptography for copyright protection of a digital image. A binary image, called a watermark, is split into two shares via a 2-out-of-2 visual secret sharing scheme.
                            </p>
                            <p className="mb-4">
                                Then, one of the shares called the master share is extracted from the host image using a fixed pseudo-random points, and the other share also known as ownership share, made by relating the master share and the watermark, is held by the owner which is also given to an authorized 3rd party copyright verifier.
                            </p>
                            <p>
                                Based on the security property of visual cryptography, the two shares on their own cannot leak any information about the watermark. The experimental results show that even after the image was modified, the invisible watermark was successfully extracted from it.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">Introduction</h2>
                            <p className="mb-4">
                                Compared to the old days, it has become super easy to make your information accessible to anyone around the world. That also means that it’s trivial for someone to take your information, use it, and claim that it is his own.
                            </p>
                            <p className="mb-4">
                                For example, you may take a digital picture of a historical event that you may consider selling. Someone might modify the image a little bit, claim that it’s their original work, and essentially steal it. You can protect your image even if it’s in a digital format by embedding extra information into digitized data—that is what digital watermarking is essentially.
                            </p>
                            <p className="mb-4">
                                Visible digital watermarking is something that is visible on the content. Invisible watermarking on the other hand can get a lot more interesting because the soon-to-be-criminal does not know that there is extra information in the data they are trying to steal. Anything that one can "see" can be removed fairly easily—though it may require sophisticated software, it is definitely easier to remove something that one can see than removing something that one doesn’t know what to remove.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">Visual Cryptography</h2>
                            <p className="mb-4">
                                Visual Cryptography is a special encryption technique to hide information in images in such a way that it can be decrypted by the human vision if the correct key image is used. The technique was proposed by Naor and Shamir in 1994. Visual Cryptography uses two transparent images. One image contains random pixels and the other image contains the secret information.
                            </p>
                            <p className="mb-4">
                                It is impossible to retrieve the secret information from one of the images. Either transparent images or layers are required to reveal the information.
                            </p>

                            <div className="bg-gray-900/40 p-6 rounded-xl border border-gray-800 mb-6">
                                <h3 className="text-indigo-400 font-bold text-lg mb-3">Simple Algorithm for Visual Cryptography</h3>
                                <p className="text-sm text-gray-400 mb-3">There is a simple algorithm for visual cryptography that creates 2 encrypted images from an original unencrypted image:</p>
                                <ol className="list-decimal list-inside text-sm text-gray-300 space-y-2">
                                    <li>Create an image of random pixels the same size and shape as the original image: <code>Random1</code>.</li>
                                    <li>Create a second image whose pixels are the exclusive-or (XOR) of the first image and the original image: <code>Random2 = Random1 xor Original</code>. This image will "look random".</li>
                                    <li>The two apparently random images can now be combined with XOR to re-create the original image: <code>Random1 xor Random2 = Original</code>.</li>
                                </ol>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-2">Key Features & Implementations</h2>

                            <ul className="space-y-4 text-gray-300">
                                <li className="flex items-start">
                                    <span className="text-indigo-500 mr-3 mt-1.5 text-xl leading-none">▹</span>
                                    <span>Built a secure image watermarking system using HMAC-SHA256-based point generation and XOR embedding, ensuring watermark resilience against image tampering.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-indigo-500 mr-3 mt-1.5 text-xl leading-none">▹</span>
                                    <span>Designed and implemented master-owner share generation inspired by visual cryptography to prevent unauthorized extraction.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-indigo-500 mr-3 mt-1.5 text-xl leading-none">▹</span>
                                    <span>Achieved robust watermark recovery even after blur, noise, and brightness attacks, verified through morphological post-processing.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-indigo-500 mr-3 mt-1.5 text-xl leading-none">▹</span>
                                    <span>Used template matching for verification and alignment of regenerated watermarks.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-indigo-500 mr-3 mt-1.5 text-xl leading-none">▹</span>
                                    <span><strong className="text-white">Tech Stack:</strong> Python, SHA-256, Visual Cryptography</span>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">Results & Conclusion</h2>

                            <div className="overflow-x-auto mb-6">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-700">
                                            <th className="py-3 px-4 font-semibold text-gray-200 bg-gray-900/50">No.</th>
                                            <th className="py-3 px-4 font-semibold text-gray-200 bg-gray-900/50">Type Of Modification to Image</th>
                                            <th className="py-3 px-4 font-semibold text-gray-200 bg-gray-900/50">Accuracy of Extracted Watermark</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        <tr className="border-b border-gray-800/50">
                                            <td className="py-3 px-4 text-gray-400">1</td>
                                            <td className="py-3 px-4 text-gray-300">Minor Contrast Adjusted</td>
                                            <td className="py-3 px-4 text-indigo-400 font-medium">88.14 %</td>
                                        </tr>
                                        <tr className="border-b border-gray-800/50">
                                            <td className="py-3 px-4 text-gray-400">2</td>
                                            <td className="py-3 px-4 text-gray-300">Blurred Entire Image</td>
                                            <td className="py-3 px-4 text-indigo-400 font-medium">85.58 %</td>
                                        </tr>
                                        <tr className="border-b border-gray-800/50">
                                            <td className="py-3 px-4 text-gray-400">3</td>
                                            <td className="py-3 px-4 text-gray-300">Decreased Brightness</td>
                                            <td className="py-3 px-4 text-indigo-400 font-medium">77.41 %</td>
                                        </tr>
                                        <tr className="border-b border-gray-800/50">
                                            <td className="py-3 px-4 text-gray-400">4</td>
                                            <td className="py-3 px-4 text-gray-300">Salt Pepper Noise Added</td>
                                            <td className="py-3 px-4 text-indigo-400 font-medium">87.06 %</td>
                                        </tr>
                                        <tr className="border-b border-gray-800/50">
                                            <td className="py-3 px-4 text-gray-400">5</td>
                                            <td className="py-3 px-4 text-gray-300">Fake Visible Watermark Added</td>
                                            <td className="py-3 px-4 text-indigo-400 font-medium">88.07 %</td>
                                        </tr>
                                        <tr className="border-b border-gray-800/50">
                                            <td className="py-3 px-4 text-gray-400">6</td>
                                            <td className="py-3 px-4 text-gray-300">Distorted Entire Image</td>
                                            <td className="py-3 px-4 text-indigo-400 font-medium">86.32 %</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <div className="mt-8 bg-gray-900/40 border border-gray-800 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <h3 className="text-white font-semibold text-lg">Project Source Code</h3>
                                <p className="text-gray-400 text-sm mt-1">
                                    Check out the full implementation on GitHub.
                                </p>
                            </div>

                            <a
                                href="https://github.com/ashishadarsh1308/crypti-watermarking-web"
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

                    </div>
                </article>
            </div>
        </div>
    );
};

export default ProjectVisualCrypto;

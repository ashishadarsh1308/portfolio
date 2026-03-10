import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Project5G = () => {
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
                        5G-NSID: A Labeled Cyberattack Dataset for 5G Network Slicing
                    </h1>

                    <img
                        src="https://telecom.dingli.com/wp-content/uploads/2024/05/5G-Networks-1.jpg?q=80&w=1200&auto=format&fit=crop"
                        alt="5G Network Slicing Visualization"
                        className="w-full h-80 object-cover rounded-2xl mb-12 shadow-2xl shadow-indigo-500/10 border border-gray-800"
                    />

                    <div className="text-gray-300 leading-relaxed space-y-8">
                        <p className="text-xl text-gray-400 font-medium">
                            In 5G, one physical infrastructure is logically divided into multiple virtual networks, called network slices. Each slice is optimized for a specific use case.
                        </p>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">5G Testbed Architecture</h2>
                            <p className="mb-4">
                                I configured multiple slices using S-NSSAI in the AMF and UE configuration files. During registration, the UE requests a specific slice, the AMF validates it, and the SMF establishes a PDU session via the UPF.
                            </p>

                            <div className="space-y-4">
                                <div className="flex flex-col md:flex-row gap-4 border border-gray-800 p-4 rounded-xl bg-gray-900/30">
                                    <div className="md:w-1/3 text-lg font-semibold text-indigo-300">Core - Free5GC</div>
                                    <div className="md:w-2/3">
                                        <p>Implements 5G Core functions:</p>
                                        <ul className="list-disc list-inside mt-2 ml-2 space-y-1">
                                            <li><strong>AMF</strong> - Registration & mobility</li>
                                            <li><strong>SMF</strong> - Session management</li>
                                            <li><strong>UPF</strong> - User data forwarding</li>
                                            <li><strong>NRF, UDM, AUSF</strong> - Service registration & authentication</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row gap-4 border border-gray-800 p-4 rounded-xl bg-gray-900/30">
                                    <div className="md:w-1/3 text-lg font-semibold text-purple-300">gNB - UERANSIM</div>
                                    <div className="md:w-2/3">
                                        <p>Simulates 5G base station. Connects UE to Core using N2 (control plane) and N3 (user plane).</p>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row gap-4 border border-gray-800 p-4 rounded-xl bg-gray-900/30">
                                    <div className="md:w-1/3 text-lg font-semibold text-cyan-300">UE - UERANSIM</div>
                                    <div className="md:w-2/3">
                                        <p>Simulated user device. Requests specific slice (S-NSSAI) and establishes PDU session.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">
                                4G vs 5G Network Architecture
                            </h2>

                            <p className="mb-6 text-gray-300">
                                To understand the motivation behind 5G network slicing and the need for advanced intrusion detection,
                                it is important to briefly compare the architecture of 4G LTE and 5G networks.
                            </p>

                            {/* 4G ARCHITECTURE */}
                            <div className="mb-10">
                                <h3 className="text-xl font-semibold text-indigo-400 mb-3">4G LTE Architecture</h3>

                                {/* IMAGE SPACE */}
                                <div className="w-full h-72 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center text-gray-500 mb-6">
                                    <img src="https://www.digi.com/getattachment/Blog/post/5G-Network-Architecture/5g-architechure-1280x460.jpg?lang=en-US" alt="" />
                                </div>

                                <p className="text-gray-300">
                                    In a 4G LTE network, User Equipment (UE) such as smartphones connect to the LTE Radio Access
                                    Network called <strong>E-UTRAN</strong>. The Evolved NodeB (<strong>eNodeB</strong>) acts as the base station
                                    and separates the <strong>control plane</strong> (network management traffic) from the
                                    <strong> user plane</strong> (user data traffic). Both are forwarded to the
                                    <strong> Evolved Packet Core (EPC)</strong>, which connects the mobile network to external
                                    data networks such as the Internet.
                                </p>
                            </div>

                            {/* 5G ARCHITECTURE */}
                            <div className="mb-10">
                                <h3 className="text-xl font-semibold text-purple-400 mb-3">5G Service-Based Architecture (SBA)</h3>

                                {/* IMAGE SPACE */}
                                <img src="https://www.digi.com/getattachment/Blog/post/5G-Network-Architecture/EPC-architechure3v2-1280.jpg?lang=en-US" alt="" />


                                <p className="text-gray-300">
                                    Unlike 4G, the 5G core is designed using a <strong>Service-Based Architecture (SBA)</strong>
                                    where network functions operate as independent services. User Equipment (UE) connects
                                    through the <strong>5G New Radio (NR)</strong> access network to the 5G core. The
                                    <strong> Access and Mobility Management Function (AMF)</strong> acts as the entry point
                                    for device registration and mobility management.
                                </p>

                                <p className="text-gray-300 mt-3">
                                    The <strong>Session Management Function (SMF)</strong> manages user sessions,
                                    while the <strong>User Plane Function (UPF)</strong> handles user data traffic between
                                    the device and external networks. Authentication is handled by the
                                    <strong> Authentication Server Function (AUSF)</strong>, and subscriber data is stored
                                    in the <strong>Unified Data Management (UDM)</strong>.
                                </p>
                            </div>

                            {/* KEY DIFFERENCE */}
                            <div>
                                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Key Architectural Differences</h3>

                                {/* IMAGE SPACE */}
                                <img
                                    className="w-full h-72 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center text-gray-500 mb-6"
                                    src="https://www.digi.com/getattachment/Blog/post/5G-Network-Architecture/4g-5g-Korea-cropped.jpg?lang=en-US" alt=""
                                />


                                <p className="text-gray-300">
                                    In 4G networks, the EPC is mostly centralized and tightly coupled, which makes
                                    achieving ultra-low latency and high flexibility difficult. In contrast, 5G
                                    breaks the monolithic core into modular network functions that can run on
                                    cloud infrastructure and edge servers.
                                </p>

                                <p className="text-gray-300 mt-3">
                                    This modular design enables <strong>network slicing</strong>, where multiple logical
                                    networks optimized for different use cases (high bandwidth, ultra-low latency,
                                    or massive IoT connectivity) can operate on the same physical infrastructure.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">Types of Slices</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-colors">
                                    <h3 className="text-indigo-400 font-bold text-lg mb-2">1. eMBB</h3>
                                    <p className="text-sm text-gray-400">Enhanced Mobile Broadband</p>
                                    <ul className="mt-3 text-sm list-disc list-inside text-gray-300">
                                        <li>High bandwidth</li>
                                        <li>Video streaming, AR/VR, HD content</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-purple-500/50 transition-colors">
                                    <h3 className="text-purple-400 font-bold text-lg mb-2">2. URLLC</h3>
                                    <p className="text-sm text-gray-400">Ultra-Reliable Low Latency Communication</p>
                                    <ul className="mt-3 text-sm list-disc list-inside text-gray-300">
                                        <li>Very low latency (&lt;1 ms target)</li>
                                        <li>Extremely reliable</li>
                                        <li>Autonomous vehicles, remote surgery, industrial automation</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-cyan-500/50 transition-colors">
                                    <h3 className="text-cyan-400 font-bold text-lg mb-2">3. mMTC</h3>
                                    <p className="text-sm text-gray-400">Massive Machine Type Communication</p>
                                    <ul className="mt-3 text-sm list-disc list-inside text-gray-300">
                                        <li>Supports millions of IoT devices</li>
                                        <li>Low power consumption</li>
                                        <li>Smart cities, sensor networks</li>
                                    </ul>
                                </div>


                            </div>
                            <p className="mt-8 mb-6 text-gray-300 leading-relaxed">
                                Network slicing is one of the key innovations of 5G architecture. It allows a single
                                physical 5G infrastructure to be logically divided into multiple virtual networks,
                                called slices. Each slice is optimized for a specific use case such as high bandwidth
                                applications (eMBB), ultra-low latency communication (URLLC), or massive IoT
                                connectivity (mMTC). This virtualization enables network operators to allocate
                                resources dynamically and provide tailored services for different application
                                requirements while running on the same physical network.
                            </p>

                            <img
                                className="w-full h-72 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center text-gray-500 mb-6"
                                src="https://www.digi.com/getattachment/Blog/post/5G-Network-Architecture/network-slicing-1280x816.jpg?lang=en-US" alt=""
                            />
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">Rule-Based Detection & Attack Generation</h2>
                            <p className="mb-4">
                                After setting up the 5G testbed, the task was to generate normal and malicious traffic. I implemented a rule-based IDS trigger mechanism before moving to machine learning.
                            </p>
                            <p className="mb-4">
                                For the rule-based detection, I used a <strong>k-out-of-n logic model</strong>. In this approach, I continuously monitored multiple system and network-level parameters such as CPU utilization, memory utilization, packet size variance, SYN packet count, fixed TTL patterns, and abnormal probing behavior like scanning all ports. The idea behind k-out-of-n logic is that if <em>k</em> parameters out of <em>n</em> monitored metrics cross predefined thresholds, the system flags it as suspicious. This reduces false positives compared to single-metric detection because an alert is generated only when multiple anomalies occur simultaneously.
                            </p>
                            <p className="mb-4">
                                To generate attack traffic, I performed different types of attacks. For port scanning, I used Nmap and conducted SYN scans, FIN scans, and version detection scans. For Denial-of-Service attacks, I simulated both network-layer and application-layer attacks. At the network layer, I performed SYN flood, UDP flood, and Ping of Death attacks. At the application layer, I simulated HTTP flood and Apache Killer attacks. Along with these attacks, normal benign traffic was also generated to make the dataset realistic.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">Data Collection & Feature Engineering</h2>
                            <p className="mb-4">
                                Once the traffic was generated, I captured PCAP files using tcpdump. These PCAP files were then converted into bidirectional flow-based CSV format using CICFlowMeter. After conversion, I obtained 84+ statistical flow features such as flow duration, packet length statistics, forward and backward packet counts, inter-arrival time metrics, and other behavioral features. The dataset contained more than 10 lakh instances and included both attack and benign traffic across slices.
                            </p>
                            <p className="mb-4">
                                Since the dataset was imbalanced, preprocessing was necessary. First, I performed data cleaning, removed null values, and handled infinite values that occurred during flow extraction. Then I removed features with constant or near-zero variance because such features do not contribute to model learning and only increase dimensionality. Reducing irrelevant features improves model efficiency and prevents overfitting.
                            </p>
                            <p className="mb-4">
                                After that, I applied hybrid feature selection. For identifying linear relationships between features and the output class, I used the ANOVA F-test. For detecting non-linear dependencies, I used Mutual Information. Combining both methods allowed me to capture both linear and non-linear relevance of features with respect to attack classification. The output scores from both selection techniques were normalized because the scales of ANOVA F-values and Mutual Information scores are different. Normalization ensures fair comparison and prevents one method from dominating the selection due to scale differences.
                            </p>
                            <p>
                                From the ranked feature list, I selected the top 20 features for model training. I chose 20 because it provides a balance between dimensionality reduction and information retention. Using too many features increases model complexity and training time, while too few may cause loss of important discriminatory information. Empirically, top 20 features maintained high accuracy while improving computational efficiency.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-800 pb-2">Machine Learning & Evaluation</h2>
                            <p className="mb-4">
                                Since the dataset was imbalanced – for example, UDP flood traffic was much more frequent due to its connectionless nature – I applied SMOTE (Synthetic Minority Over-sampling Technique). SMOTE generates synthetic samples for minority classes by interpolating between existing minority samples. This prevents the model from being biased toward majority classes and improves recall for rare attacks.
                            </p>
                            <p className="mb-4">
                                After balancing the dataset, I applied k-fold cross-validation to ensure the model generalizes well and does not overfit. This allowed evaluation across multiple splits of the dataset rather than relying on a single train-test split.
                            </p>
                            <p className="mb-4">
                                Next, I performed hyperparameter tuning using Optuna to improve model performance. Finally, I trained ensemble learning models including Random Forest, XGBoost, and LightGBM, along with a baseline Decision Tree model (and GBM) for comparison. Ensemble methods were chosen because they reduce variance, improve robustness, and generally perform better on complex intrusion detection datasets.
                            </p>
                            <div className="bg-indigo-900/20 shadow-lg border border-indigo-500/30 p-6 rounded-2xl mt-8">
                                <h3 className="text-indigo-400 font-bold text-xl mb-2 flex items-center">
                                    <svg className="w-6 h-6 mr-2 filter drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                    Final Results
                                </h3>
                                <p className="text-gray-300">
                                    The final models achieved up to <strong>98% classification accuracy</strong>. Model generalization was validated on external datasets, sustaining a remarkable <strong>96% cross-dataset accuracy</strong>. This demonstrates that the feature engineering, balancing, and selection strategies were highly effective.
                                </p>
                            </div>
                        </section>

                    </div>
                    <div className="mt-8 bg-gray-900/40 border border-gray-800 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">

                        <div>
                            <h3 className="text-white font-semibold text-lg">Project Repository</h3>
                            <p className="text-gray-400 text-sm mt-1">
                                The full implementation including dataset processing, feature engineering,
                                and machine learning models is available on GitHub.
                            </p>
                        </div>

                        <a
                            href="https://github.com/ashishadarsh1308/5g-NIDD-network-slice"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-600/30 hover:-translate-y-1"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
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

export default Project5G;

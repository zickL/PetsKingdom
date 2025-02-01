import React from "react";
import "../styles/privacy.css";

const Privacy = () => {
  return (
    <main className="privacy-policy">
      <h1>Privacy Policy</h1>
      <p><strong>Effective Date:</strong> Today</p>

      <section>
        <h2>Introduction</h2>
        <p>
          Welcome to MyApp. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at Email.
        </p>
      </section>

      <section>
        <h2>Information We Collect</h2>
        <p>We collect personal information that you voluntarily provide to us when:</p>
        <ul>
          <li>Registering at the website</li>
          <li>Expressing an interest in obtaining information about us or our products and services</li>
          <li>Participating in activities on the website</li>
          <li>Otherwise contacting us</li>
        </ul>
        <p><strong>Personal Information Provided by You:</strong> Name, email address, contact information.</p>
        <p><strong>Information Automatically Collected:</strong> IP address, browser type, operating system, referring URLs, device information.</p>
      </section>

      <section>
        <h2>How We Use Your Information</h2>
        <p>We use personal information collected via our website for a variety of business purposes described below:</p>
        <ul>
          <li>To provide and manage our services.</li>
          <li>To send administrative information to you.</li>
          <li>To fulfill and manage your orders.</li>
          <li>To post testimonials with your consent.</li>
          <li>To deliver targeted advertising.</li>
        </ul>
      </section>

      <section>
        <h2>Sharing Your Information</h2>
        <p>We may process or share data based on the following legal basis:</p>
        <ul>
          <li><strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information in a specific purpose.</li>
          <li><strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
          <li><strong>Performance of a Contract:</strong> Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
        </ul>
      </section>

      <section>
        <h2>Data Retention</h2>
        <p>
          We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice unless a longer retention period is required or permitted by law.
        </p>
      </section>

      <section>
        <h2>Security of Your Information</h2>
        <p>
          We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
        </p>
      </section>

      <section>
        <h2>Your Privacy Rights</h2>
        <p>
          Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.
        </p>
      </section>

      <section>
        <h2>Updates to This Policy</h2>
        <p>
          We may update this privacy notice from time to time in order to reflect changes to our practices or for other operational, legal, or regulatory reasons.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          If you have questions or comments about this policy, you may email us at zekunli96@gmail.com or by post to:
        </p>
        <address>
          MyApp by Zekun <br />
          Northeastern University <br />
          San Jose <br />
          California
        </address>
      </section>
    </main>
  );
};

export default Privacy;

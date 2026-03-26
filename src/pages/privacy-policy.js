import React from "react";
import Layout from "@/components/Layout/Layout";
import { Container, Row, Col } from "react-bootstrap";

const PrivacyPolicy = () => {
  return (
    <Layout pageTitle="Privacy Policy | meksova">
      <Container className="py-5 mb-5">
        <Row>
          <Col>
            <h1 className="mb-4">Privacy Policy for meksova</h1>
            <p className="lead">
              <strong>Effective Date: 01/01/2025</strong>
            </p>
            <p>
              At meksova, we are committed to protecting and respecting
              your privacy. This Privacy Policy explains how we collect, use,
              store, and protect your personal and financial information when
              you use our website and services (&quot;the Service&quot;). By
              using meksova, you agree to the practices described in
              this Privacy Policy.
            </p>

            <h2 className="mt-5 mb-3">1. Information We Collect</h2>
            <p>We collect two types of information:</p>
            <ul>
              <li>
                <strong>Personal Information:</strong> Information that can be
                used to identify you personally, such as your name, email
                address, phone number, and billing information.
              </li>
              <li>
                <strong>Transactional and Financial Data:</strong> Information
                related to your use of the Service, including transaction
                records, receipts, account balances, income, expenses, and other
                financial information you input into the system.
              </li>
            </ul>

            <h2 className="mt-5 mb-3">2. How We Use Your Information</h2>
            <p>
              meksova uses the information we collect in the following
              ways:
            </p>
            <ul>
              <li>
                <strong>To Provide the Service:</strong> To process and record
                your transactions, generate financial reports, and offer
                summaries of your financial data.
              </li>
              <li>
                <strong>To Improve the Service:</strong> To analyze usage
                patterns and improve the functionality and user experience of
                the Service.
              </li>
              <li>
                <strong>To Communicate with You:</strong> To send important
                updates, account notifications, and customer support messages
                related to the Service.
              </li>
              <li>
                <strong>To Comply with Legal Obligations:</strong> To comply
                with applicable laws, regulations, and legal processes.
              </li>
            </ul>

            <h2 className="mt-5 mb-3">3. Data Security</h2>
            <p>
              We implement reasonable administrative, technical, and physical
              measures to protect your personal and financial data. However, no
              system can guarantee 100% security. While we strive to protect
              your information, we cannot guarantee the absolute security of
              data transmitted to or from the Service.
            </p>

            <h2 className="mt-5 mb-3">4. Data Retention</h2>
            <p>
              We retain your data for as long as necessary to provide the
              Service and fulfill our legal obligations. After account
              termination, we retain data only as required by law or for
              resolving disputes and enforcing agreements.
            </p>

            <h2 className="mt-5 mb-3">5. Sharing Your Information</h2>
            <p>
              We do not sell, rent, or trade your information to third parties.
              We may share your information with:
            </p>
            <ul>
              <li>
                <strong>Service Providers:</strong> Third-party providers
                assisting in operating the Service.
              </li>
              <li>
                <strong>Legal Compliance:</strong> When required by law or in
                response to legal requests.
              </li>
            </ul>

            <h2 className="mt-5 mb-3">6. User Responsibility for Data</h2>
            <p>
              You are responsible for the accuracy and completeness of the
              information you enter into the system. meksova is not
              responsible for inaccuracies in user-input data.
            </p>

            <h2 className="mt-5 mb-3">7. Cookies and Tracking Technologies</h2>
            <p>
              We may use cookies and similar technologies to enhance your
              experience with the Service. You can manage cookie preferences
              through your browser settings.
            </p>

            <h2 className="mt-5 mb-3">8. Your Rights and Choices</h2>
            <p>
              You have the right to access, update, or delete your personal
              information. Contact us to review or change your information. You
              can opt out of promotional emails using the unsubscribe
              instructions in those emails.
            </p>

            <h2 className="mt-5 mb-3">9. Children&apos;s Privacy</h2>
            <p>
              meksova is not intended for children under 13. We do not
              knowingly collect personal information from children under 13.
            </p>

            <h2 className="mt-5 mb-3">10. Third-Party Links</h2>
            <p>
              The Service may contain links to third-party websites. We are not
              responsible for the privacy practices or content of these sites.
            </p>

            <h2 className="mt-5 mb-3">11. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy at any time. Changes are
              effective immediately upon posting. We will notify you of
              significant changes by email or through a notice on our platform.
            </p>

            <h2 className="mt-5 mb-3">12. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy,
              please contact us at:
            </p>
            <p>
              meksova
              <br />
              Email: info@meksova.com
              <br />
              Website: meksova.com
            </p>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default PrivacyPolicy;

import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const LegalDocument = ({ namespace }) => {
  const { t } = useTranslation();
  const base = `legal.${namespace}`;
  const sections = t(`${base}.sections`, { returnObjects: true });

  return (
    <Container className="py-5 mb-5">
      <Row>
        <Col>
          <h1 className="mb-4">{t(`${base}.title`)}</h1>
          <p className="lead">
            <strong>{t(`${base}.effectiveDate`)}</strong>
          </p>
          <p>{t(`${base}.intro`)}</p>

          {Array.isArray(sections) &&
            sections.map((section, index) => (
              <div key={index}>
                <h2 className="mt-5 mb-3">{section.title}</h2>
                {section.paragraphs?.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item, lIndex) => (
                      <li key={lIndex}>
                        <strong>{item.label}</strong> {item.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

          <p className="mt-4" style={{ whiteSpace: "pre-line" }}>
            {t(`${base}.contactBlock`)}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default LegalDocument;

import React from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const ContactForm = ({
  inputs = [],
  formClassName = "contact-page__form-element",
  inputClassName = "contact-page__input-box",
  messageClassName = "contact-page__message-box",
  btnBoxClassName = "contact-page__btn-box",
  btnClassName = "contact-page__btn",
  btnText = "SEND A MESSAGE",
}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${formClassName} contact-form-validated`}
    >
      <Row>
        {inputs.map(({ name, placeholder, type, required }) => (
          <Col key={name} xl={6}>
            <div className={inputClassName}>
              <label htmlFor={name} className="contact-page__label">
                {placeholder}
              </label>
              <input
                type={type}
                placeholder={placeholder}
                name={name}
                id={name}
                {...register(name, { required })}
              />
              {required && errors[name] && (
                <label htmlFor={name} className="error">
                  {t("common.formRequired")}
                </label>
              )}
            </div>
          </Col>
        ))}
      </Row>
      <Row>
        <Col xl={12}>
          <div className={`${inputClassName} ${messageClassName}`}>
            <label htmlFor="message" className="contact-page__label">
              {t("contact.form.fields.message")}
            </label>
            <textarea
              name="message"
              id="message"
              placeholder={t("contact.form.fields.messagePlaceholder")}
              {...register("message")}
            ></textarea>
          </div>
          <div className={btnBoxClassName}>
            <button type="submit" className={btnClassName}>
              {btnText}
            </button>
          </div>
        </Col>
      </Row>
    </form>
  );
};

export default ContactForm;

import React from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

const ContactForm = ({
  inputs = [],
  formClassName = "contact-page__form-element",
  inputClassName = "contact-page__input-box",
  messageClassName = "contact-page__message-box",
  btnBoxClassName = "contact-page__btn-box",
  btnClassName = "contact-page__btn",
  btnText = "SEND A MESSAGE",
}) => {
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
                  This field is required.
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
              Write a Message
            </label>
            <textarea
              name="message"
              id="message"
              placeholder="How can we help your business?"
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

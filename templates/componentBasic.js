import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TemplateContainer = styled.div``;

const Template = ({ className }) => (
  <TemplateContainer className={className}>
    Template
  </TemplateContainer>
);

Template.propTypes = {
  className: PropTypes.string,
};
Template.defaultProps = {
  className: '',
};

export default Template;

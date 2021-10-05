import React from 'react';
import styled from 'styled-components';
import { useTemplate } from 'redux/hooks';

const TemplateContainer = styled.div``;

const Template = () => {
  const { sampleValue } = useTemplate();

  return (
    <TemplateContainer>
      Template Component {sampleValue}
    </TemplateContainer>
  );
};

export default Template;

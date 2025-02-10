import styled from 'styled-components';

export const FormsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* border: 1px solid #ccc; */
  border-radius: 8px;
  padding: 16px;
  /* background-color: #f9f9f9; */
`;

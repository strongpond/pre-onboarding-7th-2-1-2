import styled from "styled-components";

const SegmentType = ({ name }) => {
  return <SegmentTypeItem>{name}</SegmentTypeItem>;
};

export default SegmentType;

const SegmentTypeItem = styled.button`
  margin-left: 8px;
  padding: 5px 18px;
  font-size: ${({ theme }) => theme.fontSizes.subtitle};
  font-weight: 700;
  border-radius: 62px;
  border: none;
  background-color: ${({ theme }) => theme.colors.grey};
`;

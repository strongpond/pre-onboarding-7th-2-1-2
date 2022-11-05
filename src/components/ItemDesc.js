import styled from "styled-components";

const ItemDesc = ({ lists }) => {
  return (
    <>
      {lists.map(e => {
        return (
          <DescWrapper>
            <DescTitle>{e}</DescTitle>
            <DescValue>a</DescValue>
          </DescWrapper>
        );
      })}
    </>
  );
};

export default ItemDesc;

const DescWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 390px;
  padding: 13px 20px;
`;

const DescTitle = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: 700;
`;
const DescValue = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: 400;
`;

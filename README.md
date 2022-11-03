# Week 2-1. 카 렌탈 서비스

중간에 레포가 삭제되어 히스토리가 없어진 점 양해 부탁드립니다.
<br />
히스토리는 https://github.com/Topbin2/3rd_assignment 이곳에서 확인할 수 있습니다.

1. [팀 소개 👫](#1-팀-소개-)
2. [프로젝트 소개 🚀](#2-프로젝트-소개-)
3. [기술 스택 🛠](#3-기술-스택-)
4. [구현 기능 📍](#4-구현-기능-)
5. [프로젝트 구조 🗂](#5-프로젝트-구조-)
6. [Best Practice 선정과정👩‍👦‍👦](#6-best-practice-선정과정)
7. [프로젝트 설치 및 실행 ✨](#7-프로젝트-설치-및-실행-)  

<br/>

- [🌍 배포 링크](https://3rd-assignment.vercel.app/)
- [📄 팀 노션](https://plain-airboat-3f4.notion.site/10-27-Todo-f9fb2a1265e54c33b0b73c306c230042)

<br />



## 1. 팀 소개 👫

- [이빛나 (팀장)](https://github.com/bitnaleeeee)
- [모상빈](https://github.com/Topbin2)
- [김진석](https://github.com/genuine-seok)
- [박우빈](https://github.com/Debonchocola)
- [이의연](https://github.com/strongpond)
- [조성호](https://github.com/CSH111)
- [전대원](https://github.com/eodnjs467)

<br />

## 2. 프로젝트 소개 🚀

- 개요 : 원티드 프론트엔드 프리온보딩 7기 2팀 과제 2-1 중 Best Practice
- 주제 : B2C 차량대여 서비스
- 기간 : 2022.11.01 ~ 2022.11.03

<br />


## 3. 기술 스택 🛠

- React
- Typescript
- React-Query
- Styled-Components

<br />

## 4. 구현 기능 📍

- 차량 리스트
    - 차량이 없을 때 처리
    - 차량 불러오는 중 처리
- 차량 상세
- SEO
    - 카카오톡, 페이스북에 공유 시 미리보기

<br />

## 5. 프로젝트 구조 🗂

```bash
src
├── apis  // issue 관련 api service 요청
├── assets  // 전역 스타일링
├── components  // 공용 컴포넌트
├── hooks // scroll 관련 커스텀 훅
├── pages // 페이지 및 페이지 고유 컴포넌트
├── types // 공용타입 관리
└── utils // dateformatting, axios 관련 유틸 함수
```

<br/>


## 6. Best Practice 선정과정👩‍👦‍👦

### 1. Design token 과 theme (모상빈님)

: 스타일 요소를 전역에 걸쳐 반복 사용하는 것을 고려해 `theme`을 이용해 컴포넌트의 스타일링을
진행한 점과 `theme` 요소값을 토큰으로 관리하는 패턴이 매우 효율적이라고 생각합니다

```javascript
import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    white: "#ffffff",
    black: "#000000",
    gray: "#D9D9D9",
    blue: "#0094FF",
  },
  fontSize: {
    small: "12px",
    medium: "14px",
    large: "17px",
    xLarge: "21px",
  },
};

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 20px;
  ${({ theme }) => css`
    color: ${theme.colors.white};
    background-color: ${theme.colors.blue};
    font-size: ${theme.fontSize.large};
    font-weight: 700;
  `}
`;
```

### 2. 유틸 함수를 이용한 상수값 관리 (모상빈님)

: 일반적인 객체나 배열을 이용하지 않고, 예외 처리 및 타입 추정이 가능한
유틸 함수로 상수값을 관리하는 패턴이 매우 효율적이라고 생각합니다.

```javascript
export const converSegmentToCategory = (segment: TSegment) => {
  switch (segment) {
    case "C":
      return "소형";
    case "D":
      return "중형";
    case "E":
      return "대형";
    case "SUV":
      return "SUV";
    default:
      throw new Error("segment 타입을 확인해주세요.");
  }
};

// ...
```

### 3. 비동기 통신 로직 최적화 (모상빈님)

: 쿼리키 값, 쿼리 함수에 대한 파라미터를 커스텀 훅으로 설정할 수 있게 분리하고,
해당 페이지의 사용 맥락에 맞게 `staleTime` 옵션등을 활용해 사용성을 개선한 점이
인상적입니다.

```javascript
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getCarDetail } from "../apis";

export const useGetCarDetail = () => {
  const [searchParams] = useSearchParams();
  const brand = searchParams.get("brand") || "";
  const name = searchParams.get("name") || "";
  const segment = searchParams.get("segment") || "";
  const fuelType = searchParams.get("fuelType") || "";

  const { data, isLoading } = useQuery({
    queryKey: ["car-detail", brand, name, segment, fuelType],
    queryFn: () => getCarDetail({ brand, name, segment, fuelType }),
    onError: (error) => alert(error),
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000 * 5, // 5 minutes
  });

  return { data, isLoading };
};
```

### 4. 라우터 경로 관리 패턴 (전대원님)

: 전체 경로에 대한 관리를 ROUTER 객체를 이용해 변수 관리하는 점이 효율적이라고 생각합니다

```javascript
import { ROUTER } from "./routes";
import CarList from "../pages/CarList";
import CarDetail from "../pages/CarDetail";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
function RootRouter() {
  const ListRoutes = [
    {
      path: ROUTER.CAR_INFO,
      component: <CarList />,
    },
    {
      path: ROUTER.CAR_DETAIL,
      component: <CarDetail />,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CarList />} />
        {ListRoutes.map((page, index) => {
          return (
            <Route
              key={"route" + index}
              path={page.path}
              element={page.component}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default RootRouter;
```
### 5. 카카오톡, 페이스북 공유 시 미리보기 (모상빈님)

: `index.html` `meta` 태그를 활용

```html
  <meta name="title" property="og:title" content="현대 아이오닉5" />
  <meta name="description" property="og:description" content="월 600,000원" />
  <meta name="image" property="og:image" content="https://interview.platdev.net/ioniq5.png" />
```

<br>

## 7. 프로젝트 설치 및 실행 ✨

<br/>

1. Git Clone

```plaintext
$ git clone git@github.com:pre-onboading-2team/pre-onboarding-7th-2-1-2.git
```

2. 프로젝트 패키지 설치

```plaintext
$ npm install
```

3. 프로젝트 실행

```plaintext
$ npm start
```


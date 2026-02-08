# 프로젝트 컨텍스트: Gatsby v5 기술 블로그

## 1. 기술 스택
- **Framework:** Gatsby v5 (Partial Hydration 사용 여부 기술)
- **Styling:** Tailwind CSS 4.0
- **Content:** MDX
- **Deployment:** GitHub Pages

## 2. 주요 구조 및 규칙
- **컴포넌트:** `src/components`에 위치, 함수형 컴포넌트 사용.
- **포스트 경로:** `content/blog/{slug}/index.mdx`
- **이미지 처리:** `gatsby-plugin-image` 필수 사용.
- **코드 하이라이팅:** (예: PrismJS / Rehype-pretty-code)

## 3. SEO 및 메타데이터
- `src/components/seo.js` 컴포넌트를 통해 관리.
- 포스트 작성 시 `title`, `description`, `date`, `category` 필드 필수.

## 4. 유지보수 가이드라인
- 새로운 기능 추가 시 `src/hooks`에 커스텀 훅 분리 권장.
- GraphQL 쿼리는 가급적 컴포넌트 레벨에서 `useStaticQuery` 활용.

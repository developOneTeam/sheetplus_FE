# SCHU Sheet+ Frontend Repository

이 프로젝트는 `제1회 SW융합대학 학술제` 산하 '내가 만든 학술제' 출석체크 앱 부문에 출품하였던 프로젝트 SCHU Sheet+의 프론트엔드 저장소입니다.

> 이메일 템플릿은 별도의 저장소에서 [react-email](https://react.email) 기본 제공 템플릿을 이용해 작성 및 변환하였으나, 별도로 공개하지 않으며 백엔드 저장소에 완성된 형태로 같이 배포되어 있습니다.

## 사용한 라이브러리

> Motion은 Framer Motion으로 개발하였으며, 이후 프로젝트명이 변경되었습니다. 11월 내 마이그레이션을 마칠 예정입니다.

- **Framework** [Next.js](https://nextjs.org) MIT License
- **Chart / Date and Time Picker** [Toast UI](https://ui.toast.com) MIT License
- **Styling on SSR** [Vanilla Extract](https://vanilla-extract.style) MIT License
- **Animation** [Motion](https://motion.dev) MIT License
- **PWA Support** [Serwist](https://serwist.pages.dev) MIT License
- **QR Code Scanning** [HTML5-QRCode](https://github.com/mebjas/html5-qrcode) Apache 2.0 License

그 밖에 type-safe한 개발 환경을 위해 [TypeScript](https://www.typescriptlang.org/)를 사용하고, eslint로 기초적인 문법 오류를 잡는데 활용하고 있습니다.

### Deprecated

테스트 목적으로 개발 중 사용했었던 라이브러리 목록입니다.

> CSS 스타일링은 최초 emotion 사용하였으나 Yarn v4 및 SSR 환경 호환을 위해 Panda CSS로 이주, 이후 Panda CSS에서 해결이 난해한 문제 발생으로 인해 다시 한 번 Vanilla Extract로 이주하였습니다.

- **Authentication in Test Development** [Auth.js](https://authjs.dev/) ISC License
- **Deploy with CloudFlare D2** [CloudFlare Next-on-Pages](https://github.com/cloudflare/next-on-pages) Source Available
- **Styling** [Panda CSS](https://panda-css.com/) MIT License
- **Styling** [emotion](https://emotion.sh/) MIT License

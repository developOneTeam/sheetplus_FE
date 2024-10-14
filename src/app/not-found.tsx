import Link from 'next/link'
import { iconDesc, main } from './styles/layouts.css'
import { defaultH2, defaultP, icon } from './styles/others.css'
import { button } from './styles/buttons.css'
 
export default function NotFound() {
  return (
    <main className={main({ center: true })}>
        <section className={iconDesc}>
          <span className={`${icon({ color: "error" })} material-symbols-rounded`}>
          live_help
          </span>
          <h2 className={defaultH2()}>페이지를 찾을 수 없어요</h2>
          <p className={defaultP()}>찾으시는 주소가 맞는지 다시 한 번 확인해주세요</p>
          <Link href="/" className={button({ types: "secondary" })}>홈으로 돌아가기</Link>  
        </section>
    </main>
  );
};

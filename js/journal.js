/* VATYA journal - posts copied from vatya.co.kr/journal (2026-11-10). Text kept verbatim from the original posts.
   id = original cafe24 product_no. images live in img/journal/<id>/ (cover = list thumbnail, main = top image, bodyNN = editor images in order).
   cats: project / news / event (original site had every post under 소식, the leaflet only under 전체)
   feat = photo shown in the main-page journal feature (img name in the post folder, fit/pos/bg for graphic covers) */
window.VATYA_JOURNAL_CATS = [
  { id: 'all', name: '전체' },
  { id: 'project', name: '프로젝트' },
  { id: 'news', name: '소식' },
  { id: 'event', name: '이벤트' }
];
window.VATYA_JOURNAL = [
  { id: '184', feat: { img: 'photo' }, cats: [], label: 'JOURNAL', title: '밧드야 리플렛',
    summary: '리플랫에서 밧드야의 스토리와 제품들을 확인해 보실 수 있습니다!',
    body: ['리플랫에서 밧드야의 스토리와 제품들을 확인해 보실 수 있습니다!'],
    images: ['main', 'body01', 'body02', 'body03', 'body04', 'body05', 'body06', 'body07', 'body08', 'body09'] },
  { id: '178', feat: { img: 'body03' }, cats: ['news'], label: '소식', title: '2024년 글로벌생활명품 선정',
    summary: '밧드야 엠보식기건조대 2024 글로벌 생활명품 선정',
    body: ['엠보 식기건조대가 2024 산업통산자원부와 한국디자인진흥원에서 진행한 글로벌 생활명품에 선정 되었습니다.'],
    images: ['main', 'body01', 'body02', 'body03'] },
  { id: '175', feat: { img: 'body02' }, cats: ['news'], label: '소식', title: '밧드야 X 서울 리빙 디자인페어 2024',
    summary: '밧드야에서는 2월 28일 ~ 3월 3일 코엑스에서 열리는 서울리빙디자인페어에 참가 하였습니다.',
    body: ['2024년 2월 28일 ~ 3월 3일 코엑스에서 열린 서울리빙디자인페어에 참가하였습니다.', '"내 공간의 즐거움"이라는 슬로건 아래 여러 제품을 선보입니다.', '이번 페어에서는 밧드야에서 만드 스탠다드 밧드도 선보였습니다.'],
    images: ['main', 'body02', 'body03', 'body04', 'body05', 'body06', 'body07', 'body08', 'body09'] },
  { id: '168', feat: { img: 'cover', fit: 'contain', bg: '#ffffff' }, cats: ['news'], label: '소식', title: '밧드야 웹사이트 리뉴얼',
    summary: '2023년 3월, 밧드야 웹사이트를 리뉴얼 했습니다.',
    body: ['2023년 3월, 밧드야 웹사이트를 리뉴얼 했습니다.', '내 주방의 즐거움이 되는 브랜드 밧드야.', '밧드야의 이야기와 아이덴티티가 담긴, 변화 된 밧드야의 모습을 지금 확인해보세요.'],
    images: ['main'] },
  { id: '56', feat: { img: 'cover', fit: 'contain', bg: '#003EA5' }, cats: ['news'], label: '소식', title: '밧드야 X 서울리빙디자인페어 2023',
    summary: '밧드야에서는 2월 22일 ~26일 코엑스에서 열리는 서울리빙디자인페어에 참가합니다.',
    body: ['밧드야에서는 2월 22일 ~26일 코엑스에서 열리는 서울리빙디자인페어에 참가합니다.', '"내 주방의 즐거움"이 되는 제품들을 관람해 보세요.'],
    images: ['main', 'body01'] }
];

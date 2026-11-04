/* VATYA shop - product data (single source for index / list / detail)
   prices: items marked est=true are placeholders (not on vatya.co.kr) -> replace with real prices */
window.VATYA_CATS = [
  { id: 'all', name: '전체' },
  { id: 'standard', name: '스탠다드 시리즈' },
  { id: 'rack', name: '건조대 제품' },
  { id: 'kitchen', name: '주방 제품' },
  { id: 'table', name: '테이블 제품' },
  { id: 'designer', name: '디자이너 제품' },
  { id: 'set', name: '세트 상품' },
  { id: 'bgrade', name: 'B급 제품' }
];
window.VATYA_PRODUCTS = [
  { id: 'cyl', name: '실린더 글라스 시리즈', sum: '날렵한 원통형과 손잡이가 매력적인 실린더 머그잔', price: 40000, tag: 'NEW', img: 'img/prd_cyl.jpg', cats: ['table'], rv: 128, rate: 4.9,
    spec: { 소재: '유리', 구성: '머그 1개', 용량: '350ml' } },
  { id: 'recycle', name: '밧드야 분리수거함', sum: '홍익대학교 WELDUS 팀이 디자인한 분리수거함', price: 50000, tag: 'NEW', img: 'img/prd_recycle.jpg', cats: ['kitchen', 'designer'], rv: 64, rate: 4.8,
    spec: { 소재: '스테인리스 스틸', 구성: '프레임 + 받침', 디자인: '홍익대학교 WELDUS' } },
  { id: 'mix3', name: '밧드야 스탠다드 믹싱볼 세트', sum: '스테인리스 다용도 볼, 세 가지 사이즈 구성', price: 75000, sale: 10, tag: 'BEST', img: 'img/prd_mix3.jpg', cats: ['standard', 'kitchen'], rv: 312, rate: 4.9,
    spec: { 소재: '스테인리스 스틸 (STS 304)', 구성: '대 · 중 · 소 3개 세트', 세척: '식기세척기 사용 가능' } },
  { id: 'mix1', name: '밧드야 스탠다드 믹싱볼 단품', sum: '스테인리스 다용도 볼 단품', price: 20000, sale: 10, img: 'img/prd_mix1.jpg', cats: ['standard', 'kitchen'], rv: 97, rate: 4.8,
    spec: { 소재: '스테인리스 스틸 (STS 304)', 구성: '1개 (사이즈 선택)', 세척: '식기세척기 사용 가능' } },
  { id: 'tooth', name: '밧드야 칫솔꽂이', sum: '심승연 디자이너가 만든 칫솔꽂이', price: 45000, img: 'img/prd_tooth.jpg', cats: ['designer', 'table'], rv: 41, rate: 4.7,
    spec: { 소재: '스테인리스 스틸', 구성: '1개', 디자인: '심승연 디자이너' } },
  { id: 'basket', name: '밧드야 우븐 바스켓', sum: '밧드야가 만든 테이블용 바스켓 시리즈', price: 59000, img: 'img/prd_basket.jpg', cats: ['table', 'standard'], rv: 58, rate: 4.9,
    spec: { 소재: '스테인리스 와이어', 구성: '1개', 용도: '과일 · 빵 · 테이블 수납' } },
  { id: 'stack', name: '스택 글라스 시리즈', sum: '컵과 컵을 쌓을 수 있는 미니멀한 디자인의 스택컵', price: 25000, img: 'img/prd_stack.jpg', cats: ['table'], rv: 73, rate: 4.8,
    spec: { 소재: '유리', 구성: '1개', 특징: '적층 보관' } },
  { id: 'wine', name: '삼각대 와인잔 시리즈', sum: '삼각대의 독특한 베이스로 손으로 잡는 재미가 있는 와인잔', price: 50000, img: 'img/prd_wine.jpg', cats: ['table', 'designer'], rv: 36, rate: 4.9,
    spec: { 소재: '유리 + 스테인리스 베이스', 구성: '1개', 특징: '삼각대 베이스' } },
  { id: 'bin', name: '밧드야 음식물쓰레기통 2.5L', sum: '통 스테인리스 · 원목 손잡이 · 뚜껑 밀폐', price: 69000, est: true, tag: 'BEST', img: 'img/prd_bin.jpg', cats: ['kitchen', 'standard'], rv: 540, rate: 4.9, hero: 'img/hero_bin.jpg',
    spec: { 소재: '스테인리스 스틸 · 원목 손잡이', 용량: '2.5L', 특징: '뚜껑 밀폐 · 냄새 차단' } },
  { id: 'rack2', name: '밧드야 식기건조대 스탠다드 2단', sum: '싱크대 위 2단 식기건조대', price: 129000, est: true, tag: 'BEST', img: 'img/prd_rack2.jpg', cats: ['rack', 'standard'], rv: 486, rate: 4.8, hero: 'img/hero_rack.jpg',
    spec: { 소재: '스테인리스 스틸', 구성: '2단 선반 + 컵걸이', 설치: '싱크대 상단 거치' } },
  { id: 'bowl', name: '밧드야 설거지통', sum: '스테인리스 설거지통 · 배수 홈', price: 59000, est: true, tag: 'BEST', img: 'img/prd_bowl.jpg', cats: ['kitchen', 'standard'], rv: 221, rate: 4.8, hero: 'img/hero_bowl.jpg',
    spec: { 소재: '스테인리스 스틸', 특징: '바닥 배수 홈', 세척: '식기세척기 사용 가능' } },
  { id: 'set1', name: '건조대 + 설거지통 세트', sum: '세트 구성으로 더 합리적인 가격', price: 188000, sale: 15, est: true, tag: 'SET', img: 'img/prd_set.jpg', cats: ['set'], rv: 92, rate: 4.9,
    spec: { 구성: '식기건조대 2단 + 설거지통', 소재: '스테인리스 스틸' } }
];

import bitcoin from "../public/bitcoin.svg";
import ethereum from "../public/ethereum.svg";
import litecoin from "../public/litecoin.svg";
import usdt from "../public/usdt.svg";
import qiwi from "../public/qiwi.svg";
import visa from "../public/visa.svg";
import mastercard from "../public/mk.svg";

export const TRANSFORM_AMOUNT = 10;
export const INDENT_POPUP_NOTIFICATION = 25;
export const INDENT_POPUP_PROFILE = 20;

export const PATH_LIST_RU = {
  account: "Панель управления",
  shop: "Магазин услуг",
  vps: "VPS",
  bulletproof: "Bulletproof VPS/VDS",
  hosting: 'Bulletproof Hosting',
  vpn: "VPN",
  balance: "Ваш кошелек",
  rules: "Правила сервиса",
  new: "Новая услуга",
  profile: "Панель упраления",
};

export const PATH_LIST_EN = {
  account: "Control Panel",
  shop: "Service Store",
  vps: "VPS",
  bulletproof: "Bulletproof VPS/VDS",
  hosting: 'Bulletproof Hosting',
  vpn: "VPN",
  balance: "Your Wallet",
  rules: "Terms of Service",
  new: "New Service",
  profile: "Your Account",
};

export const PAYMENTS = [
  {
    name: "Bitcoin",
    img: bitcoin,
  },
  {
    name: "Ethereum",
    img: ethereum,
  },
  {
    name: "Litecoin",
    img: litecoin,
  },
  {
    name: "USDT",
    img: usdt,
  },
  {
    name: "Qiwi",
    img: qiwi,
  },
  {
    name: "Visa",
    img: visa,
  },
  {
    name: "Mastercard",
    img: mastercard,
  },
];

export const FAQ_LIST_RU = [
  {
    question: "Что такое оффшорные сервера?",
    answer:
      "Оффшорные сервера гарантируют полную конфиденциальность данных и анонимность. Подходят для безопасного хранения информации и любых других проектов.",
  },
  {
    question: "Какой контент запрещено размещать на оффшорных серверах?",
    answer:
      "Любой контент по которому приходят жалобы на сервер, исключение DMCA.",
  },
  {
    question: "Что такое DMCA?",
    answer:
      "Digital Millenium Copyright Act — это закон, обеспечивающий соблюдение авторского права. Его приняли в 1998 году в США, и действует он только в американской юрисдикции",
  },
  {
    question: "В каких странах вы игнорируете запросы DMCA?",
    answer: "Нидерланды и Молдавия.",
  },
  {
    question: "Что такое Bulletproof сервера?",
    answer:
      "На Bulletproof серверах разрешено размещение любого контента. Исключение: майнинг, взлом RDP, атаки на сервера (DDoS, exploit и т.д.)",
  },
  {
    question: "Вам нужна моя личная информация?",
    answer:
      "Нет, мы не запрашиваем информацию о клиентах, весь процесс покупки и использования наших услуг является анонимным",
  },
  {
    question: "Делаете ли вы резервное копирование (бэкапы)?",
    answer: "По умолчанию бэкапы отключены",
  },
  {
    question: "Есть ли у вас защита от DDOS атак?",
    answer: "Да, мы предоставляем защиту от DDOS атак",
  },
  {
    question: "Какие способы оплаты вы принимаете?",
    answer: "Мы принимаем оплату BTC, ETH, LTC, USDT (TRC-20)",
  },
];

export const FAQ_LIST_EN = [
  {
    question: "What are offshore servers?",
    answer:
      "Offshore servers guarantee complete data confidentiality and anonymity. They are suitable for secure storage of information and any other projects.",
  },
  {
    question: "What content is prohibited from hosting offshore servers?",
    answer:
      "Any content for which complaints come to the server. DMCA is exception.",
  },
  {
    question: "What is the DMCA?",
    answer:
      "The Digital Millenium Copyright Act is a law enforcing copyright law. It was passed in 1998 in the United States and is only valid in American jurisdiction",
  },
  {
    question: "In which countries do you ignore DMCA requests?",
    answer: "Netherlands and Moldova.",
  },
  {
    question: "What are Bulletproof servers?",
    answer:
      "Any content is allowed on Bulletproof servers. Exception is mining, RDP hacking, server attacks (DDoS, exploit, etc.)",
  },
  {
    question: "You want my personal information?",
    answer:
      "No, we do not ask for customer information, the entire process of buying and use of our services is anonymous",
  },
  {
    question: "Do you make backups?",
    answer: "Backups are disabled by default",
  },
  {
    question: "Do you have protection against DDOS attacks?",
    answer: "Yes, we provide protection from DDOS attacks",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept payment BTC, ETH, LTC, USDT (TRC-20)",
  },
];

export const REVIEW_RU = [
  {
    name: "Hosting.info",
    number: "4.9",
    img: "/review_stars.svg",
    text: "средняя оценка",
    link: "https://ru.hostings.info/psb-hosting-pro.html",
  },
  {
    name: "Hosting101.ru",
    number: "6",
    img: "/review_lightning.svg",
    text: "преимуществ",
    link: "https://hosting101.ru/psb-hosting",
  },
  {
    name: "HostingHUB.ru",
    number: "9",
    img: "/review_messages.svg",
    text: "отзывов",
    link: "https://hostinghub.ru/psb-hosting",
  },
  {
    name: "VpsUP.ru",
    number: "19",
    img: "/review_bomb.svg",
    text: "место из 169",
    link: "https://vpsup.ru/reviews/psb-hosting.pro.html",
  },
];

export const REVIEW_EN = [
  {
    name: "Hosting.info",
    number: "4.9",
    img: "/review_stars.svg",
    text: "average rating",
    link: "https://ru.hostings.info/psb-hosting-pro.html",
  },
  {
    name: "Hosting101.ru",
    number: "6",
    img: "/review_lightning.svg",
    text: "advantages",
    link: "https://hosting101.ru/psb-hosting",
  },
  {
    name: "HostingHUB.ru",
    number: "9",
    img: "/review_messages.svg",
    text: "reviews",
    link: "https://hostinghub.ru/psb-hosting",
  },
  {
    name: "VpsUP.ru",
    number: "19",
    img: "/review_bomb.svg",
    text: "place out of 169",

    link: "https://vpsup.ru/reviews/psb-hosting.pro.html",
  },
];

export const VPS_COUNTRY_LIST = [
  {
    id: 0,
    country: "Netherlands",
    flag: "/nl.svg",
    description: ["DMCA 100% ignored", "Offshore hosting", "Linux & Windows"],
  },
  {
    id: 1,
    country: "Moldova",
    flag: "/md.svg",
    description: ["DMCA 100% ignored", "Offshore hosting", "Linux & Windows"],
  },
  {
    id: 2,
    country: "USA",
    flag: "/us.svg",
    description: ["Offshore hosting", "Linux & Windows"],
  },
  {
    id: 3,
    country: "Hong Kong",
    flag: "/hk.svg",
    description: ["Offshore hosting", "Linux & Windows"],
  },
  {
    id: 4,
    country: "Germany",
    flag: "/de.svg",
    description: ["Offshore hosting", "Linux & Windows"],
  },
  {
    id: 5,
    country: "Canada",
    flag: "/ca.svg",
    description: ["Offshore hosting", "Linux & Windows"],
  },
  {
    id: 6,
    country: "Great Britain",
    flag: "/gb.svg",
    description: ["Offshore hosting", "Linux & Windows"],
  },
  {
    id: 7,
    country: "Turkey",
    flag: "/tr.svg",
    description: ["Offshore hosting", "Linux & Windows"],
  },
];

export const VPN_CHARACTERS_RU = [
  "Порт: 1 Gbps",
  "Безопасное шифрование",
  "Поддержка 24/7",
  "Безлимитный трафик",
  "1 активное устройство",
];

export const VPN_CHARACTERS_EN = [
  "Port: 1 Gbps",
  "Secure encryption",
  "Support 24/7",
  "Unlimited traffic",
  "1 active device",
];

export const VPN_COUNTRIES = [
  {
    country: "Netherlands",
    flag: "/nl.svg",
  },
  {
    country: "USA",
    flag: "/us.svg",
  },
  {
    country: "Hong Kong",
    flag: "/hk.svg",
  },
  {
    country: "Germany",
    flag: "/de.svg",
  },
  {
    country: "Canada",
    flag: "/ca.svg",
  },
  {
    country: "Great Britain",
    flag: "/gb.svg",
  },
  {
    country: "Spain",
    flag: "/spain.svg",
  },
  {
    country: "France",
    flag: "/france.svg",
  },
  {
    country: "Ireland",
    flag: "/ireland.svg",
  },
  {
    country: "Switzerland",
    flag: "/switzerland.svg",
  },
  {
    country: "Sweden",
    flag: "/sweden.svg",
  },
  {
    country: "Portugal",
    flag: "/portugal.svg",
  },
  {
    country: "Hungary",
    flag: "/hungary.svg",
  },
  {
    country: "Finland",
    flag: "/finland.svg",
  },
  {
    country: "Italy",
    flag: "/italy.svg",
  },
  {
    country: "Romania",
    flag: "/romania.svg",
  },
  {
    country: "Bulgaria",
    flag: "/bulgaria.svg",
  },
  {
    country: "Poland",
    flag: "/poland.svg",
  },
  {
    country: "Czech",
    flag: "/czech.svg",
  },
  {
    country: "Slovakia",
    flag: "/slovakia.svg",
  },
  {
    country: "Latvia",
    flag: "/latvia.svg",
  },
  {
    country: "Israel",
    flag: "/israel.svg",
  },
  {
    country: "Serbia",
    flag: "/serbia.png",
  },
  {
    country: "Moldova",
    flag: "/md.svg",
  },
  {
    country: "Turkey",
    flag: "/turkey.svg",
  },
];

export const MONTH_RU = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];
export const MONTH_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const VPN_PERIOD_RU = [
  {
    option: "1 месяц",
    value: 1,
  },
  {
    option: "3 месяца - 5%",
    value: 3,
  },
  {
    option: "6 месяцев - 10%",
    value: 6,
  },
  {
    option: "12 месяцев - 15%",
    value: 12,
  },
];

export const VPN_PERIOD_EN = [
  {
    option: "1 month",
    value: 1,
  },
  {
    option: "3 month - 5%",
    value: 3,
  },
  {
    option: "6 month - 10%",
    value: 6,
  },
  {
    option: "12 month - 15%",
    value: 12,
  },
];

export const CYRILLIC_REG_EXP = /[а-яё]/gi;
export const NUMBER_REG_EXP = /^\d+$/;
export const EMAIL_REG_EXP = /^.*\.[a-z]{2,}$/;

export const FAQ_LIST_VPN_RU = [
  {
    question: "Как пользоваться VPN?",
    answer: [
      "Оплатите тариф, ",
      "загрузите приложения для вашего устройства ",
      "используйте данные для подключения, которые мы предоставили вам при покупке тарифного плана",
    ],
  },
  {
    question: "На каких устройствах можно использовать VPN?",
    answer: "Windows, macOS, Android, iOS, Linux",
  },
  {
    question: "Чем WireGuard лучше OpenVPN?",
    answer:
      "WireGuard не использует большой объем кода, поэтому работает быстрее",
  },
  {
    question: "Какие способы оплаты вы принимаете?",
    answer: "Мы принимаем оплату BTC, ETH, LTC, USDT (TRC-20)",
  },
  {
    question: "У вас есть скидки за аренду VPN на длительный срок?",
    answer: ["Да есть!", "3 месяца -5%,", "6 месяцев -10%,", "12 месяцев -15%"],
  },
  {
    question: "Ваш VPN анонимный?",
    answer:
      "Да, мы не храним логи и используем современные протоколы шифрования",
  },
  {
    question: "Где мне скачать клиент для моего устройства?",
    answer: "https://www.wireguard.com/install/",
  },
];

export const FAQ_LIST_VPN_EN = [
  {
    question: "How to use a VPN?",
    answer: [
      "You need to pay the tariff, ",
      "download apps for your device ",
      "use the connection data that we provided you with the purchase of the tariff plan",
    ],
  },
  {
    question: "On which devices you can use a VPN?",
    answer: "Windows, macOS, Android, iOS, Linux",
  },
  {
    question: "How is WireGuard better than OpenVPN?",
    answer: "WireGuard does not use a large amount of code, so it works faster",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept BTC, ETH, LTC, USDT (TRC-20)",
  },
  {
    question: "You have discounts for long term VPN rentals?",
    answer: [
      "Yes, we have!",
      "3 months -5%,",
      "6 months -10%,",
      "12 months -15%",
    ],
  },
  {
    question: "Your VPN is anonymous?",
    answer: "Yes, we do not store logs and use modern encryption protocols",
  },
  {
    question: "Where do I download the client for my device?",
    answer: "https://www.wireguard.com/install/",
  },
];

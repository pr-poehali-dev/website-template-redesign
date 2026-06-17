import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

const SLIDES = [
  'https://cdn.poehali.dev/projects/bd448f15-089e-4927-950d-151274b151b0/files/46b2ed83-6366-440e-9193-cc0ac87d205e.jpg',
  'https://cdn.poehali.dev/projects/bd448f15-089e-4927-950d-151274b151b0/files/6368862d-571d-4767-aada-4f929dbebdbc.jpg',
  'https://cdn.poehali.dev/projects/bd448f15-089e-4927-950d-151274b151b0/files/55643273-29ec-496c-8d18-6fe51f9ce3c0.jpg',
];

const CERT = 'https://cdn.poehali.dev/projects/bd448f15-089e-4927-950d-151274b151b0/files/55643273-29ec-496c-8d18-6fe51f9ce3c0.jpg';

const MINISTRIES_LOGOS_URL = 'https://cdn.poehali.dev/projects/bd448f15-089e-4927-950d-151274b151b0/bucket/696dc34d-b8f7-4ad0-b5c7-c29130779f55.png';

const INFO_SECTIONS = [
  'Основные сведения',
  'Структура и органы управления образовательной организацией',
  'Документы',
  'Образование',
  'Образовательные стандарты',
  'Руководство. Педагогический (научно-педагогический) состав',
  'Материально-техническое обеспечение и оснащённость образовательного процесса',
  'Стипендии и иные виды материальной поддержки',
  'Платные образовательные услуги',
  'Финансово-хозяйственная деятельность',
  'Вакантные места для приёма (перевода)',
  'Доступная среда',
  'Международное сотрудничество',
];

const MENU: { id: string; label: string; submenu?: string[] }[] = [
  { id: 'main', label: 'ГЛАВНАЯ' },
  { id: 'info', label: 'СВЕДЕНИЯ ОБ ОБРАЗОВАТЕЛЬНОЙ ОРГАНИЗАЦИИ', submenu: INFO_SECTIONS },
  { id: 'enroll', label: 'АБИТУРИЕНТУ' },
  { id: 'distance', label: 'ДИСТАНЦИОННОЕ ОБУЧЕНИЕ' },
  { id: 'contacts', label: 'КОНТАКТЫ' },
];

const VI_SCHEMES = [
  { id: 'white', label: 'C', bg: '#fff', fg: '#000' },
  { id: 'black', label: 'C', bg: '#000', fg: '#ffeb00' },
  { id: 'blue', label: 'C', bg: '#062c54', fg: '#9dd1ff' },
];

const VI_SCALES = [
  { id: 1, label: 'A', size: 'text-sm' },
  { id: 1.25, label: 'A', size: 'text-lg' },
  { id: 1.5, label: 'A', size: 'text-2xl' },
];

const EXPENSES = [
  'На оплату труда — 1818,0 тыс. руб.',
  'На страховые взносы в ПФ, ФСС, ФФОМС — 539,0 тыс. руб.',
  'Арендная плата — 2160,0 тыс. руб.',
  'Расходы по оплате работ и услуг сторонних организаций — 486,0 тыс. руб.',
  'Расходы на приобретение материалов — 3275,0 тыс. руб.',
  'Прочие расходы — 158,0 тыс. руб.',
];

export default function Index() {
  const [vision, setVision] = useState(false);
  const [viScheme, setViScheme] = useState('white');
  const [viScale, setViScale] = useState(1.25);
  const [viImages, setViImages] = useState(true);
  const [active, setActive] = useState('main');
  const [infoSection, setInfoSection] = useState('Финансово-хозяйственная деятельность');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [slide, setSlide] = useState(0);
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const SEARCH_INDEX = [
    { title: 'Финансово-хозяйственная деятельность', section: 'info' },
    { title: 'Лицензия на образовательную деятельность', section: 'info' },
    { title: 'Свидетельство о регистрации', section: 'main' },
    { title: 'Информация для абитуриентов', section: 'enroll' },
    { title: 'Дистанционное обучение', section: 'distance' },
    { title: 'Контактная информация', section: 'contacts' },
  ];
  const results = search.trim()
    ? SEARCH_INDEX.filter((i) =>
        i.title.toLowerCase().includes(search.trim().toLowerCase())
      )
    : [];

  return (
    <div
      style={{ ['--vi-scale' as string]: viScale }}
      className={`${vision ? `vision-mode vi-scheme-${viScheme} ${viImages ? '' : 'vision-no-images'}` : ''} min-h-screen bg-[#e9e9e9] font-sans text-[#222]`}
    >
      <div className="mx-auto w-full max-w-[1200px] bg-white shadow-sm">
        {/* БЛОК А: Техническая шапка */}
        <div className="flex flex-col items-center justify-between gap-2 border-b border-gray-300 px-3 py-2 sm:flex-row">
          {!vision ? (
            <button
              onClick={() => setVision(true)}
              className="flex items-center gap-2 rounded border border-gray-300 px-3 py-1.5 text-sm font-bold text-[#1a3a6b] transition-colors hover:bg-gray-100"
            >
              <Icon name="Eye" size={18} />
              Версия для слабовидящих
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold">
              {/* Размер шрифта */}
              <div className="flex items-center gap-1">
                <span className="mr-1">Размер шрифта:</span>
                {VI_SCALES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setViScale(s.id)}
                    className={`flex h-8 w-8 items-center justify-center border ${s.size} ${
                      viScale === s.id ? 'border-current bg-black/10 font-bold' : 'border-gray-400'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              {/* Цвета сайта */}
              <div className="flex items-center gap-1">
                <span className="mr-1">Цвета сайта:</span>
                {VI_SCHEMES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setViScheme(c.id)}
                    style={{ background: c.bg, color: c.fg }}
                    className={`flex h-8 w-8 items-center justify-center rounded border font-bold ${
                      viScheme === c.id ? 'border-2 border-sky-500' : 'border-gray-400'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              {/* Изображения */}
              <button
                onClick={() => setViImages((v) => !v)}
                className="flex items-center gap-2"
              >
                <span>Изображения:</span>
                <span className="flex h-7 w-14 items-center justify-center border border-gray-400 text-xs font-bold">
                  {viImages ? 'Вкл.' : 'Выкл.'}
                </span>
              </button>
              {/* Обычная версия */}
              <button
                onClick={() => setVision(false)}
                className="flex items-center gap-1 underline"
              >
                <Icon name="RotateCcw" size={16} />
                Обычная версия
              </button>
            </div>
          )}
          <div className="w-full overflow-x-auto">
            <img
              src={MINISTRIES_LOGOS_URL}
              alt="Логотипы министерств и ведомств"
              className="h-10 w-auto min-w-full object-contain object-left"
            />
          </div>
        </div>

        {/* БЛОК Б: Главная шапка */}
        <header className="vi-bg bg-[#111] px-4 py-5 text-white">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-[#1a3a6b] font-serif text-2xl font-bold text-white">
                К
              </div>
              <div>
                <h1 className="font-serif text-lg font-bold leading-tight sm:text-xl">
                  Автономная некоммерческая организация дополнительного
                  профессионального образования «Учебный центр «Курс»
                </h1>
                <p className="mt-1 text-xs uppercase tracking-wide text-gray-400">
                  Профессиональное обучение и дополнительное образование
                </p>
              </div>
            </div>

            {/* Поиск */}
            <div className="relative w-full sm:w-auto">
              <div className="flex items-center overflow-hidden rounded border border-gray-600 bg-white">
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                  placeholder="Поиск..."
                  className="w-full px-3 py-2 text-sm text-black outline-none sm:w-48"
                />
                <button className="bg-[#1a3a6b] px-3 py-2.5 text-white">
                  <Icon name="Search" size={16} />
                </button>
              </div>
              {searchOpen && results.length > 0 && (
                <ul className="absolute right-0 z-20 mt-1 w-full min-w-[240px] rounded border border-gray-300 bg-white text-sm shadow-lg">
                  {results.map((r) => (
                    <li key={r.title}>
                      <button
                        onClick={() => {
                          setActive(r.section);
                          setSearchOpen(false);
                          setSearch('');
                        }}
                        className="block w-full px-3 py-2 text-left text-[#1a3a6b] hover:bg-gray-100"
                      >
                        {r.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </header>

        {/* Главное меню */}
        <nav className="vi-bg bg-[#2b2b2b] text-white">
          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenu((m) => !m)}
            className="flex w-full items-center justify-between px-4 py-3 text-sm font-bold sm:hidden"
          >
            МЕНЮ
            <Icon name={mobileMenu ? 'X' : 'Menu'} size={20} />
          </button>
          <ul
            className={`${mobileMenu ? 'flex' : 'hidden'} flex-col sm:flex sm:flex-row sm:flex-wrap`}
          >
            {MENU.map((item) => (
              <li
                key={item.id}
                className="relative border-t border-gray-700 sm:border-l sm:border-t-0"
                onMouseLeave={() => item.submenu && setOpenDropdown(false)}
              >
                <button
                  onClick={() => {
                    if (item.submenu) {
                      setActive(item.id);
                      setOpenDropdown((o) => !o);
                    } else {
                      setActive(item.id);
                      setMobileMenu(false);
                    }
                  }}
                  onMouseEnter={() => item.submenu && setOpenDropdown(true)}
                  className={`retro-menu-item flex w-full items-center justify-between gap-1 px-4 py-3 text-left text-xs font-bold tracking-wide sm:justify-center sm:text-center ${
                    active === item.id
                      ? 'bg-[#555] text-white'
                      : 'text-gray-200 hover:bg-[#444]'
                  }`}
                >
                  {item.label}
                  {item.submenu && <Icon name="ChevronDown" size={14} />}
                </button>

                {item.submenu && openDropdown && (
                  <ul className="left-0 top-full z-30 w-full bg-[#3a3a3a] text-white shadow-xl sm:absolute sm:w-[480px]">
                    {item.submenu.map((sub) => (
                      <li key={sub} className="border-t border-gray-600">
                        <button
                          onClick={() => {
                            setActive('info');
                            setInfoSection(sub);
                            setOpenDropdown(false);
                            setMobileMenu(false);
                          }}
                          className={`flex w-full items-center gap-2 px-5 py-3 text-left text-[13px] hover:bg-[#4d4d4d] ${
                            active === 'info' && infoSection === sub ? 'bg-[#4d4d4d]' : ''
                          }`}
                        >
                          <Icon name="ChevronRight" size={13} className="shrink-0 text-gray-400" />
                          {sub}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* БЛОК В: Контентная зона */}
        <main className="bg-white px-5 py-6 sm:px-8 sm:py-8">
          {active === 'main' ? (
            <>
              {/* Слайдер */}
              <div className="relative overflow-hidden rounded border border-gray-300">
                <div className="aspect-[16/8] w-full bg-gray-200">
                  {SLIDES.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={`Слайд ${i + 1}`}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                        i === slide ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                >
                  <Icon name="ChevronLeft" size={22} />
                </button>
                <button
                  onClick={() => setSlide((s) => (s + 1) % SLIDES.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
                >
                  <Icon name="ChevronRight" size={22} />
                </button>
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                  {SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlide(i)}
                      className={`h-2.5 w-2.5 rounded-full ${
                        i === slide ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Двухколоночная сетка */}
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
                <div className="vi-text space-y-4 font-serif text-[15px] leading-relaxed text-[#333]">
                  <p>
                    Автономная некоммерческая организация дополнительного
                    профессионального образования «Учебный центр «Курс» была
                    зарегистрирована Управлением Министерства юстиции Российской
                    Федерации по Волгоградской области 8 ноября 2010 года.
                  </p>
                  <p>
                    С 27 декабря 2011 года АНО ДПО «УЦ «Курс» осуществляет
                    образовательную деятельность на территории Волгоградской и
                    Астраханской области по основным программам профессионального
                    обучения и дополнительным образовательным программам в
                    соответствии с лицензией, выданной Комитетом по образованию и
                    науки Администрации Волгоградской области.
                  </p>
                </div>

                <aside>
                  <div className="vi-bg bg-[#1a3a6b] px-4 py-2 text-sm font-bold uppercase text-white">
                    Свидетельство о регистрации
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="group block w-full border border-t-0 border-gray-300 p-3">
                        <img
                          src={CERT}
                          alt="Свидетельство о регистрации"
                          className="w-full rounded transition-transform group-hover:scale-[1.02]"
                        />
                        <span className="mt-2 flex items-center justify-center gap-1 text-xs text-[#1a3a6b]">
                          <Icon name="ZoomIn" size={14} /> Нажмите, чтобы увеличить
                        </span>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <img src={CERT} alt="Свидетельство о регистрации" className="vi-keep w-full" />
                    </DialogContent>
                  </Dialog>
                </aside>
              </div>
            </>
          ) : active === 'info' ? (
            <article className="vi-text font-serif text-[#333]">
              <h2 className="mb-5 font-serif text-2xl font-bold text-[#1a3a6b]">
                {infoSection}
              </h2>
              {infoSection === 'Финансово-хозяйственная деятельность' ? (
                <>
                  <p className="mb-4 text-[15px] leading-relaxed">
                    <strong>1.</strong> Объём образовательной деятельности, финансовое
                    обеспечение которой осуществляется за счёт бюджетных ассигнований
                    федерального бюджета, бюджетов субъектов Российской Федерации,
                    местных бюджетов, по договорам об образовании за счёт средств
                    физических и (или) юридических лиц.
                  </p>
                  <h3 className="mb-3 mt-6 text-lg font-bold text-[#222]">
                    2. Структура расходов (тыс. руб.) по итогам финансового года
                  </h3>
                  <ul className="space-y-2">
                    {EXPENSES.map((e) => (
                      <li key={e} className="flex items-start gap-2 text-[15px]">
                        <Icon name="Dot" size={20} className="mt-0.5 shrink-0 text-[#1a3a6b]" />
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                  <h3 className="mb-3 mt-6 text-lg font-bold text-[#222]">Документы</h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {['Лицензия на образовательную деятельность', 'Свидетельство о регистрации'].map(
                      (doc) => (
                        <Dialog key={doc}>
                          <DialogTrigger asChild>
                            <button className="flex items-center gap-3 rounded border border-gray-300 p-3 text-left hover:bg-gray-50">
                              <Icon name="FileText" size={28} className="shrink-0 text-[#c0392b]" />
                              <span className="text-sm font-semibold text-[#1a3a6b]">{doc}</span>
                            </button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <img src={CERT} alt={doc} className="vi-keep w-full" />
                          </DialogContent>
                        </Dialog>
                      )
                    )}
                  </div>
                </>
              ) : (
                <p className="min-h-[200px] text-[15px] leading-relaxed">
                  Раздел «{infoSection}» находится в наполнении. Напишите, какую
                  информацию здесь разместить, и я добавлю содержимое.
                </p>
              )}
            </article>
          ) : (
            <article className="vi-text min-h-[300px] font-serif text-[#333]">
              <h2 className="mb-5 font-serif text-2xl font-bold text-[#1a3a6b]">
                {MENU.find((m) => m.id === active)?.label}
              </h2>
              <p className="text-[15px] leading-relaxed">
                Раздел находится в наполнении. Напишите, какую информацию здесь
                разместить, и я добавлю содержимое.
              </p>
            </article>
          )}
        </main>

        {/* БЛОК Г: Подвал */}
        <footer className="vi-bg bg-[#1c1c1c] text-gray-300">
          {/* Хлебные крошки */}
          <div className="flex flex-wrap items-center gap-2 border-b border-gray-700 px-5 py-3 text-xs">
            <Icon name="House" size={15} className="text-gray-400" />
            <button onClick={() => setActive('main')} className="hover:text-white">
              Главная
            </button>
            {active !== 'main' && (
              <>
                <Icon name="ChevronRight" size={13} className="text-gray-500" />
                <span className="text-white">
                  {MENU.find((m) => m.id === active)?.label}
                </span>
              </>
            )}
            {active === 'info' && (
              <>
                <Icon name="ChevronRight" size={13} className="text-gray-500" />
                <span className="text-white">{infoSection}</span>
              </>
            )}
          </div>

          {/* Дублирующее меню */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 px-5 py-4 text-sm">
            {MENU.map((m) => (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
                className="capitalize text-gray-300 hover:text-white"
              >
                {m.label.charAt(0) + m.label.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          {/* Копирайт */}
          <div className="border-t border-gray-700 px-5 py-3 text-left text-xs text-gray-500">
            © АНО ДПО «УЦ «Курс». Все права защищены.
          </div>
        </footer>
      </div>
    </div>
  );
}